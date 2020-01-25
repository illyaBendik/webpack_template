import Vue from 'vue';
import Vuex from 'vuex';

import exmaple from './module/exmaple';

Vue.use(Vuex);

export default new Vuex.Store({
  module: {
    exmaple,
  },
});
