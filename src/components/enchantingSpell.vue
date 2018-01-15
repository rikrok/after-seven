<template>
    <div class="text-left p-3 mx-3 bg-light">
        <h1> <strong> New Spell: Enchanting </strong> </h1>
            <p>
                This is a slight deviance from the Augment spell in the core rulebook. This deals with permanent 
                enchantments. Like Alchemy, it is a dangerous and difficult practice to enchant items. It is 
                a high risk and high return type of out-of-combat action. 
            </p>
            <p>
                Simply said, enchanting an item gives it a magical item quality or item attachment (keeping in mind 
                the limits with Hard Points) with the following rules: 
            </p>
            <ul>
                <li> Item’s rarity is increased by 2, value should also be modified accordingly. </li>
                <li> Reduces encumbrance by 1 (minimum of 0)  </li>
                <li> It is an Easy (1 Diamond) check </li>
                <li> With an automatic threat added to the outcome. </li>
                <li> Two setback dice are included in the dice pool. </li>
                <li> This is also limited to once per session.  </li>
                <li> Melee / Brawl weapons cannot change their range bands </li>
                <li> Weapons can not have Armor qualities. </li>
                <li> Armor can not have wapon qualities. </li>
                <li> Gear can not have Weapons and/or Armor qualities. </li>
                <li> Enchantment’s bonuses must make sense. </li>
                <li> Transmogrified items cannot be enchanted. </li>
            </ul>
    
            <h2> <strong> School Limits and Bonuses </strong> </h2>
            <p> 
                Each school of magic treats Enchantment differently and can impact items 
                differently. Each school of magic will remove one setback die to the dice pool to a specific enchantment type (see table below).
            </p>             
            <p>
                Acrana spell casters use crystals and similar components that when magically exposed to an item, 
                the item recieves bonuses. Divine spell casters see the item as holy, and “bless it” - be it 
                decorating with scrolls of prayers, feathers, beads or runes. Primal spell casters intertwine, 
                charm, coerce, or bond sprits to an item through rituals or manipulation.
                
             </p>     
            <h3> <strong> Permissible Enchanting Table </strong> </h3>
            <b-container>
                <b-row>
                    <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.enchantingData" :fields="effectFields" /></b-col>
                </b-row>
            </b-container>
            <hr>     
            <h3> <strong> Spending Table </strong> </h3>
            <b-container>
                <b-row>
                    <b-col> <b-table dark small striped head-variant="light" class="table-bordered" :items="this.enchantingSpendData" :fields="fields" /></b-col>
                </b-row>
            </b-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            enchantingData: [],
            enchantingSpendData: [],
            effectFields: [
                { key: "effect", label: "Effect Name", class: "text-left"},
                { key: "allowedSchools", label: "Allowed Schools", class: "text-left"},
                { key: "difficultyDiceMod", label: "Dice Modifier", class: "text-left"},
            ],
            spendFields: [
                { key: "dieResult", label: "Die Result", class: "text-left"},
                { key: "outcomePossibility", label: "Outcome Possibility", class: "text-left"},
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
                case "Enchanting":                    
                    this.enchantingData.push(s);
                    break;                
            }
        }

        var spendData = require('../data/spend.json'); 

        for(var i = 0; i < spendData.length; i++) {
            var s = spendData[i];
            
            switch(spendData[i].activity) {                               
                case "Enchanting":                    
                    this.enchantingSpendData.push(s);
                    break;                
            }
        }
    }
}
</script>

<style>

</style>
