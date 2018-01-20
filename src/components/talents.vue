<template>
    <div class="p-3 mx-3 text-left bg-light">   
        <h1> <strong> Talents </strong> </h1>
        <p> 
            Many of these talents come from <b-link href="https://community.fantasyflightgames.com/topic/265863-genesys-talents-expanded/"> the Genesys community </b-link> compiled by TheSapient, ESP77, Swordbreaker 
            and Richardbuxton. These four have put in a lot of effort into it. I just created descriptions that do not use diamonds and the icons used by the game.  A lot of the 
            sources of these talents are from this collection, and are noted with the sourcing system.
        </p>
        <p> 
            I also pulled seven talents from this <b-link href="https://www.reddit.com/r/genesysrpg/comments/7kcwmz/i_put_together_some_talents_for_the_magic_system/">
            Reddit thread</b-link>, sourced as 'Greatfrito's Genesys Magic Talents'. There is one talent I pulled from a forum post as well, sourced by the author (OgreBane99).
        </p>
        <p>
            Also in this talent pool are my own talents as well as Genesys talents. My talents are labeled "After Seven" where as the default talent is "GCRB". 
        </p>
        <hr>
        <b-container class="text-left">
            <b-row>
                <b-col> <strong> Settings </strong> </b-col>
                <b-col> <strong> Alternative Rules </strong>  </b-col>
            </b-row>            
            <b-row>
                <b-col> <b-form-select v-model="selectedGenre" :options="this.settingGenres" class="mb-3"/> </b-col>
                <b-col> <b-form-checkbox-group v-model="selectedAlternativeRules" :options="this.alternativeRules" />  </b-col>
            </b-row>
            <b-row>
                <b-col> <strong> Tiers </strong> </b-col>
                <b-col> <strong>  </strong>  </b-col>
            </b-row>
            <b-row>
                <b-col> 
                    <b-form-checkbox-group v-model="selectedTiers" :options="this.avaiableTiers" /> 
                    <b-btn variant="success" @click="filterTalents"> Filter Talents </b-btn> 
                </b-col>
            </b-row>
        </b-container>
        <hr>
        <p> </p>   
        <b-card-group columns class="p-1">
            <div v-for="(talent, index) in items" :key="index" v-show="talent.isShown === true"> 
                <b-card 
                    v-bind:title="talent.name"
                    v-bind:header="talent.header" 
                    v-bind:sub-title="talent.tags"
                    bg-variant="dark"
                    text-variant="white"
                >                    
                    <p> 
                        {{ talent.activation }} </br>
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
            items: [],
            talentData: [],
            talentGenreData: [],
            alternativeRules: ["After Seven", "Custom", "Hacking", "Magic", "Vehicle"],         
            settingGenres: ["After Seven", "Custom", "Fantasy", "Steampunk", "Weird War", "Modern", "Sci-fi", "Space Opera"],

            selectedGenre: "After Seven",
            selectedAlternativeRules: ["After Seven", "Magic"],
            selectedTiers: ["Tier: 1", "Tier: 2", "Tier: 3", "Tier: 4", "Tier: 5" ],
            avaiableTiers: ["Tier: 1", "Tier: 2", "Tier: 3", "Tier: 4", "Tier: 5" ],
        }    
    },     
    methods: {
        findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        },
        filterTalents () {
            var altRules = this.selectedAlternativeRules;
            altRules.push("Default"); 

            var talentList = [];
            
            for (var i = 0; i < this.talentGenreData.length; i ++) {            

                var n = this.talentGenreData[i].genres.search(this.selectedGenre);                      
                var a = altRules.indexOf(this.talentGenreData[i].alternativeRules);                

                if (n >= 0 && a >= 0) {

                    var x = this.findWithAttr(this.talentData, "id", this.talentGenreData[i].id);
                    
                    if( x >= 0) {
                                                
                        var z = this.selectedTiers.indexOf(this.talentData[x].tierDisplay);
                        
                        if (z >= 0) {
                            var t = {
                                name: this.talentData[x].name,
                                header: this.talentData[x].tierDisplay,
                                description: this.talentData[x].alteredText,
                                activation: this.talentData[x].activation,
                                ranked: this.talentData[x].rankedDisplay,            
                                tags: this.talentData[x].tags,
                                footer: this.talentData[x].sourcing,
                                isShown: true
                            };

                            talentList.push(t);
                        }
                    }
                }
            }
            
            var t = talentList.slice(0);
            
            t.sort(function (a, b) {
                var xHeader = a.header;
                var yHeader = b.header;
                var xName = a.name;
                var yName = b.name;                
                return (xHeader < yHeader) ? -1 : (xHeader > yHeader) ? 1 : ( (xName < yName) ? -1 : (yName > xName) ? 1 : 0);            
            })
        
            this.items = t;     
        }
    },
    created () {   
               
        this.talentData = require('../data/talents.json');
        this.talentGenreData = require('../data/talentGenres.json');

        var altRules = [];
        altRules.push("After Seven"); 

        var talentList = [];

        for (var i = 0; i < this.talentGenreData.length; i ++) {            

            var n = this.talentGenreData[i].genres.search("After Seven");                      
            var a = altRules.indexOf(this.talentGenreData[i].alternativeRules);


            if (n >= 0 && a >= 0) {

                var x = this.findWithAttr(this.talentData, "id", this.talentGenreData[i].id);


                if( x >= 0) {

                    var t = {
                        name: this.talentData[x].name,
                        header: this.talentData[x].tierDisplay,
                        description: this.talentData[x].alteredText,
                        activation: this.talentData[x].activation,
                        ranked: this.talentData[x].rankedDisplay,            
                        tags: this.talentData[x].tags,
                        footer: this.talentData[x].sourcing,
                        isShown: true
                    };

                    talentList.push(t);
                }
            }
        }
        
        var t = talentList.slice(0);
        
        t.sort(function (a, b) {
            var xHeader = a.header;
            var yHeader = b.header;
            var xName = a.name;
            var yName = b.name;            
            return (xHeader < yHeader) ? -1 : (xHeader > yHeader) ? 1 : ( (xName < yName) ? -1 : (yName > xName) ? 1 : 0);            
        })
     
        this.items = t;        
    }    
}
</script>
