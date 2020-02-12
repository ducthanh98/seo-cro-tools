<template>
    <div id="ab-testing-wrap">
        <div v-if="!result">
            <Input api="http://localhost:3000/api/scraping" @showResult="showResult"/>
        </div>
        <div v-if="result">
            <WebBuilder :result="result"/>
        </div>
    </div>
</template>


<script>

    import Input from "../components/Input";
    import WebBuilder from "../components/WebBuilder";

    export default {
        name: "ABTesting",
        components: {
            Input,WebBuilder
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

<style scoped>
    #ab-testing-wrap,#ab-testing-wrap div{
        height: 100%;
    }
</style>