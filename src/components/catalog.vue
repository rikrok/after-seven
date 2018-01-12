<template>
    <div class="row bg-secondary mr-3 ml-3">                          
        <div v-for="(someItem, index) in this.items" :key="index" class="col-md-3 col-6 my-1 text-left">                                 
            <b-card                             
                v-bind:title="someItem.name"
                v-bind:header="someItem.header" 
                v-bind:sub-title="someItem.tags"
                header-bg-variant="dark" 
                header-text-variant="white"                     
                border-variant="dark">
                <p class="text-left"> {{ someItem.textSlot1 }} </p>
                <p class="text-left"> {{ someItem.textSlot2 }} </p>
                <p class="text-left"> {{ someItem.textSlot3 }} </p>
                <p class="card-text"> {{ someItem.description }} </p>                
                
                <div v-if="arraySlot1Flag === true" class="text-left">
                    <hr>
                    <h4> <strong> {{ arraySlot1Label }} </strong> </h4>
                        <ul>
                            <li class="text-left" v-for="(v, index) in someItem.arraySlot1" :key="index"> {{ v.name }} : {{v.value}} </li>                                 
                        </ul> 
                </div>
                       
                <div v-if="arraySlot2Flag === true" class="text-left"> 
                    <hr>
                    <h4> <strong> {{ arraySlot2Label }} </strong> </h4>
                        <ul>
                            <li class="text-left" v-for="(v, index) in someItem.arraySlot2" :key="index"> {{ v }} </li>                                 
                        </ul> 
                </div>

                       
                <div v-if="arraySlot3Flag === true" class="text-left">
                    <hr>
                    <h4> <strong> {{ arraySlot3Label }} </strong> </h4>
                        <ul>
                            <li class="text-left" v-for="(v, index) in someItem.arraySlot3" :key="index"> {{ v }} </li>                                 
                        </ul> 
                </div>

                       
                <div v-if="arraySlot4Flag === true" class="text-left">
                    <hr>
                    <h4> <strong> {{ arraySlot4Label }} </strong> </h4>
                        <ul>
                            <li class="text-left" v-for="(v, index) in someItem.arraySlot4" :key="index"> {{ v }} </li>                                 
                        </ul> 
                </div>

                <div slot="footer" class="text-muted"> {{ someItem.footer }} </div>
            </b-card>            
        </div>
    </div>
</template>

<script>
export default {
    name: "catalog",
    props: ['id'],
    data () {
        return {
            catalogType: 'race',
            someData: {
                name: "",
                header: "",
                description: "",
                footer: "",
                textSlot1: "",
                textSlot2: "",
                textSlot3: "",
                textSlot4: "",
                textSlot5: "",
                textSlot6: "",
                textSlot: "",
                arraySlot1: [],
                arraySlot2: [],
                arraySlot3: [],
                arraySlot4: [],                
            },
            arraySlot1Flag: false,
            arraySlot1Label: "",
            arraySlot2Flag: false,
            arraySlot2Label: "",
            arraySlot3Flag: false,
            arraySlot3Label: "",
            arraySlot4Flag: false,
            arraySlot4Label: "",
            items: []
        }    
    }, 
    created () {       
        this.catalogType = this.id;

        console.log(this.catalogType);

        switch(this.catalogType) {
            case "race": 

                this.someData = require('../data/race.json');                
                
                var someList = [];                

                for(var i = 0; i < this.someData.length; i++){
                                        
                    var t = [];                    
                    t.name = this.someData[i].name;
                    t.header = "After Seven Race";
                    t.description = this.someData[i].description;
                    
                    t.arraySlot1 = this.someData[i].characteristics;
                    t.arraySlot2 = this.someData[i].racialSkills;
                    t.arraySlot3 = this.someData[i].racialAbilities;                    

                    this.arraySlot1Flag = true;
                    this.arraySlot2Flag = true;
                    this.arraySlot3Flag = true;
                    
                    this.arraySlot1Label = "Starting Characteristics";
                    this.arraySlot2Label = "Racial Skills";
                    this.arraySlot3Label = "Abilities";
                                        
                    t.footer = "Starting XP: " + this.someData[i].startingXP;

                    someList.push(t);                    
                }

                this.items = someList;
                
                break;           
        }                

        switch(this.catalogType) {
            case "talents": 
                this.someData = require('../data/talents.json');                
                
                var someList = [];                

                for(var i = 0; i < this.someData.length; i++){
                                        
                    var t = [];                    
                    t.name = this.someData[i].talentName;
                    t.header = this.someData[i].Tier;
                    t.description = this.someData[i].Text;
                    t.textSlot1 = this.someData[i].Activation;
                    t.textSlot2 = this.someData[i].Ranked;                    
                    t.tags = this.someData[i].tags;
                    t.footer = this.someData[i].Sourcing;

                    someList.push(t);                    
                }

                this.items = someList;

                break;           
        }              
        
    }    
}
</script>
