<template>
  <transition name="fade">
  <div id="app">
    <div v-if="!result">
      <img alt="Vue logo" src="./assets/logo.png">
      <Input @showResult="showResult"/>
    </div>
    <div v-if="result">
      <Output :result="result"/>
    </div>
  </div>
  </transition>

</template>

<script>
import Input from './components/Input.vue'
import Output from './components/Output.vue'

export default {
  name: 'app',
  components: {
    Input,Output
  },
  data:function () {
    return {
      result:false
    }
  },
  methods:{
    showResult(value){
      this.result = value;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
