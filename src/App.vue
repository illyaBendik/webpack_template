<template>
  <div class="container">
      <div class="wrap_main">
        <img src="https://vuejs.org/images/logo.png" alt="Vue logo">
        <h1>\{{ greeting }}</h1>
        <ul>
        <li>
            To learn more about Vue, visit
            <a :href="docsURL" target="_blank">
            \{{ humanizeURL(docsURL) }}
            </a>
        </li>
        <li>
            For live help with simple questions, check out
            <a :href="discordURL" target="_blank">
            the Discord chat
            </a>
        </li>
        <li>
            For more complex questions, post to
            <a :href="forumURL" target="_blank">
            the forum
            </a>
        </li>
        </ul>
      </div>
  </div>
</template>
<script>

import {example} from 'services'
export default {
    data(){
        return{
            greeting: 'Welcome to your Vue.js app!',
            docsURL: 'http://vuejs.org/guide/',
            discordURL: 'https://chat.vuejs.org',
            forumURL: 'http://forum.vuejs.org/'
        }
    },
    methods: {
        humanizeURL: function (url) {
          return url
            .replace(/^https?:\/\//, '')
            .replace(/\/$/, '')
        }
    }
}
</script>
<style scoped>
.wrapper{
    text-align: center;
    margin-top: 100px;
}
.wrap_main{
    text-align: center;
    margin-top: 100px 
}
</style>