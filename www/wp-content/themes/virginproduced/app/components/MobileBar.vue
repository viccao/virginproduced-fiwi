<template>
  <div class="mobile-bar-container" :device="device" :mobile="mobile" :is993="is993" :contextual_menu="contextual_menu" :contextual_menu_links="contextual_menu_links">
    <!-- Mobile Nav Wrap -->
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
      <div class="mobile-nav" v-if="navigation">
        <div class="container">
          <div class="menu-transition">
          <div class="row">
            <div class="col-sm-8">
              <MainNav
                       @togglenav="toggleNavigation"
                       :mobile="mobile"
                       :pages="this.$parent.items.items"
                       ></MainNav>
            </div>
            <div class="col-sm-8 offerings">
              <p>Offerings</p>
              <OfferingsMenu
                             @togglenav="toggleNavigation"
                             :mobile="mobile"
                             :pages="this.$parent.offerings.items"
                             ></OfferingsMenu>
            </div>
              <SocialLinks></SocialLinks>
          </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="mobile-bar" :class="{ 'bg-white-90': !navigation }">
            <a href="#"
               @click="toggleContextmenu"
               @click.prevent
               v-if="main === 'our-suits' || main === 'suits'"
               class="context-toggle primary">Our Suits <i class="fa fa-caret-up"></i>
            </a>
            <a href="#"
               @click="toggleContextmenu"
               @click.prevent
               v-else-if="this.$parent.contextual_menu"
               class="context-toggle primary">{{ this.$parent.contextual_menu }} <i class="fa fa-caret-up"></i>
            </a>
            <a href="#"
               @click.prevent
               v-else
               class="context-toggle no-menu"
               v-html="getTitle()">
            </a>
            <a href="#"
               @click.prevent
               @click="toggleContextmenu"
               v-if="this.$parent.contextual_menu || main === 'our-suits' || main === 'suits'"
               class="context-toggle back"><i class="fa fa-caret-left"></i> Back
            </a>
            <a @click="toggleNavigation" @click.prevent class="toggle">
              <span class="label">Menu</span>
                <span v-if="!navigation">
                  <MenuIcon></MenuIcon>
                  </span>
                <span class="">
                  <CloseIcon></CloseIcon>
                </span>
              </a>
    </div>
    <div
         v-if="main === 'our-suits' || main === 'suits'"
         class="contextual-menu has-overflow">
      <ul>
        <li></li>
        <li v-for="item in posts" v-bind:key="item.slug" v-if="item.better_featured_image">
          <router-link :to="{name: 'suits', params: { slug: item.slug } }" @click.native="toggleContextmenu">{{ item.title.rendered }}</router-link>
        </li>
      </ul>
    </div>
    <div
         v-else-if="this.$parent.contextual_menu_links"
         v-bind:class="[activeClass, errorClass]">
      <ul>
        <li></li>
        <li v-for="item in this.$parent.contextual_menu_links">
          <router-link :to="item.link" v-if="item.link_type === 'internal'" @click.native="toggleContextmenu">{{ item.text }}</router-link>
          <a :href="item.custom" v-else @click="toggleContextmenu">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { orderBy } from 'lodash'
