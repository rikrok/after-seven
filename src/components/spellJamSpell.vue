<template>
    <div class="text-left p-3 mx-3 bg-light">
        <h1> <strong> New Spell: Spell Jam </strong> </h1> 
        <h4 class="text-muted"> <strong> Only Divine </strong> </h4>
        <p>          
            The slumbering avatars are aware of the powerful mortals gathering tools that may destroy them. They have gifted their worshipers and servants with the ability to destroy their lesser magic.
        </p>
        <p>
            Divine spell casters may make Sunder attempts to magical implements, connections to the magical world, enchanted items and transmogrified items.
        
        <h3> <strong> Basic Rules </strong> </h3> 
        <p>
            <ul>
                <li> It is a Divine Hard (3 Difficulty Die) spell check. </li>
                <li> It has a range of Short. </li>
                <li> If it is an implement or item, and has an inferior item quality it is destroyed after a successful cast. </li>
                <li> If the item or implement doesn’t have an inferior rating, the item is damaged by one step of repair category (like the Sunder item quality) </li>
                <li> This only works on magical items. </li>                
            </ul>
        </p>

        <hr>
        <h3> Added Spell Effects </h3>
            <b-card-group columns> 
                <div v-for="spellJam in this.spellJamData" :key="spellJam"> 
                    <b-card                    
                        v-bind:title="spellJam.effect"
                        v-bind:subTitle="spellJam.allowedSchools"
                        bg-variant="dark"
                        text-variant="white"> 
                            <p> 
                                {{ spellJam.description }} 
                            </p>
                            <div slot="footer" class="text-muted">{{ spellJam.difficultyDiceMod }}  </div>
                    </b-card>
                </div>
            </b-card-group>                
        
        <h3> <strong> Spending Table </strong> </h3>
        <b-container>
            <b-row>
                <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.spellJamSpend"/></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            spellJamData: [],
            spellJamSpend: [],
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
                case "Spell Jam":                    
                    this.spellJamData.push(s);
                    break;                
            }
        }

        var spend = require('../data/spend.json');

        for(var i = 0; i < spend.length; i++) {

            var s = spend[i];

            switch (spend[i].activity) {                                              
                case "Spell Jam":                    
                    this.spellJamSpend.push(s);
                    break;       
            }
            
        }
        
    }
}
</script>