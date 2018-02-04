<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h3> Career Generator </h3>
        <p>
            This will let you save a batch of careers to import into the PC Generator. Select up to 8 skills to count as careers. 
        </p>
        <p>
            Everything is based on the skill name, so if you altered skill uses it'll be a-okay as long as you kept the names the same. 
        </p>
        <hr>
        <b-container class="text-center">
            <b-row>
                <b-col>  <h5> <strong> Careers: </strong> </h5> </b-col>
                <b-col>  <h5> <strong> Export Careers </strong> </h5> </b-col>
            </b-row>
            <b-row>
                <b-col> {{ careerList.length }} </b-col>
                <b-col> <b-btn v-bind:disabled="selectedSkills.length < 1" variant="primary" @click.stop="showExportModal"> JSON </b-btn> </b-col>
            </b-row>
        </b-container>
        <hr>
        <b-container class="p-4">
            <b-row>
                <b-col> 
                    <b-card bg-variant="dark" text-variant="white">
                        
                        <b-input-group>                        
                            <b-form-input v-model="boxName" size="sm" type="text" placeholder="Name of Career"/>                   
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="danger" size="sm" @click.stop="clearCareer"> Clear </b-btn>
                            </b-input-group-addon>
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="success" size="sm" @click.stop="addCareer"> Save </b-btn>
                            </b-input-group-addon>            
                        </b-input-group> </br>
                        
                        <p>                         
                            <b-form-textarea :max-rows="4" :rows="4" v-model="description" placeholder="Enter description of the career"/>
                        </p>    

                        {{this.selectedSkills.length }} / 8 Skills Selected </br>
                        
                        <b-form-select v-bind:select-size=12 multiple v-model="selectedSkills" :options="skillData"/>

                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <b-card-group columns> 
            <div v-for="(career, index) in careerList" :key="index">
                <b-card
                    v-bind:title="career.name"
                    v-bind:subTitle="career.description"
                    bg-variant="dark" 
                    text-variant="light">                    
                    <p> <strong> Career Skills </strong> </p>
                    <div slot="header" class="text-right"> <b-btn size="sm" variant="danger" @click="removeCareer"> x </b-btn> </div>
                    <div class="ml-3" v-for="(skill, index) in career.careerSkills" :key="index"> {{ skill }}  </div>
                </b-card>
            </div>
        </b-card-group>

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
            exportContent: '',
            skillData: [],
            selectedSkills: [],
            description: '',
            careerList: [],
            id: ''
        }
    },
    methods: {
        idGen: function () {
            this.iterator += 1;
            this.id = "cT" + this.iterator;
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
            this.exportContent = JSON.stringify(this.careerList, null, '\t');
            this.exportModel = true;
            return true;
        },
        removeCareer: function () {
            var i = this.findWithAttr(this.careerList, "name", this.boxName);
            this.careerList.splice(i, 1);
            return true;
        },
        clearCareer: function () {
            this.selectedSkills = [];
            this.boxName = '';    
            return true;
        },
        addCareer: function () {
            if (this.boxName === '' || this.selectedSkills.length < 1 || this.selectedSkills.length > 8) return false;

            var i = this.findWithAttr(this.careerList, "name", this.boxName);
            var c = { id: this.id, name: this.boxName, careerSkills: this.selectedSkills, alternativeRules: "Custom", genre: "Custom", description: this.description, tags: "Custom" };

            if (i < 0) {
                this.idGen();
                c.id = this.id;
                this.careerList.push(c);
            } else {
                this.careerList[i] = c;
            }

            return true;
        }
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