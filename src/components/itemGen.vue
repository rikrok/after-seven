<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h3> Item Generator </h3>
        <p>
            This will let you save a batch of items to import into the PC Generator. Keep in mind the guidelines of character 
            creation spelled out in the Genesys Core Rulebook.
        </p>
        <p>
            Right now, the generator does not do cybernetics, nor does it go deeper into granting characteristic bonuses (or other bonuses). 
        </p>
        <p>
            Clicking the save button will add the item. If it detects another item by its name, it will save over the other item.
        </p>
        <hr>
        <b-container class="text-center">
            <b-row>
                <b-col>  <h5> <strong> Items: </strong> </h5> </b-col>
                <b-col>  <h5> <strong> Export Items </strong> </h5> </b-col>
            </b-row>
            <b-row>
                <b-col> {{ itemList.length }} </b-col>
                <b-col> <b-btn v-bind:disabled="itemList.length < 1" variant="primary" @click="showExportModal"> JSON </b-btn> </b-col>
            </b-row>
        </b-container>
        <hr>

        <b-container class="col-12">
            <b-row>
                <b-col class="col-4">
                    <b-container id="name">
                        <b-row class="pb-3"> 
                            <b-col> <b-form-input v-model="boxName" size="md" type="text" placeholder="Name of Item"/> </b-col>
                            <b-col> <b-btn variant="success" @click="addItem"> Save Item </b-btn> </b-col>
                        </b-row>
                        
                        <b-row class="pt-3">  <b-col> <strong>Description:</strong> </b-col> </b-row>
                        
                        <b-row> <b-col> <b-form-textarea :max-rows="8" :rows="3" v-model="description"/> </b-col> </b-row>
                    </b-container>
                </b-col>

                <b-col class="col-2">
                    <b-container id="item options" >
                        <b-row>
                            <b-col>                               
                                <b-form-radio-group size="sm" buttons button-variant="dark" v-model="selectedCategory" :options="categoryOptions"/>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>                               
                                <b-form-radio-group size="sm" stacked buttons button-variant="light" v-if="selectedCategory != '' " v-model="selectedSubcategory" :options="subCategoryOptions"/>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>

                
                <b-col class="col-6">
                    <b-container id="item core" >
                       <b-row>
                           <b-col>
                               <b-table small responsive="sm" striped :items="this.item.coreStats" :fields="this.fields.core"/>
                           </b-col>
                       </b-row>
                    </b-container>
                </b-col>


            </b-row>

        </b-container>
        <hr>
        <p> </p>
       
    </div>
</template>

