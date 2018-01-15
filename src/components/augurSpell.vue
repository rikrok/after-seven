<template>
    <div class="text-left p-3 mx-3 bg-light">
        <h1> <strong> New Spell: Augur </strong> </h1>
        <p>            
            You are able to locate any sentient creature on the continent or as to understand what happened at a location. This 
            starts with a difficulty of <strong> Average (2 Difficulty Dice) </strong>. This spell would normally be used not in combat encounters, as it would 
            take quite some time to set up and for a spell caster to cast. 
        </p>
        <p>
            Note that when a spell caster Augurs, each type of school of magic handles this differently. For example, Arcana 
            spell casters would use devices to help them augur. Crystal balls, pools of water or Arcanite salt spreads would be common 
            placed. Whereas a Divine spell caster might have prayers, and chants he’d do. A Primal spell caster might try to chase down 
            his target’s spirits, or ask around the spirit world the location of the target.                
        <p> </p>
        <h5> <strong> Use Option 1: Creature Target </strong> </h5>
        <p> 
            The spell caster must know some detail about the creature they seek. Successful casting means that the target is known to 
            either be alive or dead and the general where-about of the target. It is not exact, but more of a guidance.   
        </p>
        <h5> <strong> Use Option 2: Scene Context </strong> </h5> 
        
        <p> 
            The spell caster must be at the scene to Augur it properly. 
            A rough and broad understanding of what happened within the day at the location. 
        </p> 

        <hr>
        <h3> Added Spell Effects </h3>
            <b-card-group columns> 
                <div v-for="augur in this.augurData" :key="augur"> 
                    <b-card                    
                        v-bind:title="augur.effect"
                        v-bind:subTitle="augur.allowedSchools"
                        bg-variant="dark"
                        text-variant="white"> 
                            <p> 
                                {{ augur.description }} 
                            </p>
                            <p> 
                                <ul v-for="rules in augur.additionalRules" :key="rules">
                                    <li> {{ rules }} </li>
                                </ul>
                            </p>
                            <div slot="footer" class="text-muted">{{ augur.difficultyDiceMod }}  </div>
                    </b-card>
                </div>
            </b-card-group>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            augurData: [],
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
                case "Augur":                    
                    this.augurData.push(s);
                    break;                
            }
        }
    }
}
</script>

<style>

</style>
