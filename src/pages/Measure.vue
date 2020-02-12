<template>
    <div>
        <div v-if="!result">
            <Input api="http://localhost:3000/api/measure" @showResult="showResult"/>
        </div>
        <div v-if="result">
            <Output :result="result"/>
        </div>
    </div>
</template>


<script>

    import Input from "../components/Input";
    import Output from "../components/Report";

    export default {
        name: "Measure",
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