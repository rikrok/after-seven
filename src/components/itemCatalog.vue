\<template>
    <div class="bg-secondary mr-3 ml-3 text-left">    
        <b-card-group>                                  
            <div v-for="(item, index) in this.items" :key="index" class="col-md-3 col-6 my-1 text-left">                                     
                <b-card                             
                    v-bind:title="item.name"
                    v-bind:header="item.category + ': ' + item.subCategory" 
                    v-bind:sub-title="item.value.toString() + ' Credits'"
                    header-bg-variant="dark" 
                    header-text-variant="white"                     
                    border-variant="dark">

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
                        <hr> 
                        
                        <b-container>
                            <b-row v-if="item.qualityText != ''"> 
                                <b-col> {{ item.qualityText }} </b-col>
                            </b-row>
                        </b-container>
                        <hr> 
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
            items: [ {
                id: "",
                category: "",
                subCategory: "",
                itemType: "",
                name: "",
                description:"",
                hardPoints:0,
                value: 0,
                rarity: 0,
                encumbrance: 0,
                wornEncumbrance: 0,
                soak:0,
                defense:0,
                damage:0,
                critical:0,
                skill: "",
                range: "",
                specialAbilities: [{}],
                qualities: [{}],
                qualityText: "",                
                hasSpecials: false,
                _showDetails: false,
                quantity: 0,
                repairNeeded: ""  
            } ]
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
                console.log("undefined");
                console.log(data[i]);
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
            d.subCategory = d.category;
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
    }    
}
</script>
