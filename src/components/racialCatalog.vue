<template>
    <div class="bg-secondary">
        <b-container class="p-3">
            <b-row class="text-left" v-for="(race, index) in this.raceData" :key="index">
                <b-col>
                    <b-card
                        header-bg-variant="dark"
                        header="After Seven Race"
                        header-text-variant="white"                        
                        border-variant="dark">
                        <h4> <strong> {{ race.name }} </strong> </h4>

                        <h6> <strong> Description </strong> </h6>
                        <p> {{ race.description }} </p>
                        </br>
                        <h6> <strong> Racial Abilities </strong> </h6>
                        <ul>
                                <li v-for="(v, index) in race.racialSkills" :key="index"> <p> <strong> {{ v.name }} </strong> : {{ v.flavor }} </p> </li>                                            
                        
                                <li class="text-left" v-for="(v, index) in race.racialAbilities" :key="index"><p> <strong> {{ v.name }} </strong> : {{ v.description }} </p> </li>                                 
                        </ul>                        
                        <hr>                    
                        <h5> <strong> Characteristics</strong> </h5>
                        <p> </p>
                        <b-row>
                            <b-col>
                                <ul>
                                    <li class="text-left" v-for="(v, index) in race.characteristics" :key="index"> <strong> {{ v.name }} </strong>: {{v.value}} </li>                                 
                                </ul> 
                            </b-col>

                            <b-col>
                                <ul>
                                    <li class="text-left" v-for="(d, someIndex) in race.derivedCharacteristics" :key="someIndex"> 
                                        <strong> {{ d.name }} </strong>: {{d.value}} 
                                    </li>                            
                                </ul> 
                            </b-col>
                        </b-row>                                                      
                        <div slot="footer" class="text-muted"> Starts with {{ race.startingXP }} XP </div>
                    </b-card>
                    <hr>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {    
    props: ['id'],
    data () {
        return {
            raceData: []
        }    
    }, 
    created () {       
        this.raceData = require('../data/race.json');    

        for(var x = 0; x < this.raceData.length; x++) {
            console.log(this.raceData[x]);
            this.raceData[x].derivedCharacteristics[1].value = this.raceData[x].derivedCharacteristics[1].value +  this.raceData[x].characteristics[1].value;            
        }        
    }    
}
</script>
