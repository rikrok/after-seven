<template>
    <div class="text-left p-3 mx-3 bg-light">
        <h1> <strong> The Remaining Avatars </strong> </h1>
        <p> 
            With the Celestial Invasion came a great purge of all things. Mortal civilization fell, once again. Yet, unlike other apocalypses, the Mortals were not the only ones to suffer. 
        </p>
        <p> A wild and wicked war swept the land destroying not only mortals, but the avatars that enslaved them. Only few avatars survived. 
            Those that remain are mostly dormant and do not hold as much power over mortals as they once did.
        </p>
        <hr>
            <b-card-group>                                    
                <div v-for="(item, index) in this.items" :key="index" class="col-md-3 col-6 my-1 text-left">                                     
                    <b-card                             
                        v-bind:title="item.name"
                        v-bind:header="'Area: ' + item.area" 
                        v-bind:sub-title="'Status: ' + item.status"
                        bg-variant="dark" 
                        text-variant="light">
                            <p> {{ item.note }} </p>   
                            <p class="text-muted" > 
                                Size: {{ item.size }} </br>
                                Allegiance: {{ item.allegiance }} 
                            </p>
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
        this.data = require("../data/asavatars.json");
        this.items = this.data;
    }
}
</script>