<template>
    <div>
        <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
        <hr>
        <el-progress type="circle" :percentage="Math.ceil(this.series[0].data[0])" ></el-progress>

        <el-row>
            <p>Performance</p>
            <el-col :span="4"><p class="font-weight-bold">Details</p></el-col>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="1" :key="metric.id" v-for="metric in this.performanceData">
                <el-row>
                    <el-col :span="16">{{metric.title}}</el-col>
                    <el-col :span="8">{{metric.displayValue}}</el-col>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name: "Output",
        components:{
            apexchart: VueApexCharts,
        },
        props:['result'],
        mounted() {
            /* eslint-disable no-console */
            this.convertToChartOption()

            this.convertToPerformanceData();

            console.log(this.chartOptions)

        },
        data:function () {
            return {
                series: [{
                    name: 'SEO',
                    data: [],
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'radar',
                    },
                    title: {
                        text: 'Analyze Results'
                    },
                    xaxis: {
                        categories: ["Performance", "Accessibility", "Best Practices", "SEO", "Progressive Web App"]
                    }
                },
                performanceData : []
            }
        },
        computed:{
          audits:function () {
            return this.result.audits
          }
        },
        methods:{
            convertToChartOption(){
                const categories = this.result.categories;
                const chartValue = [];

                for(let key in categories){
                    chartValue.push(categories[key].score * 100);
                }

                this.series[0].data = chartValue;

            },
            convertToPerformanceData(){
                this.performanceData = []

                for(const property of this.result.categories.performance.auditRefs){
                    const audits = this.result.audits;
                    const tmp = {};
                    tmp.id = property.id;
                    tmp.title = audits[property.id].title
                    tmp.displayValue = audits[property.id].displayValue
                    this.performanceData.push(tmp);
                }
            }
        }
    }
</script>

<style scoped>
    .font-weight-bold{
        font-weight: bold;
    }
</style>