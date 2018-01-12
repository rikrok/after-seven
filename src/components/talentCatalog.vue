<template>
    <div class="bg-secondary mr-3 ml-3">    
        <b-card-group deck>                                  
        <div v-for="(talent, index) in this.items" :key="index" class="col-md-3 col-6 my-1 text-left">                                     
            <b-card                             
                v-bind:title="talent.name"
                v-bind:header="talent.header" 
                v-bind:sub-title="talent.tags"
                header-bg-variant="dark" 
                header-text-variant="white"                     
                border-variant="dark">
                <p> 
                    {{ talent.activation }} 
                    {{ talent.ranked }}
                </p>
                <hr>
                <p>  {{ talent.description }}  </p>
                                  
                <div slot="footer" class="text-muted"> {{ talent.footer }} </div>
            </b-card>                                
        </div>
        </b-card-group>             
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: []
        }    
    }, 
    created () {       
        
        this.someData = require('../data/talents.json');                
                
        var someList = [];                

        for(var i = 0; i < this.someData.length; i++){
                                        
            var t = [];                    
                t.name = this.someData[i].talentName;
                t.header = this.someData[i].tier;
                t.description = this.someData[i].description;
                t.activation = this.someData[i].activation;
                t.ranked = this.someData[i].ranked;                    
                t.tags = this.someData[i].tags;
                t.footer = this.someData[i].sourcing;
                someList.push(t);                    
        }

        this.items = someList;
        
    }    
}
</script>
