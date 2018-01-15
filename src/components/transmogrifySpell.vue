<template>
    <div class="text-left p-3 mx-3 bg-light">
        <h1> <strong> New Spell: Transmogrify </strong> </h1> 
        <h4 class="text-muted"> <strong> Only Acrana and Primal </strong> </h4>
        <p>          
            The art of changing the chemical properties of a non-living object to change it to another kind of non-living object. This is largely plays out not in combat. It also has a lot of rules and complexity to it. 
        </p>
        <p>This makes sense for the Arcana school. The Primal school gets access because it alters what the physical representation of the spirit is. The Divine school cares not what mortals do with their toys.                
        <p>
            Without adding more effects, Transmogrify is akin to turning a bucket of water into block of wood, or a fork into a spoon. These things do not exceed or fall away from their encumbrance rating (see page 84 for details) or their intended use in the world.
        </p>
        <p>
            Obviously, there is going to be many gray areas and players may try to push the boundaries of this spell. How exciting for both the GM and Player to take that journey. 
        </p>
        <h3> <strong> Basic Rules </strong> </h3> 
        <p>
            <ul>
                <li> It is Easy (1 Difficulty Dice) check to turn an object into another kind of object.
                <li> An automatic threat included in the result of the roll.
                <li> All objects and items have the Inferior quality when changed from one item to another kind of item. The only time this isn’t applied is when a Non-Material essence is bound to an object. </li>
                <li> A mundane object is a non-itemized gear, meaning that it is a prop or apart of the setting. It does not adjust skill checks.  </li>
                <li> An item in this content is considered a Weapon, Armor or Gear. Something that helps a character with a specific skill check or action. </li>
                <li> Non-Material essences could mean spirits, ghosts, animals, memories (to an extent) or even mortals. </li>
                <li> Spell casters cannot transmogrify enchanted items. However, transmogrified items can be enchanted. </li>
                <li> An object cannot be decreased or increase in an encumbrance rating (unless adding an effect).  </li>
                <li> All utility is lost upon change, i.e. the block of wood that was a bucket of water has no water inside the wood. It is now what it is, and does not have a trace of what it was. </li>
                <li> Cannot transmogrify magical implements. </li>
            </ul>
        </p>

        <hr>
        <h3> Added Spell Effects </h3>
            <b-card-group columns> 
                <div v-for="transmog in this.transmogrifyData" :key="transmog"> 
                    <b-card                    
                        v-bind:title="transmog.effect"
                        v-bind:subTitle="transmog.allowedSchools"
                        bg-variant="dark"
                        text-variant="white"> 
                            <p> 
                                {{ transmog.description }} 
                            </p>
                            <p> 
                                Additional Rules </br>
                                <ul v-for="rules in transmog.additionalRules" :key="rules">
                                    <li> {{ rules }} </li>
                                </ul>
                            </p>
                            <div slot="footer" class="text-muted">{{ transmog.difficultyDiceMod }}  </div>
                    </b-card>
                </div>
            </b-card-group>                
        
        <h3> <strong> Spending Table: General </strong> </h3>
        <b-container>
            <b-row>
                <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.transmogrifySpendData"/></b-col>
            </b-row>
        </b-container>

        <h3> <strong> Spending Table: Item Binding </strong> </h3>
        <b-container>
            <b-row>
                <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.itemBindingSpendData"/></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            transmogrifyData: [],
            transmogrifySpendData: [],
            itemBindingSpendData: [],
            fields: [            
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
        var spellData = require('../data/spelleffects.json'); 

        for(var i = 0; i < spellData.length; i++) {
            var s = spellData[i];
            
            switch(spellData[i].spell) {                               
                case "Transmogrify":                    
                    this.transmogrifyData.push(s);
                    break;                
            }
        }

        var spend = require('../data/spend.json');

        for(var i = 0; i < spend.length; i++) {

            var s = spend[i];

            switch (spend[i].activity) {                                              
                case "Transmogrify: Item Binding":                    
                    this.itemBindingSpendData.push(s);
                    break;       
                case "Transmogrify: General":
                    this.transmogrifySpendData.push(s)
            }
            
        }
        
    }
}
</script>

<style>

</style>
