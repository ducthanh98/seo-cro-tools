<template>
    <div class="h-100">
        <div class="flex" @click="updateHeatmapData($event)">
            <input @keyup="updateHeatmapData($event)">
            <button @click="getResults()">Get Results</button>
        </div>
    </div>
</template>

<script>
    import h337 from 'heatmap.js';
    export default {
        name: "HeatMap",
        data:()=>({
            heatmapData : [],
            heatmap:null,
        }),
        methods:{
            updateHeatmapData($event){
                // eslint-disable-next-line no-console
                console.log($event)
                let exist = false;
                this.heatmapData.map(n=>{
                    if(n.x === $event.x && n.y === $event.y) {
                        n.value++;
                        exist = true;
                    }
                    return n;
                })
                if(!exist) this.heatmapData.push({x:$event.x,y:$event.y,value:1})
            },

            getResults(){

                this.heatmap = h337.create({
                    container: document.querySelector('.flex')
                });
                this.heatmap.setData({
                    data: this.heatmapData
                });
            }
        }
    }
</script>

<style>
    html,body{
        height: 100%;
    }
</style>
<style scoped>
    .flex{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

    }
    .h-100{
        height: 100%;

    }
</style>