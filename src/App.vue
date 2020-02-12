<template>
  <transition name="fade">
    <div id="app">
      <router-view></router-view>
    </div>
  </transition>

</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  html,body,#app{
    height: 100%;
  }
</style>
