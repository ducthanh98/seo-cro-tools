<template>
  <div >
    <img alt="Vue logo" src="../assets/logo.png">
    <el-row>
      <el-col :span="20"><el-input placeholder="Please input" v-model="url"></el-input></el-col>
      <el-col :span="2" :offset="1"><el-button type="primary" @click="checkWebsite()">Check our site</el-button></el-col>
    </el-row>
    <el-progress v-if="isLoading" type="circle" :percentage="percentage" :color="colors" :status="status"></el-progress>

  </div>
</template>

<script>
export default {
  name: 'Input',
  props:['api'],
  data() {
    return {
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      url: 'https://rabiloo.com/ja',
      percentage:0,
      status:null,
      isLoading:false,
      loadingProgress : null
    }
  },
  computed:{
    isValidUrl: function(){
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
              '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return pattern.test(this.url);
    }
  },
  methods:{
    async checkWebsite(){
      try {
        if(!this.isValidUrl){
          return this.$notify({title: 'Error', message: 'The URL is invalid !!!', type: 'error'});
        }

        this.startLoading();


        const response = await this.$http.post(this.api,{url: this.url})


        if(response.data.data){
          this.endLoading('success',response.data);
        }else{
          this.endLoading('exception',response.data);
        }


      } catch (e) {
        this.endLoading('exception');
      }
    },
    startLoading(){
      this.isLoading = true;
      this.percentage = 0;
      this.status = null;


      this.loadingProgress = setInterval(()=>{
        const number = Math.floor(Math.random() * 11);
        const percentage = this.percentage + number;
        if(percentage < 100) this.percentage = percentage;
      },1000);


    },
    endLoading(status,data){
      this.percentage = 100;
      this.status = status;


      clearInterval(this.loadingProgress);


      if(!data.error)  setTimeout(()=>{this.$emit('showResult',data.data)},1000);
      else if(data.error) {
        return this.$notify({title: 'Error', message: data.error, type: 'error'});
      } else {
        return this.$notify({title: 'Error', message: 'Error', type: 'error'});
      }
    }

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>
