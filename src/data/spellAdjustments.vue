<template>
    <div class="text-left p-3 mx-3 bg-light">
        <b-container>
            <b-row>
                <b-col> <h1> <strong> Spell Adjustments </strong> </h1> </b-col>
            </b-row>

            <b-row>
                <b-col> <p>            
                    Arcana, Primal and Divine magic are all different and have their uses. Arcana magic is about doing wondrously impossible with the tangible. 
                    Primal magic is about souls, spirits and the elements that be. Divine being a little bit Primal and Arcana. 
                </p> </b-col>
            </b-row>

            <b-row>
                <b-col> <p>            
                    That being said, some effects are limited to a school of magic. Since Knowledge was split into four different types of schools, certain rulebook effects 
                    were impacted. The following content both explains and illustrates permissible effects to spells.  
                </p> </b-col>
            </b-row>
        </b-container>

        <hr>
        <b-container id="attackSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Attack Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.attackData" :fields="fields" /></b-col> </b-row>              
        </b-container>
        
        <b-container id="augurSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Augment Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.augmentData" :fields="fields" /></b-col> </b-row>              
        </b-container>    
        
        <b-container id="barrierSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Barrier Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.barrierData" :fields="fields" /></b-col> </b-row>              
        </b-container>
        
        <b-container id="conjureSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Conjure Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.conjureData" :fields="fields" /></b-col> </b-row>              
        </b-container>

        <b-container id="curseSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Curse Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.curseData" :fields="fields" /></b-col> </b-row>              
        </b-container>
        
        <b-container id="dispelSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Dispel Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.dispelData" :fields="fields" /></b-col> </b-row>              
        </b-container>   

        <b-container id="healSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Heal Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.healData" :fields="fields" /></b-col> </b-row>              
        </b-container>
        
        <b-container id="augurSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Augur Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.augurData" :fields="fields" /></b-col> </b-row>              
        </b-container>

        <b-container id="enchantingSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Enchanting Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.enchantingData" :fields="fields" /></b-col> </b-row>              
        </b-container>
        
        <b-container id="transmogrifySpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Transmogrify Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.transmogrifyData" :fields="fields" /></b-col> </b-row>              
        </b-container>

        <b-container id="spellJamSpell" class="text-left">
            <b-row> <b-col> <h2> <strong> Spell Jam Spell </strong> </h2> </b-col> </b-row>              
            <b-row> <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.spellJamData" :fields="fields" /></b-col> </b-row>              
        </b-container>            
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            filter: "",
            attackData: [],
            augmentData: [],
            barrierData: [],
            conjureData: [],
            curseData: [],
            dispelData: [],
            healData: [],
            augurData: [],
            enchantingData: [],
            transmogrifyData: [],
            spellJamData: [],
            fields: [
                //{ key: "spell", label: "Spell Used", class: "text-left"},
                { key: "effect", label: "Effect Name", class: "text-left"},
                { key: "allowedSchools", label: "Allowed Schools", class: "text-left"},
                { key: "knowledgeUsed", label: "Knowledge Used", class: "text-left"},
                { key: "difficultyDiceMod", label: "Dice Modifier", class: "text-left"},
            ]
        }
    },
    method: {

    },
    created () {
        this.spellData = require('../data/spelleffects.json'); 

        for(var i = 0; i < this.spellData.length; i++) {
            var s = this.spellData[i];
            
            switch(this.spellData[i].spell) {               
                case "Attack":                    
                    this.attackData.push(s);
                    break;
                case "Augment":                    
                    this.augmentData.push(s);
                    break;
                case "Barrier":                    
                    this.barrierData.push(s);
                    break;
                case "Conjure":                    
                    this.conjureData.push(s);
                    break;
                case "Curse":                    
                    this.curseData.push(s);
                    break;
                case "Dispel":                    
                    this.dispelData.push(s);
                    break;
                case "Enchanting":                    
                    this.enchantingData.push(s);
                    break;
                case "Heal Spell":                    
                    this.healData.push(s);
                    break;
                case "Augur":                    
                    this.augurData.push(s);
                    break;
                case "Enchant":                    
                    this.enchantingData.push(s);
                    break;        
                case "Transmogrify":                    
                    this.transmogrifyData.push(s);
                    break;
                case "Spell Jam":                    
                    this.spellJamData.push(s);
                    break;
            }
        }
    }
}
</script>

<style>

</style>
