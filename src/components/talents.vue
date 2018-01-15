<template>
    <div class="p-3 mx-3 text-left bg-light">   
        <b-card-group columns>
            <div v-for="(talent, index) in items" :key="index" > 
                <b-card 
                    v-if="talent.isShown === 1"
                    v-bind:title="talent.name"
                    v-bind:header="talent.header" 
                    v-bind:sub-title="talent.tags"
                    bg-variant="dark"
                    text-variant="white"
                >
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
            searchItem: "",
            items: []
        }    
    }, 
    methods: {
        submit() {
                        

            for(var i = 0; i < this.items.length; i++) {

                var x = this.items[i].searchString.search(this.searchItem);

                if (x < 0) {
                    console.log(this.items[i].name);
                    this.items[i].isShown = 0;
                }

            }
        }
    },
    created () {       
        
        var someData = require('../data/talents.json');                
                
        var someList = [];                

        for(var i = 0; i < someData.length; i++) {
                                        
            var t = [];                    
            t.name = someData[i].talentName;
            t.header = someData[i].tier;
            t.description = someData[i].description;
            t.activation = someData[i].activation;
            t.ranked = someData[i].ranked;                    
            t.tags = someData[i].tags;
            t.footer = someData[i].sourcing;
            //ok instead of an if statement, I present you laziness.
            t.searchString = t.talentName + ";" + t.tier + ";" + t.description + ";" + t.ranked;
            t.isShown = 1;
            someList.push(t);                    
        }
        
        this.items = someList;        
    }    
}
</script>
