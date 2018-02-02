\<template>
    <div class="p-3 mx-3 text-left bg-light">    
        <h1> <strong> Items </strong> </h1>
        <p> 
            Most of these are straight out of the Genesys core rulebook. Where the book goes to make suggestions to alter items, these are also included in variations.         
        </p>
        <hr>
        <b-container class="text-left col-12">
            <b-row>
                <b-col> <strong> Item Categories </strong> </b-col>
                <b-col> <strong>  </strong>  </b-col>
            </b-row>            
            <b-row>
                <b-col> 
                    <b-form-select multiple :select-size="7" v-model="selected" size="md" :options="this.options" class="mb-3"/> 
                    <b-btn variant="secondary" @click="filterItems"> Filter Items </b-btn> 
                </b-col>
            </b-row>
        </b-container>

        <hr>        
        <b-card-group>                                  
            <div v-for="(item, index) in this.items" :key="index" class="col-md-3 col-6 my-1 text-left">                                     
                <b-card                             
                    v-bind:title="item.name"
                    v-bind:header="item.category + ': ' + item.subCategory" 
                    v-bind:sub-title="item.value + ' Credits'"
                    bg-variant="dark" 
                    text-variant="light">

                        <p v-if="item.category === 'Weapon'"> 
                            <strong> {{ item.skill }} </strong> </br>
                            Range: {{ item.range }} 
                        </p>

                        <p> {{ item.description }} </p>

                        <p> Recommended Genres: {{ item.recommendedGenres }} </p>
                        <hr class="bg-light">
                        <b-container>                            
                            <b-row v-if="item.category === 'Armor'">
                                <b-container>
                                    <b-row> <b-col> Defense </b-col> <b-col> {{ item.defense }} </b-col> </b-row>
                                    <b-row> <b-col> Soak </b-col> <b-col> {{ item.soak }} </b-col> </b-row>
                                    <b-row> <b-col> Encum. </b-col> <b-col> {{ item.encumbrance }} </b-col> </b-row>                                    
                                </b-container>                                
                            </b-row>
                                                    
                            <b-row v-if="item.category === 'Weapon'">
                                <b-container>
                                    <b-row> <b-col> Damage </b-col> <b-col> {{ item.damage }} </b-col> </b-row>
                                    <b-row> <b-col> Critical </b-col> <b-col> {{ item.critical }} </b-col> </b-row>
                                    <b-row> <b-col> Encum. </b-col> <b-col> {{ item.encumbrance }} </b-col> </b-row>
                                </b-container>                                
                            </b-row>

                        </b-container>
                        <hr v-if="item.qualityText != ''"> 
                        
                        <b-container>
                            <b-row v-if="item.qualityText != ''"> 
                                <b-col> {{ item.qualityText }} </b-col>
                            </b-row>
                        </b-container>
                        <hr v-if="item.hasSpecials === true"> 
                        <b-container v-if="item.hasSpecials === true">
                            <b-row v-for="(special, index) in item.specialAbilities" :key="index">
                                <b-col> {{ special }}</b-col>
                            </b-row>
                        </b-container>

                    <div slot="footer" class="text-muted">{{ item.rarity }} Base Rarity  </div>
                </b-card>                                
            </div>
        </b-card-group>             
    </div>
</template>