//import MenuService from '../services/MenuService'
//import OfferingsMenuService from '../services/OfferingsMenuService'
//import GlobalService from '../services/GlobalService'
import Search from './Search.vue'
import MainNav from './MainNav.vue'
import Logo from './Logo.vue'
import MenuIcon from './MenuIcon.vue'
import CloseIcon from './CloseIcon.vue'
import OfferingsMenu from './OfferingsMenu.vue'
import SocialLinks from './SocialLinks.vue'
import SuitsArchiveService from '../services/SuitsArchiveService'
export default {
  components: { MainNav, OfferingsMenu, SocialLinks, CloseIcon, MenuIcon, Logo },
  data() {
    return {
//      items: [],
//      infoData: [],
      navigation: false,
      target: null,
      posts: [],
      activeClass: '',
      errorClass: ''

    }
  },
  props: {
    src: {},
    videotime: {},
    is993: {},
    contextual_menu: {},
    contextual_menu_links: {},
    mobile: {},
    title: {},
    device: ''
  },
  watch: {
  },
  created() {
//    this.fetchItems()
//    this.fetchInfoData()
      this.fetchPosts();
    this.getItems()
  },
  computed: {
      main(){
          return this.$route.name
      }
  },
  updated: function () {
//     if(this.mobile === true){
//      var bar = document.querySelector('.mobile-bar');
//      bar.classList.remove('down')
//     }
  },
  mounted: function () {
//
//     function hasClass(element, className) {
//            return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
//        }
//    function debounce(func, wait, immediate) {
//        var timeout;
//        return function() {
//            var context = this, args = arguments;
//            var later = function() {
//                timeout = null;
//                if (!immediate) func.apply(context, args);
//            };
//            var callNow = immediate && !timeout;
//            clearTimeout(timeout);
//            timeout = setTimeout(later, wait);
//            if (callNow) func.apply(context, args);
//        };
//    };
//    const viewportInitial = window.innerHeight;
//    console.log('viewport:' + viewportInitial)
//    const screenSize = screen.height;
//    const footer = document.querySelector('footer');
//    console.log('screen:' + screenSize)
//
//    var myEfficientFn = debounce(function() {
//
//      var viewportScroll = window.innerHeight;
//      console.log('viewport full UI:' + viewportInitial)
//      console.log('viewport updated:' + viewportScroll)
//      var bar = document.querySelector('.mobile-bar');
//        if(viewportInitial < viewportScroll) {
//        bar.classList.add('down')
//        footer.classList.remove('down')
//        } else {
//        bar.classList.remove('down')
//        footer.classList.add('down')
//        }
//
//
//    }, 0);

      if(this.device === 'iPhone'){
      var bar = document.querySelector('.mobile-bar');
      bar.classList.remove('down')

      const viewportInitial = window.innerHeight;
      console.log('viewport:' + viewportInitial)
      const screenSize = screen.height;
      const footer = document.querySelector('footer');
      console.log('screen:' + screenSize)

//      window.addEventListener('scroll', myEfficientFn);



      window.addEventListener('scroll', function(){
      var viewportScroll = window.innerHeight;
      console.log('viewport full UI:' + viewportInitial)
      console.log('viewport updated:' + viewportScroll)
        var bar = document.querySelector('.mobile-bar');
        if(viewportInitial < viewportScroll) {
        bar.classList.add('down')
        footer.classList.remove('down')
        } else {
        bar.classList.remove('down')
        footer.classList.add('down')
        }
      })
      }
//      this.$nextTick(function () {
//        var vm = this;
//
//        var element =  vm.$el.querySelector('.contextual-menu');
//
//        if( element != 'undefined' && element != null) {
//
//        if((vm.is993 === true && vm.contextual_menu_links !='') || (vm.is993 === true && vm.main === 'our-suits' || vm.main === 'suits')){
//        setTimeout(function(){
//        var menu = vm.$el.querySelector('.contextual-menu ul').getElementsByTagName("li");
//        var menuHeight = menu.length;
//          console.log(menuHeight);
//        if(menuHeight > 5) {
//          document.querySelector('.contextual-menu').classList.add('has-overflow');
//        } else {
//
//          if(hasClass('.contextual-menu', 'has-overflow')){
//
//          document.querySelector('.contextual-menu').classList.remove('has-overflow');
//
//
//          }
//        }
//        }, 2000);
//        }
//        }
//      })
  },
  methods: {
//    fetchItems() {
//      return MenuService.getAll()
//        .then(result => {
//          this.items = result.data
//        })
//    },
//    updateValue: function () {
////      alert('event')
//    },
    toggleNavigation() {
      var isFirefox = typeof InstallTrigger !== 'undefined';
      var isChrome = !!window.chrome && !!window.chrome.webstore;
      console.log('eat me')
      this.navigation = !this.navigation;
      if(this.navigation) {
        var header = document.querySelector('.nav-bar');
        header.classList.add('menu-open');
        document.querySelector('body').classList.add('menu-open');


      } else {
        var header = document.querySelector('.nav-bar');
        header.classList.remove('menu-open');
        document.querySelector('body').classList.remove('menu-open');

      }
      function hasClass(element, className) {
          return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
      }
      var menu = document.querySelector('.contextual-menu');
      var button = document.querySelector('.context-toggle');
      var text = this.contextual_menu;
      var primary = document.querySelector('.primary');
      var back = document.querySelector('.back');
      if(hasClass(button, 'toggled')){
      menu.classList.remove('open');
      if(this.contextual_menu == ''){
      button.innerHTML='Our Suits';
      } else {
      button.innerHTML=text;
      }
      button.classList.remove("toggled");
      primary.classList.remove('primary-open');
      back.classList.remove('back-open');


      }
    },
    getItems() {
//        function hasClass(element, className) {
//            return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
//        }
//
//        var li =  document.querySelector('.contextual-menu ul');
//        var element =  document.querySelector('.contextual-menu');
//
//        if( li != 'undefined' && li != null) {
//
//        if((this.is993 === true && this.contextual_menu_links !='') || (this.is993 === true && this.main === 'our-suits' || this.main === 'suits')){
//        setTimeout(function(){
//
//        var menu = document.querySelector('.contextual-menu ul').getElementsByTagName("li");
//        var menuHeight = menu.length;
//          console.log(menuHeight);
//        if(menuHeight > 5) {
//          document.querySelector('.contextual-menu').classList.add('has-overflow');
//        } else {
//
//          if(hasClass('.contextual-menu', 'has-overflow')){
//
//          document.querySelector('.contextual-menu').classList.remove('has-overflow');
//
//
//          }
//
//        }
//        }, 3000);
//        }
//
//
//        }

      var menuHeight = this.contextual_menu_links.length;

      if(menuHeight > 5) {

        this.activeClass = 'contextual-menu has-overflow'

      } else {

        this.errorClass = 'contextual-menu'

      }


    },
    getVideotime() {
//    this.$on('videotime', (payload) => {
////      console.log(payload.src);
////
////      return payload.src;
//      this.videotime = payload.videotime
//    });
    },
    closeNav() {
      if(this.navigation = true){
      var header = document.querySelector('.nav-bar');
      this.navigation = !this.navigation;
      header.classList.remove('menu-open');
      }
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1 }, { duration: 300 });
        var toggle = document.querySelector('.mobile-bar .toggle');
        var menu = document.querySelector('.menu-transition');
      Velocity(menu, {
          opacity: 1,
          scale: 1
        },{
          delay: 750
        });
        setTimeout(function(){
        toggle.classList.add('active');
      }, 150);
    },
    leave: function (el, done) {
      Velocity(el, {
        opacity: 0
      }, {
        duration: 200
      });
      var toggle = document.querySelector('.mobile-bar .toggle');
      setTimeout(function(){
        toggle.classList.remove('active');
      }, 0);
      Velocity(el, {
        display: 'none'
      }, { complete: done })
    },

    hasClass(element, className) {
        return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
    },
    toggleContextmenu() {

//      console.log('toggle clicked')
      var menu = document.querySelector('.contextual-menu');
      var button = document.querySelector('.context-toggle');
      var text = this.contextual_menu;
      var primary = document.querySelector('.primary');
      var back = document.querySelector('.back');


//      if(this.hasClass(button, 'toggled')){
//
//      console.log('toggle clicked - i did something')
//      menu.classList.remove('open');
//      if(this.contextual_menu == ''){
//      button.innerHTML='Our Suits';
//      } else {
//      button.innerHTML=text;
//      }
//      button.classList.remove("toggled");
//      primary.classList.remove('primary-open');
//      back.classList.remove('back-open');
//      } else {
//      console.log('toggle clicked - i did something else')
//
//
      menu.classList.toggle('open');
      button.classList.toggle("toggled");
      primary.classList.toggle('primary-open');
      back.classList.toggle('back-open');
//      }
    },
    fetchPosts() {
      return SuitsArchiveService.getAll()
        .then(result => {
          this.posts = result.data
        })
    },
    getSuits() {
    },
    getTitle(){
      return this.title
    }
  }
}
</script>
<style lang="scss">
@import '../../src/scss/main.scss';
@import '../../src/scss/layout/_mobilebar.scss';
</style>