<script>
export default {
    data () {
        return {
            boxName: '',
            exportModel: false,
            itemList: [],
            iterator: 0,
            description: '',
            itemAbility: '',
            itemWeaponSkill: [
                { value:"Brawl", text:"Brawl" },
                { value:"Melee", text:"Melee" },
                { value:"Melee (Light)", text:"Melee (Light)" },
                { value:"Melee (Heavy)", text:"Melee (Heavy)" },
                { value:"Gunnery", text:"Gunnery" },
                { value:"Ranged", text:"Ranged" },
                { value:"Ranged (Light)", text:"Ranged (Light)" },
                { value:"Ranged (Heavy)", text:"Ranged (Heavy)" },
            ],
            selectedCategory: '',
            categoryOptions: [
                { value:"Armor", text:"Armor" },
                { value:"Gear", text:"Gear" },
                { value:"Weapon", text:"Weapon" },
            ],
            selectedSubcategory: '',
            selectedRange: '',
            rangeOptions: [],
            allowedRanges: [
                { s: "Brawl Weapons", r: ["Engaged"] },
                { s: "Melee Weapons", r: ["Engaged", "Short"] },
                { s: "Melee (Light) Weapons", r: ["Engaged", "Short"] },
                { s: "Melee (Heavy) Weapons", r: ["Engaged", "Short"] },
                { s: "Gunnery Weapons", r: ["Engaged", "Short"] },
                { s: "Ranged Weapons", r: ["Engaged", "Short", "Medium", "Long", "Extreme"] },
                { s: "Ranged (Light) Weapons", r: ["Engaged", "Short", "Medium", "Long", "Extreme"] },
                { s: "Ranged (Heavy) Weapons", r: ["Engaged", "Short", "Medium", "Long", "Extreme"] },
            ],
            weaponSkills: [
                { sub:"Brawl Weapons", skill: "Brawl",  },
                { sub:"Melee Weapons", skill: "Melee",  },
                { sub:"Melee (Light) Weapons", skill: "Melee (Light)",  },
                { sub:"Melee (Heavy) Weapons", skill: "Melee (Heavy)",  },
                { sub:"Gunnery Weapons", skill: "Gunnery" },
                { sub:"Ranged Weapons", skill: "Ranged" },
                { sub:"Ranged (Light) Weapons", skill: "Ranged (Light)" },
                { sub:"Ranged (Heavy) Weapons", skill: "Ranged (Heavy)"  },
            ],
            subCategoryOptions: [
                { category: "Gear", value:"Adventuring Gear", text:"Adventuring Gear", disabled: false },
                { category: "Gear", value:"Alchemy Products", text:"Alchemy Products", disabled: false },
                { category: "Weapon", value:"Brawl Weapons", text:"Brawl Weapons", disabled: false },
                { category: "Gear", value:"Cybernetics", text:"Cybernetics", disabled: false },
                { category: "Armor", value:"Defensive Armor", text:"Defensive Armor", disabled: false },
                { category: "Weapon", value:"Gunnery Weapons", text:"Gunnery Weapons", disabled: false },
                { category: "Gear", value:"Implementations", text:"Implementations", disabled: false },
                { category: "Weapon", value:"Melee Weapons", text:"Melee Weapons", disabled: false },
                { category: "Weapon", value:"Melee (Light) Weapons", text:"Melee (Light) Weapons", disabled: false },
                { category: "Weapon", value:"Melee (Heavy) Weapons", text:"Melee (Heavy) Weapons", disabled: false },
                { category: "Weapon", value:"Ranged Weapons", text:"Ranged Weapons", disabled: false },
                { category: "Weapon", value:"Ranged (Light) Weapons", text:"Ranged (Light) Weapons", disabled: false },
                { category: "Weapon", value:"Ranged (Heavy) Weapons", text:"Ranged (Heavy) Weapons", disabled: false },
                { category: "Armor", value:"Soak Armor", text:"Soak Armor", disabled: false },
            ],
            rangeOptions: [
                { value:"Engaged", text:"Engaged", disabled: false },
                { value:"Short", text:"Short", disabled: false },
                { value:"Medium", text:"Short", disabled: false },
                { value:"Long", text:"Short", disabled: false },
                { value:"Extreme", text:"Short", disabled: false },
            ],
            priceSheet: {
                damage : [
                    { floor: 0, ceiling: 3, value: 0 },
                    { floor: 4, ceiling: 5, value: 100 },
                    { floor: 6, ceiling: 7, value: 250 },
                    { floor: 8, ceiling: 9, value: 500 },
                    { floor: 10, ceiling: 12, value: 1000 },
                    { floor: 13, ceiling: 99999, value: 3000 },
                ],
                critRating: [
                    { c: 6, v: 0 },
                    { c: 5, v: 0 },
                    { c: 4, v: 50 },
                    { c: 3, v: 150 },
                    { c: 2, v: 300 },
                    { c: 1, v: 600 },
                ],
                range: [
                    { r: "Engaged", v: 0 },
                    { r: "Short", v: 0 },
                    { r: "Medium", v: 100 },
                    { r: "Long", v: 300 },
                    { r: "Extreme", v: 600 },
                ],
                recommendedArmorEncumberance: [
                    {s: 0, e: 1},
                    {s: 1, e: 2},
                    {s: 2, e: 3},
                    {s: 3, e: 4},
                    {s: 4, e: 5},
                ],
                recommendedWeaponEncumberance: [
                    { value:"Brawl Weapons", v: 1, h: 1 },                    
                    { value:"Melee Weapons", v: 1, h: 1 },
                    { value:"Melee Weapons", v: 3, h: 2 },
                    { value:"Melee (Light) Weapons", v: 1, h: 1 },                    
                    { value:"Melee (Heavy) Weapons", v: 3, h: 2 },
                    { value:"Gunnery Weapons", v: 8, h: 2 },
                    { value:"Ranged Weapons", v: 1, h: 1 },
                    { value:"Ranged Weapons", v: 2, h: 2 },
                    { value:"Ranged (Light) Weapons", v: 1, h: 1 },
                    { value:"Ranged (Heavy) Weapons", v: 3, h: 2 },
                ],
                soak: [
                    {s: 0, v: 0},
                    {s: 1, v: 50},
                    {s: 2, v: 500},
                    {s: 3, v: 1000},
                    {s: 4, v: 2500},                    
                ],
                defense: [
                    {d: 0, v: 0},
                    {d: 1, v: 50},
                    {d: 2, v: 500},
                    {d: 3, v: 2000},
                    {d: 4, v: 5000},  
                ],
                armorFootnote: [
                    { s: 0, d: 0, v: 0 },
                    { s: 0, d: 1, v: 250 },
                    { s: 0, d: 2, v: 400 },
                    { s: 0, d: 3, v: 500 },
                    { s: 0, d: 4, v: 1000 },        
                    { s: 1, d: 0, v: 100 },
                    { s: 1, d: 1, v: 250 },                    
                    { s: 1, d: 2, v: 400 },
                    { s: 1, d: 3, v: 500 },
                    { s: 1, d: 4, v: 500 },
                    { s: 2, d: 0, v: 250 },
                    { s: 2, d: 1, v: 400 },
                    { s: 2, d: 2, v: 500 },
                    { s: 2, d: 3, v: 1000 },
                    { s: 2, d: 4, v: 2000 },
                    { s: 3, d: 0, v: 400 },
                    { s: 3, d: 1, v: 500 },
                    { s: 3, d: 2, v: 1000 },
                    { s: 3, d: 3, v: 1500 },
                    { s: 3, d: 4, v: 2000 },                    
                    { s: 4, d: 0, v: 250 },
                    { s: 4, d: 1, v: 500 },
                    { s: 4, d: 2, v: 1000 },
                    { s: 4, d: 3, v: 1500 },
                    { s: 4, d: 4, v: 2000 },
                ],
                encumbrance: [
                    { e: -1, v: 75 },
                    { e: -2, v: 250 },
                    { e: -3, v: 500 },
                ],
                weaponQualities: [
                    { name:"accurate", value: 50 },
                    { name:"auto-fire", value: 0 },
                    { name:"blast", value: 250 },
                    { name:"breach", value: 250 },
                    { name:"burn", value: 200 },
                    { name:"concussive", value: 1000 },
                    { name:"cumbersome", value: -100 },
                    //uses armor qualities...
                    { name:"defensive", value: 50, r: 1 },
                    { name:"deflection", value: 50, r: 1 },                
                    { name:"defensive", value: 500, r: 2 },
                    { name:"deflection", value: 500, r: 2 },                   
                    { name:"defensive", value: 2000, r: 3 },
                    { name:"deflection", value: 2000, r: 3 },
                    { name:"defensive", value: 5000, r: 4 },
                    { name:"deflection", value: 5000, r: 4 },
                    { name:"disorient", value: 50 },
                    { name:"ensnare", value: 200 },
                    { name:"guided", value: 250 },
                    { name:"inaccurate", value: -50 },
                    { name:"inferior", value: -100 },
                    { name:"knockdown", value: 250 },
                    { name:"limited ammo", value: -50 },
                    { name:"linked", value: 200 },
                    { name:"pierce", value: 100 },
                    { name:"prepare", value: -100 },
                    { name:"reinforced", value: 250 },
                    { name:"slow-firing", value: -50 },
                    { name:"stun", value: 50 },
                    { name:"stun damage", value: 100 },
                    { name:"sunder", value: 250 },
                    { name:"superior", value: 250 },
                    { name:"tractor", value: 100 },
                    { name:"unwieldy", value: -100 },
                    { name:"vicious", value: 250 }
                ],
                armorQualities: [                    
                    //uses armor qualities...
                    { name:"defensive", value: 50, r: 1 },
                    { name:"deflection", value: 50, r: 1 },                
                    { name:"defensive", value: 500, r: 2 },
                    { name:"deflection", value: 500, r: 2 },                   
                    { name:"defensive", value: 2000, r: 3 },
                    { name:"deflection", value: 2000, r: 3 },
                    { name:"defensive", value: 5000, r: 4 },
                    { name:"deflection", value: 5000, r: 4 },     
                    { name:"inferior", value: -50 },
                    { name:"prepare", value: -50 },
                    { name:"reinforced", value: 50 },
                    { name:"superior", value: 50 },                    
                ],

            },
            abilityDescription: '',
            item: {
                coreStats: [
                    { name: "Encumbrance", value: 0, canBeModified: true },
                    { name: "Rarity", value: 0, canBeModified: true },
                    { name: "Value", value: 0, canBeModified: true },
                    { name: "Hard Points", value: 0, canBeModified: true },
                    { name: "Hands Needed", value: 0, canBeModified: true },   
                    { name: "Recommended Encumbrance", value: 0, canBeModified: false },
                    { name: "Fantasy Flight Recommended Retail Value", value: 0, canBeModified: false },                   
                ],
                armorStats: [
                    { name: "Soak", value: 0 },
                    { name: "Defense", value: 0 },
                    { name: "Worn Encumbrance", value: 0 },
                ],
                weaponStats: [
                    { name: "Damage", value: 0 },
                    { name: "Critical Rating", value: 0 },
                    { name: "Range Rank", value: 0 }
                ],
                abilities : [],
                recommendedEncumbrance: 0,
                recommendedValue: 0,                                 
                genre: 'Custom',                
                qualities: [
                    { name:"accurate", value: 0 },
                    { name:"auto-fire", value: 0 },
                    { name:"blast", value: 0 },
                    { name:"breach", value: 0 },
                    { name:"burn", value: 0 },
                    { name:"concussive", value: 0 },
                    { name:"cumbersome", value: 0 },
                    { name:"defensive", value: 0 },
                    { name:"deflection", value: 0 },
                    { name:"disorient", value: 0 },
                    { name:"ensnare", value: 0 },
                    { name:"guided", value: 0 },
                    { name:"inaccurate", value: 0 },
                    { name:"inferior", value: 0 },
                    { name:"knockdown", value: 0 },
                    { name:"limited ammo", value: 0 },
                    { name:"linked", value: 0 },
                    { name:"pierce", value: 0 },
                    { name:"prepare", value: 0 },
                    { name:"reinforced", value: 0 },
                    { name:"slow-firing", value: 0 },
                    { name:"stun", value: 0 },
                    { name:"stun damage", value: 0 },
                    { name:"sunder", value: 0 },
                    { name:"superior", value: 0 },
                    { name:"tractor", value: 0 },
                    { name:"unwieldy", value: 0 },
                    { name:"vicious", value: 0 }
                ],
            },            
            exportContent: '',
            fields: {
                core: [
                    { key: "name", label: "Name", class:"text-left"},
                    { key: "value", label: "Value", class:"text-left"},
                    { key: "actions", label: "", class:"text-left"},
                ]
            }
        }
    },
    watch: {
        selectedCategory: function () {                       

            for (var c = 0; c < this.subCategoryOptions.length; c++) {
                this.subCategoryOptions[c].disabled = this.subCategoryOptions[c].category === this.selectedCategory ? false : true;
            }

            return true;
        },
        selectedSubcategory: function () {

            console.log(this.selectedCategory );

            if (this.selectedCategory === 'Weapon') {
            
                for (var w = 0; w < this.weaponSkills.length; w++) {
                    
                    if (this.weaponSkills[w].sub === this.selectedSubcategory) {

                        this.skillSelected = this.weaponSkills[w].skill;

                        console.log(this.skillSelected);
                        
                        if (["Melee (Light) Weapons", "Ranged (Light) Weapons", "Brawl Weapons"].indexOf(this.selectedSubcategory) >= 0) {
                            this.item.coreStats[4].value = 1;
                        } else {
                            this.item.coreStats[4].value = 2;
                        }

                    }
                }

                for (var r = 0; r < this.priceSheet.recommendedWeaponEncumberance.length; r++) {
                    if (this.priceSheet.recommendedWeaponEncumberance[r].h === this.item.coreStats[4].value && this.priceSheet.recommendedWeaponEncumberance[r].value === this.selectedSubcategory) {
                        this.item.coreStats[5].value = this.priceSheet.recommendedWeaponEncumberance[r].v;
                    }
                }

            }

            return;
        }
    },
    methods: {
        idGen: function () {
            this.iterator += 1;
            this.race.id = "cW" + this.iterator;
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
        adjustItemStat: function () {
            //can't go past 9999 damage
            //can't go past 6 critical rating, can't go past 0
            //delete item.bad; 
            //page 199
            //don't allow defensive + defl
        },
        showExportModal: function () {            
            this.exportContent = JSON.stringify(this.raceList, null, '\t');
            this.exportModel = true;
        },
        addAbility: function () {
        },
        removeAbility: function (ability) {
        },
        addItem: function (){
        },
    },
    created () {
    }
}
</script>