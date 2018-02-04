<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h3> Racial Generator </h3>
        <p>
            This will let you save a batch of races to import into the PC Generator. Keep in mind the guidelines of character 
            creation spelled out in the Genesys Core Rulebook.
        </p>
        <p>
            Right now, the generator only grants choices of skills or a single skill. Select "Custom" in the genre to see your races on the PC Generator page.
        </p>
        <p>
            Clicking the save button will add the race. If it detects another talent by its race, it will save over the other race.
        </p>
        <hr>
        <b-container class="text-center">
            <b-row>
                <b-col>  <h5> <strong> Races: </strong> </h5> </b-col>
                <b-col>  <h5> <strong> Export Races </strong> </h5> </b-col>
            </b-row>
            <b-row>
                <b-col> {{ raceList.length }} </b-col>
                <b-col> <b-btn v-bind:disabled="raceList.length < 1" variant="primary" @click="showExportModal"> JSON </b-btn> </b-col>
            </b-row>
        </b-container>
        <hr>

        <b-container>
            <b-row>
                <b-col>
                    <b-card bg-variant="dark" header-bg-variant="dark" text-variant="white">

                        <b-input-group>                                    
                            <b-form-input v-model="boxName" type="text" placeholder="Name"/>                                    
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="danger" size="sm" @click="clearRace"> Clear </b-btn>
                            </b-input-group-addon>
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="success" size="sm" @click="addRace"> Save </b-btn>
                            </b-input-group-addon>                        
                        </b-input-group> </br>
                        
                        <strong> Racial Abilities: {{ race.racialAbilities.length }} </strong>
                        
                        <p>                       
                            <b-form-group label="<small>Skill Freebee Type</small>">
                                <b-form-radio-group buttons button-variant="dark" v-model="skillOptionSelected" :options="skillOptions"/>
                            </b-form-group>
                            <div v-if="skillOptionSelected === 'gain'">  <strong> Skill Selection: </strong> </div>          
                            <div v-if="skillOptionSelected === 'choice'">  <strong> Skills Selected: {{ skillSelected.length }} </strong> </div> 
                            <b-form-select v-if="skillOptionSelected === 'gain'" v-model="skillSelected" :options="skillData"/>
                            <b-form-select v-if="skillOptionSelected === 'choice'" :select-size="12" multiple v-model="skillSelected" :options="skillData"/>
                        </p>
                    
                        <b-input-group>
                            <b-input-group-addon> Starting XP </b-input-group-addon>
                            <b-form-input v-model="boxXP" size="sm" type="number"/>                                    
                        </b-input-group>     
                    </b-card>         
                    
                </b-col>

                <b-col>
                    <b-table small striped bordered responsive="sm" class="text-left" :items="this.race.characteristics" :fields="statFields" head-variant="dark">
                        <template slot="actions" slot-scope="row">
                            <b-btn v-bind:disabled="row.item.value === 0" size="sm" variant="danger" v-on:click.stop="row.item.value -=1 "> - </b-btn>
                            <b-btn v-bind:disabled="row.item.value === 5" size="sm" variant="success" v-on:click.stop="row.item.value +=1 "> + </b-btn>  
                        </template>
                    </b-table>
                </b-col>

                <b-col>
                    <b-table small striped bordered responsive="sm" class="text-left" :items="this.race.derivedCharacteristics" :fields="statFields" head-variant="dark">
                        <template slot="actions" slot-scope="row">  
                            <b-btn v-bind:disabled="row.item.value === 0" size="sm" variant="danger" v-on:click.stop="row.item.value -=1 "> - </b-btn>
                            <b-btn size="sm" variant="success" v-on:click.stop="row.item.value +=1 "> + </b-btn>  
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-container>
        
        <hr>        
        <b-container id="abilities">
            <b-row>
                <b-col> 
                    <b-form-group> 
                        <b-input-group>
                            <b-form-input type="text" v-model="racialAbilityName" placeholder="Ability Name"/>
                            <b-input-group-addon>  
                                <b-btn size="sm" variant="success" @click="addAbility"> Add Ability </b-btn>                                                                                  
                            </b-input-group-addon>                                        
                        </b-input-group>
                        <b-form-textarea :max-rows="8" :rows="3" v-model="racialAbilitydescription" placeholder="Add text about the custom ability"/>
                    </b-form-group>                   
                </b-col>

                <b-col>
                    <b-table small striped bordered responsive="sm" class="text-left" :items="this.race.racialAbilities" :fields="abilityFields" head-variant="dark">
                        <template slot="actions" slot-scope="row">
                            <b-btn size="sm" variant="danger" v-on:click.stop="removeAbility(row.item)"> - </b-btn>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-container>
        
        <b-modal centered v-model="exportModel" size="lg" title="Export as a JSON" header-class="bg-dark text-light">
            <b-container>
                <b-row>
                        <p> Please copy and paste the following to a notepad editor, then save it.
                            </br> <b-link href="http://lmgtfy.com/?q=notepad%2B%2B" target="_new"> Might I suggest Notepad++? </b-link> 
                        </p>
                </b-row>
                <b-row>
                    <b-col>
                        <p class="text-left">
                           <b-form-textarea :max-rows="20" :rows="3" v-model="exportContent"/>
                        </p>                         
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            exportModel: false,
            iterator: 0,
            skillData: [],
            boxName: '',
            boxXP: 100,
            statFields: [
                    { key: "name", label: "Name", class: "text-left" },                    
                    { key: "value", label: "Value", class: "text-center" },   
                    { key: "actions", label: " ", class: "text-center"}                
            ],
            abilityFields: [
                    { key: "name", label: "Name", class: "text-left" },                    
                    { key: "description", label: "Description", class: "text-left" },   
                    { key: "actions", label: " ", class: "text-center"}                
            ],
            skillSelected: [],
            skillOptions: [ 
                { value:"gain", text: "Automatic" }, 
                { value: "choice", text: "Choice" }, 
                //{ value: "Free 2 Skills", text: "Free 2 Skills", disabled: true }, 
                //{ value: "Free Non Career Skills", text: "Free Non Career Skills", disabled: true },
                //{ value: "Free Career Skills", text: "Free Non Career Skills", disabled: true },
                { value: "none", text: "None" },                
            ],
            skillOptionSelected: "gain",
            racialAbilityName: '',
            racialAbilitydescription: '',
            raceList: [], 
            race: {
                id: '',
                genre: 'Custom',
                name: '',
                characteristics: [ 
                    { name: "Agility", value: 2 },
                    { name: "Brawn", value: 2 },
                    { name: "Cunning", value: 2 }, 
                    { name: "Intellect", value: 2 },
                    { name: "Presence", value: 2 }, 
                    { name: "Willpower", value: 2 }, 
                    { name: "Silhouette", value: 1 }
                ],  
                derivedCharacteristics: [             
                    { name: "Current Encumbrance", value: 0 },        
                    { name: "Encumbrance Capacity", value: 0 },
                    { name: "Melee Defense", value: 0 },
                    { name: "Ranged Defense", value: 0},
                    { name: "Soak", value: 0 },
                    { name: "Strain Threshold", value: 10 },
                    { name: "Wounds Threshold", value: 10 }
                ],
                startingXP: 0,
                racialSkills: { name: '', flavor: '', tag: '' },
                racialSkillBonus: [],
                racialAbilities: [],
            },
            exportContent: ''
        }
    },
    methods: {
        idGen: function () {
            this.iterator += 1;
            this.race.id = "cR" + this.iterator;
            return true;
        },
        findWithAttr: function (array, attr, value) {

            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }

            return -1;      
        },
        showExportModal: function () {            
            this.exportContent = JSON.stringify(this.raceList, null, '\t');
            this.exportModel = true;
            return true;
        },
        addAbility: function () {
            if (this.racialAbilityName === '' || this.racialAbilitydescription === '') return false; 
            var a = { name: this.racialAbilityName, description: this.racialAbilitydescription };
            this.race.racialAbilities.push(a);
            this.racialAbilityName = '';
            this.racialAbilitydescription = '';
            return true;
        },
        removeAbility: function (ability) {
            var i = this.findWithAttr(this.race.racialAbilities, "name", ability.name); 
            if (i >= 0) this.race.racialAbilities.splice(i, 1);
            return true;
        },
        clearRace: function () {
            var r = {
                id: '',
                genre: 'Custom',
                name: '',
                characteristics: [ 
                    { name: "Agility", value: 2 },
                    { name: "Brawn", value: 2 },
                    { name: "Cunning", value: 2 }, 
                    { name: "Intellect", value: 2 },
                    { name: "Presence", value: 2 }, 
                    { name: "Willpower", value: 2 }, 
                    { name: "Silhouette", value: 1 }
                ],  
                derivedCharacteristics: [             
                    { name: "Current Encumbrance", value: 0 },        
                    { name: "Encumbrance Capacity", value: 0 },
                    { name: "Melee Defense", value: 0 },
                    { name: "Ranged Defense", value: 0},
                    { name: "Soak", value: 0 },
                    { name: "Strain Threshold", value: 10 },
                    { name: "Wounds Threshold", value: 10 }
                ],
                startingXP: 0,
                racialSkills: { name: '', flavor: '', tag: '' },
                racialSkillBonus: [],
                racialAbilities: [],
            }
            this.boxName = '';
            this.boxXP = 100;
            this.race = r;
            return true;
        },
        addRace: function () {

            if (this.boxName === '') return false;

            var r = {
                id: '',
                genre: 'Custom',
                name: '',
                characteristics: [ 
                    { name: "Agility", value: 2 },
                    { name: "Brawn", value: 2 },
                    { name: "Cunning", value: 2 }, 
                    { name: "Intellect", value: 2 },
                    { name: "Presence", value: 2 }, 
                    { name: "Willpower", value: 2 }, 
                    { name: "Silhouette", value: 1 }
                ],  
                derivedCharacteristics: [             
                    { name: "Current Encumbrance", value: 0 },        
                    { name: "Encumbrance Capacity", value: 0 },
                    { name: "Melee Defense", value: 0 },
                    { name: "Ranged Defense", value: 0},
                    { name: "Soak", value: 0 },
                    { name: "Strain Threshold", value: 10 },
                    { name: "Wounds Threshold", value: 10 }
                ],
                startingXP: 0,
                racialSkills: { name: '', flavor: '', tag: '' },
                racialSkillBonus: [],
                racialAbilities: [],
            }

            var i = this.findWithAttr(this.raceList, "name", this.boxName);

            r.name = this.boxName;
            r.startingXP = this.boxXP;
            r.racialSkills.name = "Custom Skill";
            r.racialSkills.flavor = "Custom Skill";
            r.racialSkills.tag = this.skillOptionSelected;

            if (this.skillOptionSelected === 'gain') {
                r.racialSkillBonus.push(this.skillSelected);
            } else if (this.skillOptionSelected === 'choice') {
                r.racialSkillBonus = this.skillSelected;
            }
            
            r.characteristics = this.race.characteristics;

            r.derivedCharacteristics = this.race.derivedCharacteristics;

            if (i < 0) {
                this.idGen();
                r.id = this.race.id;
                this.raceList.push(r);
            } else {
                this.raceList[i] = this.race;
            }

            return true;
        },
    },
    created () {
        var skills = require('../data/skills.json');
        
        var skillNames = [];
        //loop only value of names.
        for (var s = 0; s < skills.length; s++) {
            if(skillNames.indexOf(skills[s].skill) < 0) {
                skillNames.push(skills[s].skill);
            }
        }

        for(var i = 0; i < skillNames.length; i++) {   
            this.skillData.push(skillNames[i]);
        }
    }
}
</script>