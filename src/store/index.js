import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import exmaple from './module/exmaple'

export default new Vuex.Store({
    module:{
        exmaple
    }
})