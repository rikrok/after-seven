<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h1> <strong> Races </strong> </h1>        
        <p> 
            In the lexicon and trend of Genesys, a race is a species or archetype within this website. Any races not referenced by the Core Rulebook were cooked for After Seven.
        </p>        
        <hr>
        <b-container class="text-left">
            <b-row>
                <b-col> <strong> Settings </strong> </b-col>
                <b-col> <strong>  </strong>  </b-col>
            </b-row>            
            <b-row>
                <b-col> <b-form-select v-model="selectedGenre" :options="settingGenres" class="mb-3"/> </b-col>
                <b-col> <b-btn variant="success" @click="filterRaces"> Filter Races </b-btn> </b-col>
            </b-row>
        </b-container>

        <hr>
        <p> </p>  
        <b-container class="w-75">
            <b-row v-for="(race, rIndex) in items" :key="rIndex">
                <b-col>
                    <b-card                        
                        v-bind:header="race.genre"                        
                        header-bg-variant="dark"
                        header-text-variant="white">
                        <h2> <strong> {{ race.name }} </strong> </h2>
                        {{ race.description }}
                        <p> </p>
                        <hr> 
                        <h4> Characteristics </h4>
                        <small class="text-muted"> Note: these are starting values </small>
                        <b-container>
                            <b-row>
                                <b-col>
                                    <b-table head-variant="light" responsive="sm" dark small striped bordered :items="race.characteristics"/>
                                </b-col>
                                <b-col>
                                    <b-table head-variant="light" responsive="sm" dark small striped bordered :items="race.derivedCharacteristics"/>
                                </b-col>
                            </b-row>
                        </b-container>                                                
                        <hr>
                        <h4> <strong> Goodies </strong> </h4>
                        <b-card-group deck>
                            <b-card bg-variant="dark" text-variant="light" v-bind:title="race.racialSkills.name"> 
                                {{ race.racialSkills.flavor }}
                                <p>
                                    <div v-if="race.racialSkills.tag === 'choice'"> Skill Selection: </br>  
                                        <div class="pl-2" v-for="(skill, sIndex) in race.racialSkillBonus" :key="sIndex"> {{ skill }} </div>
                                    </div>
                                </p>
                            </b-card>                            
                            <b-card bg-variant="dark" text-variant="light" v-for="(ability, aIndex) in race.racialAbilities" :key="aIndex" v-bind:title="ability.name"> {{ability.description}} </b-card>
                        </b-card-group>                        
                        <div slot="footer" class="text-muted"> Starting XP: {{ race.startingXP }} </div>
                    </b-card>   
                    <p> </p>                 
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {    
    data () {
        return {
            raceData: [],            
            settingGenres: [
                { value:"After Seven", text:"After Seven" },
                { value:"Custom", text:"Custom" },
                { value:"Fantasy", text:"Fantasy" },
                { value:"Steampunk", text:"Steampunk" },
                { value:"Weird War", text:"Weird War" },
                { value:"Modern", text:"Modern" },
                { value:"Sci-fi", text:"Sci-fi" },
                { value:"Space Opera", text:"Space Opera" },
            ],            
            selectedGenre: "After Seven",
            items: []
        }    
    }, 
    methods : {
        filterRaces() {
            var list = [];

            for (var i = 0; i < this.raceData.length; i ++){
            
                var n = this.raceData[i].genre.search(this.selectedGenre);
            
                if (n >= 0) {
                    list.push(this.raceData[i]);
                }            
            };       

            this.items = list;
        }
    },
    created () {       
        this.raceData = require('../data/race.json');
        this.filterRaces();
    }
}
</script>
