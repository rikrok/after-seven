<template>
    <div class="text-left p-3 mx-3 bg-light">
        <h1> <strong> Where Are They Now </strong> </h1>
        <p> 
            Here's a broad understanding of the state of North America now, after such chaos and bloodshed over the years.
        </p>        
        <hr>
        <b-container class="text-left col-12">
            <b-row>
                <b-col> <strong> Political Layer </strong> </b-col>
                <b-col> <strong>  </strong>  </b-col>
            </b-row>            
            <b-row>
                <b-col> 
                    <b-form-checkbox-group buttons button-variant="info" size="sm" v-model="selected" :options="this.layers" class="mb-3"/> 
                </b-col>
            </b-row>
            <b-row> 
                <b-col>                
                    <b-btn variant="secondary" @click="filterItems"> Filter Items </b-btn> 
                </b-col>
            </b-row>
        </b-container>
        <hr>        
        <b-card-group>                                  
            <div v-for="(item, index) in this.items" :key="index" class="col-md-3 col-6 my-1 text-left">                                     
                <b-card                             
                    v-bind:title="item.place"
                    v-bind:header="item.classification" 
                    v-bind:sub-title="item.Status + ': ' + item.habitability"
                    bg-variant="dark" 
                    text-variant="light">
                        <p> {{ item.text }} </p>                     
                    <div slot="footer" class="text-muted">Claimed by {{ item.claim }}  </div>
                </b-card>                                
            </div>
        </b-card-group>             
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: [],
            items: [],
            selected: [ "Canada", "Mexico",  "USA"],
            layers: [
                {text: "Caribbean",  value: "Caribbean" },
                {text: "Central America",  value: "Central America" },
                {text: "Canada",  value: "Canada" },
                {text: "Greenland",  value: "Greenland" },
                {text: "Iceland",  value: "Iceland"},
                {text: "Mexico",  value: "Mexico" },
                {text: "USA",  value: "USA" },
                {text: "Other",  value: "Other" },
            ]
        }
    }, methods : {
        filterItems () {
            var list = [];

            for(var i = 0; i < this.data.length; i++) {

                var x = this.selected.indexOf(this.data[i].politicalLayer);
                
                if (x >= 0) {
                    list.push(this.data[i]);
                }
            }
            
            this.items = list;
        }
    },
    created () {
        this.data = require("../data/aswherearetheynow.json");
        this.items = this.data;
    }
}
</script>