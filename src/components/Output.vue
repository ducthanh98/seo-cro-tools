<template>
    <div>
        <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
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

            }
        }
    }
</script>

<style scoped>

</style>