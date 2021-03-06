<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h3> Talent Generator </h3>
        <p>
            This will let you save a batch of talents to import into the PC Generator. Keep in mind the guidelines of character 
            creation spelled out in the Genesys Core Rulebook.
        </p>
        <p>
            Right now, the generator can not modify skills, characteristics, items or anything on the character. Better to adjust that manually through bonus XP or 
            money, or just as ability text.
        </p>
        <p>
            Clicking the save button will add the talent. If it detects another talent by its name, it will save over the other talent.
        </p>
        <hr>
        <b-container class="text-center">
            <b-row>
                <b-col>  <h5> <strong> Talents: </strong> </h5> </b-col>
                <b-col>  <h5> <strong> Export Talents </strong> </h5> </b-col>
            </b-row>
            <b-row>
                <b-col> {{ talentList.length }} </b-col>
                <b-col> <b-btn v-bind:disabled="talentList.length < 1" variant="primary" @click.stop="showExportModal"> JSON </b-btn> </b-col>
            </b-row>
        </b-container>
        <hr>

        <b-container>            
            <b-row>
                <b-col> 
                    <b-card bg-variant="dark" header-bg-variant="dark" header-border-variant="light">
                        <div slot="header">                                                            
                            <b-container>
                                <b-row class="pt-1">
                                    <b-col>
                                        <b-form-radio-group buttons button-variant="dark" size="sm" v-model="tierSelected" :options="avaiableTiers"/>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                        
                        <b-input-group>                                    
                            <b-form-input v-model="boxName" size="sm" type="text" placeholder="Name of Talent"/>                               
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="danger" size="sm" @click.stop="clearTalent"> Clear </b-btn>
                            </b-input-group-addon>
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="success" size="sm" @click.stop="addTalent"> Save </b-btn>
                            </b-input-group-addon>                        
                        </b-input-group> </br>
                    
                        <div class="text-light"> 
                            Ranked: <b-form-radio-group size="sm" buttons button-variant="dark" v-model="selectedRanked" :options="rankedOptions"/> </br>
                            Activation: </br>
                            <b-select v-model="selectedActivation" :options="activationOptions"/>                        
                        </div> </br>
                        
                        <p>                         
                            <b-form-textarea :max-rows="8" :rows="8" v-model="description" placeholder="Enter description of the talent"/>
                        </p>                        
                    </b-card>
                </b-col>

                <b-col>
                    <b-table small striped responsive="sm" :items="this.talentList" :fields="this.talentFields" head-variant="dark">
                        <template slot="details" slot-scope="row"> {{row.item.tierDisplay}} {{row.item.name}} </template>
                        <template slot="actions" slot-scope="row">
                            <b-btn size="sm" variant="danger" v-on:click.stop="removeTalent(row.item)"> - </b-btn>
                        </template>                           
                    </b-table>
                </b-col>

            </b-row>
        </b-container>

        <b-modal centered v-model="exportModel" size="lg" title="Export as a JSON" header-class="bg-dark text-light">
            <b-container>
                <b-row>
                        <p> 
                            Please copy and paste the following to a notepad editor, then save it.</br> 
                            <b-link href="http://lmgtfy.com/?q=notepad%2B%2B" target="_new"> Might I suggest Notepad++? </b-link> 
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
            boxName: '',            
            talentFields: [
                { key: "details", label: "Talent", class:"text-left", sortable: false} ,
                { key: "isRanked", label: "Ranked", class: "text-left", sortable: false },
                { key: "actions", label: " ", class: "text-left" },                      
            ],
            tierSelected: 0,            
            avaiableTiers: [
                { value:1, text:"Tier: 1" },
                { value:2, text:"Tier: 2" },
                { value:3, text:"Tier: 3" },
                { value:4, text:"Tier: 4" },
                { value:5, text:"Tier: 5" },
            ],
            selectedRanked: '',
            rankedOptions: [ 
                { value:"Yes", text: "Yes" }, 
                { value: "No", text: "No" },                
            ],
            selectedActivation: '',
            activationOptions: [
                { value:"Activation: Active (Incidental, Once per Encounter)", text:"Activation: Active (Incidental, Once per Encounter)" },
                { value:"Activation: Active (Incidental, Out of Turn)", text:"Activation: Active (Incidental, Out of Turn)" },
                { value:"Activation: Active (Incidental)", text:"Activation: Active (Incidental)" },
                { value:"Activation: Active (Maneuver)", text:"Activation: Active (Maneuver)" },
                { value:"Activation: Active (Action)", text:"Activation: Active (Action)" },
                { value:"Activation: Passive", text:"Activation: Passive" },
            ],
            description: '',
            talentList: [],
            talent: {
                id: '',
                name: '',
                tierDisplay: '',
                activation: '',
                rankedDisplay: '',
                text: '',
                source: 'Custom',
                sourceName: 'Custom',
                isRanked: '',
                tier: 0,
                originalTier: 0,
                sourcing: 'Custom',
                alteredText: '',
                tags: 'Custom',
                adjustsCharactersheet: 'no'
            },
            exportContent: ''
        }
    },
    methods: {
        idGen: function () {
            this.iterator += 1;
            this.talent.id = "cT" + this.iterator;
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
            this.exportContent = JSON.stringify(this.talentList, null, '\t');
            this.exportModel = true;
        },
        removeTalent: function (talent) {
            var i = this.findWithAttr(this.talentList, "name", talent.name);
            this.talentList.splice(i, 1);
        },
        clearTalent: function () {
            var t =  {
                id: '',
                name: '',
                tierDisplay: '',
                activation: '',
                rankedDisplay: '',
                text: '',
                source: 'Custom',
                sourceName: 'Custom',
                isRanked: '',
                tier: 0,
                originalTier: 0,
                sourcing: 'Custom',
                alteredText: '',
                tags: 'Custom',
                adjustsCharactersheet: 'no'
            }

            this.tierSelected = '';
            this.selectedRanked = '';
            this.selectedActivation = '';
            this.boxName = '';
            this.description = '';

            this.talent = t;

            return true;
        },
        addTalent: function () {

            if (this.boxName === '' || this.description === '' || this.selectedRanked === '' || this.selectedActivation === '') return false;

            var i = -1; 
            for (var t = 0; t < this.talentList.length; t++) {
                if (this.talentList[t].name === this.boxName) i++                
            }
            
            if (i < 0) {
                
                this.idGen();

                var t =  {
                    id: "cT" + this.iterator,
                    name: this.boxName,
                    tierDisplay: "Tier: " + this.tierSelected,
                    activation: this.selectedActivation,
                    rankedDisplay: "Ranked: " + this.selectedRanked,
                    text: this.description,
                    source: 'Custom',
                    sourceName: 'Custom',
                    isRanked: this.selectedRanked,
                    tier: this.tierSelected,
                    originalTier: this.tierSelected,
                    sourcing: 'Custom',
                    alteredText: this.description,
                    tags: 'Custom',
                    adjustsCharactersheet: 'no'
                }
           
                this.talentList.push(t);                
            } else {                                
                this.talentList[i] = this.talent;
            }

            return true;
        }
    }
}
</script>