<script>
export default {
    data () {
        return {
            options: [
                { value:"Alchemy Products", text:"Alchemy Products" },
                { value:"Adventuring Gear", text:"Adventuring Gear" },
                { value:"Implementations", text:"Implementations" },
                { value:"Cybernetics", text:"Cybernetics" },
                { value:"Soak Armor", text:"Soak Armor" },
                { value:"Defensive Armor", text:"Defensive Armor" },
                { value:"Brawl Weapons", text:"Brawl Weapons" },
                { value:"Gunnery Weapons", text:"Gunnery Weapons" },
                { value:"Melee Weapons", text:"Melee Weapons" },
                { value:"Ranged (Light) Weapons", text:"Ranged (Light) Weapons" },
                { value:"Ranged (Heavy) Weapons", text:"Ranged (Heavy) Weapons" },
                { value:"Melee (Light) Weapons", text:"Melee (Light) Weapons" },
                { value:"Melee (Heavy) Weapons", text:"Melee (Heavy) Weapons" },
            ],
            selected:[],
            data: [],
            genreData: [],
            items: []
        }    
    }, 
    methods : {
        filterItems () {
            var list = [];

            for(var i = 0; i < this.data.length; i++) {

                var x = this.selected.indexOf(this.data[i].subCategory);

                if (x >= 0) {
                    list.push(this.data[i]);
                }
            }
            
            this.items = list;
        },
        findWithAttr: function (array, attr, value) {

            var listing = [];

            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    listing.push(i);
                }
            }

            return listing;        
        },
    },
    created () {       
        var iterator = 0;
        this.genreData = require('../data/itemGenres.json');   

        var data = require('../data/gear.json');      

        for(var i = 0; i < data.length; i++) {
            var d = data[i];
            d.qualityText = "";
            d.hasSpecials = false;
            d.recommendedGenres = "";

            if (typeof data[i].specialAbilities != "undefined") d.hasSpecials = true;

            var idxs = this.findWithAttr(this.genreData, "id", data[i].id);

            for (var x = 0; x < idxs.length; x++) {
                iterator++;
                d.recommendedGenres += this.genreData[idxs[x]].genres + ', ';
            }
            
            if (iterator > 1) d.recommendedGenres = d.recommendedGenres.slice(0, -2);  

            this.items.push(d);        
        }        

        iterator = 0;
        data = require('../data/weapons.json');

        for(var i = 0; i < data.length; i++) {
            var d = data[i];
            d.hasSpecials = false;   
            d.qualityText = "";
            d.recommendedGenres = "";
            
            if (typeof data[i].qualities != "undefined") {                        
                for(var j = 0; j < data[i].qualities.length; j++) {         
                    
                    if(data[i].qualities[j].value > 0) {        
                        if(["auto-fire", "knockdown", "reinforced", "sunder", "stun damage"].indexOf(data[i].qualities[j].name) >= 0) {
                            //Don't give a rating.                    
                            d.qualityText += data[i].qualities[j].name  + ", "
                        } else {            
                            d.qualityText += data[i].qualities[j].name + " " + data[i].qualities[j].value + ", ";
                        }           
                    }
                }
                                 
                if (data[i].qualities.length > 0) data[i].qualityText = data[i].qualityText.slice(0, -2);   
            }
            

            var idxs = this.findWithAttr(this.genreData, "id", data[i].id);

            for (var x = 0; x < idxs.length; x++) {
                iterator++;
                d.recommendedGenres += this.genreData[idxs[x]].genres + ', ';
            }
            
            if (iterator > 1) d.recommendedGenres = d.recommendedGenres.slice(0, -2);  
            
            if (typeof data[i].specialAbilities != "undefined") d.hasSpecials = true;
            
            this.items.push(d);        
        }
        
        iterator = 0;
        data = require('../data/armor.json');

        for(var i = 0; i < data.length; i++) {
            var d = data[i];
            d.recommendedGenres = "";            
            d.hasSpecials = false;   
            d.qualityText = "";
        
            if (typeof data[i].qualities === "undefined") {            
            } else {
                for(var j = 0; j < data[i].qualities.length; j++) {         
                    
                    if(data[i].qualities[j].value > 0) {        
                        if(["auto-fire", "knockdown", "reinforced", "sunder", "stun damage"].indexOf(data[i].qualities[j].name) >= 0) {
                            //Don't give a rating.                    
                            d.qualityText += data[i].qualities[j].name  + ", "
                        } else {            
                            d.qualityText += data[i].qualities[j].name + " " + data[i].qualities[j].value + ", ";
                        }           
                    }

                    if(data[i].qualities.length > 0) d.qualityText = d.qualityText.substring(0, d.qualityText.length - 2);

                }   

                if (data[i].qualities.length > 0) data[i].qualityText = data[i].qualityText.slice(0, -2);

            }

            if (typeof data[i].specialAbilities != "undefined") d.hasSpecials = true;

            var idxs = this.findWithAttr(this.genreData, "id", data[i].id);

            for (var x = 0; x < idxs.length; x++) {
                iterator++;
                d.recommendedGenres += this.genreData[idxs[x]].genres + ', ';
            }
            
            if (iterator > 1) d.recommendedGenres = d.recommendedGenres.slice(0, -2);  

            this.items.push(d);        
        }

        this.data = this.items;
    }    
}
</script>
