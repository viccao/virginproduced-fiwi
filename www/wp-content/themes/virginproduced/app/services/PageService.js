import Vue from 'vue';

export default {
  get(slug) {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/pages?slug=${slug}`);
  },

  getAcf(slug) {
    return Vue.http.get(`${WP_HOME}/wp-json/acf/v3/pages?slug=${slug}`);
  },

  getAll() {
    return Vue.http.get(`${WP_HOME}/wp-json/wp/v2/pages`);
  },
};
