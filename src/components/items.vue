\<template>
    <div class="p-3 mx-3 text-left bg-light">    
        <h1> <strong> Items </strong> </h1>
        <p> 
            There are the allow items of this setting. Some of these have a specific twist created through the 
            rulebook. However, there are a few of these are straight from the Fantasy, Steampunk and Weird War 
            setting. Many of the new items were created to give non-magic users just as vibrant style of gameplay.
        </p>
        <p> 
            As of now, there is no other weapons than the weapons hand picked from the core rulebook. There is 
            an desire to add more, but will do at a later point.
        </p>
        <hr>
        <b-container class="text-left">
            <b-row>
                <b-col> <strong> Item Categories </strong> </b-col>
                <b-col> <strong>  </strong>  </b-col>
            </b-row>            
            <b-row>
                <b-col> 
                    <b-form-checkbox-group v-model="selected" :options="this.options" class="mb-3"/> 
                    <b-btn variant="success" @click="filterItems"> Filter Items </b-btn> 
                </b-col>
            </b-row>
        </b-container>

        <hr>        
        <b-card-group>                                  
            <div v-for="(item, index) in this.items" :key="index" class="col-md-3 col-6 my-1 text-left">                                     
                <b-card                             
                    v-bind:title="item.name"
                    v-bind:header="item.category + ': ' + item.subCategory" 
                    v-bind:sub-title="item.value.toString() + ' Credits'"
                    bg-variant="dark" 
                    text-variant="light">

                        <p v-if="item.category === 'Weapon'"> 
                            <strong> {{ item.skill }} </strong> </br>
                            Range: {{ item.range }} 
                        </p>

                        <p> {{ item.description }} </p>
                        
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
            options: ["Soak Armor", "Defensive Armor", "Brawl Weapons", "Gunnery Weapons", "Melee Weapons", "Ranged (Light) Weapons", "Ranged (Heavy) Weapons", "Alchemy Products", "Adventuring Gear", "Implementations"],
            selected:["Soak Armor", "Defensive Armor", "Brawl Weapons", "Gunnery Weapons", "Melee Weapons", "Ranged (Light) Weapons", "Ranged (Heavy) Weapons", "Alchemy Products", "Adventuring Gear", "Implementations"],
            data: [],
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
        }
    },
    created () {       

        this.items.splice(0,1);
        
        var data = require('../data/gear.json');      

        for(var i = 0; i < data.length; i++) {            
            var d = data[i];
            d.qualityText = "";                            
            d.hasSpecials = false;

            if (typeof data[i].specialAbilities === "undefined") {                        
            } else {
                d.hasSpecials = true;
            }

            this.items.push(d);        
        }        

        data = require('../data/weapons.json');

        for(var i = 0; i < data.length; i++) {            
            var d = data[i];
            d.hasSpecials = false;
            
            d.qualityText = "";
            
            if (typeof data[i].qualities === "undefined") {                        
            } else {
                for(var j = 0; j < data[i].qualities.length; j++) {         
                    
                    if(data[i].qualities[j].value > 0) {                    
                        if(["auto-fire", "knockdown", "reinforced"].indexOf(data[i].qualities[j].name) >= 0) {
                            //Don't give a rating.                    
                            d.qualityText += data[i].qualities[j].name  + ", "
                        } else {                        
                            d.qualityText += data[i].qualities[j].name + " " + data[i].qualities[j].value + ", ";         
                        }           
                    }
                }
                                 
                if (data[i].qualities.length > 0) {       
                    data[i].qualityText = data[i].qualityText.slice(0, -2);
                }  
            }

            if (typeof data[i].specialAbilities === "undefined") {                        
            } else {
                d.hasSpecials = true;
            }
            
            this.items.push(d);        
        }
        
        data = require('../data/armor.json');

        for(var i = 0; i < data.length; i++) {            
            var d = data[i];
            
            d.hasSpecials = false;            
            d.qualityText = "";
        
            if (typeof data[i].qualities === "undefined") {                        
            } else {
                for(var j = 0; j < data[i].qualities.length; j++) {         
                    
                    if(data[i].qualities[j].value > 0) {                    
                        if(["auto-fire", "knockdown", "reinforced"].indexOf(data[i].qualities[j].name) >= 0) {
                            //Don't give a rating.                    
                            d.qualityText += data[i].qualities[j].name  + ", "
                        } else {                        
                            d.qualityText += data[i].qualities[j].name + " " + data[i].qualities[j].value + ", ";         
                        }           
                    }

                    if(data[i].qualities.length > 0) {                
                        d.qualityText = d.qualityText.substring(0, d.qualityText.length - 2);                
                    }
                }   

                if (data[i].qualities.length > 0) {       
                    data[i].qualityText = data[i].qualityText.slice(0, -2);
                }  
            }

            if (typeof data[i].specialAbilities === "undefined") {                        
            } else {
                d.hasSpecials = true;
            }

            this.items.push(d);        
        }

        this.data = this.items;
    }    
}
</script>
