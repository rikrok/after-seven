<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h3> Item Generator </h3>
        <p>
            This will let you save a batch of items to import into the PC Generator. Keep in mind the guidelines of character 
            creation spelled out in the Genesys Core Rulebook.
        </p>
        <p>
            Right now, the generator does not do cybernetics, nor does it go deeper into granting characteristic bonuses (or other bonuses). <strong> Be sure </strong> to
            check out the recommend price...and alter from there. The rulebook has deeper explainations and reasoning behind the pricing, where as this generator has interpreted those
            guidelines. This is no means the "sticker" price of the item, but it will get you in the ballpark.
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
        <b-container class="pb-4">
            <b-row>
                <b-col>
                    <b-card bg-variant="dark" header-bg-variant="dark" text-variant="white" header-border-variant="light" footer-bg-variant="dark" footer-border-variant="light">                        
                        <p>
                            <small> Item Category and Subcategory </small>
                            <b-container>
                                <b-row>
                                    <b-col>
                                        <b-form-radio-group buttons button-variant="dark" v-model="selectedCategory" :options="categoryOptions"/>
                                    </b-col>
                                    <b-col>
                                        <b-form-select v-model="selectedSubcategory" :options="subCategoryOptions"/>     
                                    </b-col>
                                </b-row>
                            </b-container>
                        </p>

                        <b-input-group>                                    
                            <b-form-input v-model="boxName" type="text" placeholder="Name of Item"/>                                    
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="danger" size="sm" @click="clearItem(true)"> Clear </b-btn>
                            </b-input-group-addon>
                            <b-input-group-addon>
                                <b-btn class="p-1" variant="success" size="sm" @click="addItem"> Save </b-btn>
                            </b-input-group-addon>                        
                        </b-input-group> </br>

                        <b-form-textarea :max-rows="8" :rows="3" v-model="description" placeholder="type a bit about the item."/>  

                        <div v-if="this.selectedCategory === 'Weapon'"> 
                            <p> 
                                <strong> Skill Used: </strong> {{ this.skillSelected }}  
                            </p>
                            <b-form-group label="Weapon Range">
                                <b-form-radio-group v-model="selectedRange" :options="this.rangeOptions"/> </br>
                            </b-form-group>
                        </div>

                        <div slot="footer">                            
                            <b-input-group>
                                <b-input-group-addon> Value of Item </b-input-group-addon>
                                <b-form-input v-model="boxValue" size="sm" type="number"/>
                                <b-input-group-addon>
                                    <b-btn size="sm" variant="success" @click="adjustPricing"> Recalculate </b-btn> 
                                </b-input-group-addon>
                            </b-input-group>     
                        </div>

                    </b-card>                                                                                                                     
                </b-col>    
                <b-col>                    
                    <b-table small responsive="sm" striped :items="this.item.coreStats" :fields="this.fields.core" head-variant="dark"> 
                        <template slot="actions" slot-scope="row">
                            <b-btn v-show="row.item.canBeModified === true" size="sm" variant="danger" @click="adjustItem(row.item, -1, 'core')"> - </b-btn>
                            <b-btn v-show="row.item.canBeModified === true" size="sm" variant="success" @click="adjustItem(row.item, 1, 'core')"> + </b-btn>
                        </template>
                    </b-table>

                    <div v-if="this.selectedCategory === 'Weapon'"> 
                        <b-table small responsive="sm" striped :items="this.item.weaponStats" :fields="this.fields.core" head-variant="dark">                                    
                            <template slot="actions" slot-scope="row">
                                <b-btn v-show="row.item.canBeModified === true" size="sm" variant="danger" @click="adjustItem(row.item, -1, 'weapon')"> - </b-btn>
                                <b-btn v-show="row.item.canBeModified === true" size="sm" variant="success" @click="adjustItem(row.item, 1, 'weapon')"> + </b-btn>                                    
                            </template>
                        </b-table>                       
                    </div>

                    <div v-if="this.selectedCategory === 'Armor'">
                        <b-table small responsive="sm" striped :items="this.item.armorStats" :fields="this.fields.core" head-variant="dark"> 
                            <template slot="actions" slot-scope="row">
                                <b-btn v-show="row.item.canBeModified === true" size="sm" variant="danger" @click="adjustItem(row.item, -1, 'armor')"> - </b-btn>
                                <b-btn v-show="row.item.canBeModified === true" size="sm" variant="success" @click="adjustItem(row.item, 1, 'armor')"> + </b-btn>
                            </template>
                        </b-table>
                    </div>
                </b-col>  
            </b-row>
            
        </b-container>
        <p> </p>
        <hr>
        <b-container>
            <b-row>
                <b-col v-if="this.selectedCategory != 'Gear'"> 
                    <b-table small responsive="sm" striped :items="this.item.qualities" :fields="this.fields.core" head-variant="dark"> 
                        <template slot="actions" slot-scope="row">
                            <b-btn size="sm" variant="danger" @click="adjustQuality(row.item, -1)"> - </b-btn>
                            <b-btn size="sm" variant="success" @click="adjustQuality(row.item, 1)"> + </b-btn>
                        </template>
                    </b-table> 
                </b-col>

                <b-col>
                    <b-container>
                        <b-row> 
                            <b-col> 
                                <b-form-group> 
                                    <b-input-group>
                                        <b-form-input type="text" v-model="abilityName" placeholder="Ability Name"/>
                                        <b-input-group-addon>  
                                            <b-btn size="sm" variant="success" @click="addAbility"> Add Ability </b-btn>                                                                                  
                                        </b-input-group-addon>                                        
                                    </b-input-group>
                                    <b-form-textarea :max-rows="8" :rows="3" v-model="abilityDescription" placeholder="Add text about the custom ability"/>
                                </b-form-group>

                                <strong> <h4> Abilities: </h4> </strong>
                               <b-table small responsive="sm" striped :items="this.item.abilities" :fields="this.fields.ability" head-variant="dark"> 
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" variant="danger" @click="removeAbility(row.item)"> - </b-btn>
                                    </template>
                                </b-table> 
                            </b-col>
                        </b-row>                                                                
                    </b-container>
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

        <b-table :items="this.itemList"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            boxName: '',
            boxValue: 0,
            exportModel: false,
            itemList: [],
            iterator: 0,
            description: '',            
            abilityName: '',
            abilityDescription: '',
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
            skillSelected: '',
            allowedRanges: [
                { s: "Brawl Weapons", r: ["Engaged"], mx: 0 },
                { s: "Melee Weapons", r: ["Engaged", "Short"], mx: 1 },
                { s: "Melee (Light) Weapons", r: ["Engaged", "Short"], mx: 1 },
                { s: "Melee (Heavy) Weapons", r: ["Engaged", "Short"], mx: 1 },
                { s: "Gunnery Weapons", r: ["Engaged", "Short", "Medium", "Long", "Extreme"], mx: 4 },
                { s: "Ranged Weapons", r: ["Engaged", "Short", "Medium", "Long", "Extreme"], mx: 4 },
                { s: "Ranged (Light) Weapons", r: ["Engaged", "Short", "Medium", "Long", "Extreme"], mx: 4 },
                { s: "Ranged (Heavy) Weapons", r: ["Engaged", "Short", "Medium", "Long", "Extreme"], mx: 4 },
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
                { category: "Gear", value:"Adventuring Gear", text:"Adventuring Gear", disabled: true },
                { category: "Gear", value:"Alchemy Products", text:"Alchemy Products", disabled: true },
                { category: "Weapon", value:"Brawl Weapons", text:"Brawl Weapons", disabled: true },
                { category: "Gear", value:"Cybernetics", text:"Cybernetics", disabled: true },
                { category: "Armor", value:"Defensive Armor", text:"Defensive Armor", disabled: true },
                { category: "Weapon", value:"Gunnery Weapons", text:"Gunnery Weapons", disabled: true },
                { category: "Gear", value:"Implementations", text:"Implementations", disabled: true },
                { category: "Weapon", value:"Melee Weapons", text:"Melee Weapons", disabled: true },
                { category: "Weapon", value:"Melee (Light) Weapons", text:"Melee (Light) Weapons", disabled: true },
                { category: "Weapon", value:"Melee (Heavy) Weapons", text:"Melee (Heavy) Weapons", disabled: true },
                { category: "Weapon", value:"Ranged Weapons", text:"Ranged Weapons", disabled: true },
                { category: "Weapon", value:"Ranged (Light) Weapons", text:"Ranged (Light) Weapons", disabled: true },
                { category: "Weapon", value:"Ranged (Heavy) Weapons", text:"Ranged (Heavy) Weapons", disabled: true },
                { category: "Armor", value:"Soak Armor", text:"Soak Armor", disabled: true },
            ],
            rangeValue: '',
            rangeOptions: [
                { value:"Engaged", text:"Engaged", disabled: false },
                { value:"Short", text:"Short", disabled: false },
                { value:"Medium", text:"Medium", disabled: false },
                { value:"Long", text:"Long", disabled: false },
                { value:"Extreme", text:"Extreme", disabled: false },
            ],
            priceSheet: {
                encumAdjusts: 0,
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
                    { value:"Ranged Weapons", v: 3, h: 2 },
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
            emptyItem: [],
            item: {
                id: '',
                name: '',
                value: 0,
                category: '',
                subCategory: '',  
                text: '',       
                skill: '',
                range :'',   
                coreStats: [
                    { name: "Encumbrance", value: 0, canBeModified: true },
                    { name: "Rarity", value: 0, canBeModified: true },
                    { name: "Hard Points", value: 0, canBeModified: false }, 
                    { name: "Recommended Encumbrance", value: 0, canBeModified: false },
                    { name: "Fantasy Flight Recommended Retail Value", value: 0, canBeModified: false },   
                ],
                armorStats: [
                    { name: "Soak", value: 0, canBeModified: true  },
                    { name: "Defense", value: 0, canBeModified: true  },
                    { name: "Worn Encumbrance", value: 0, canBeModified: false  },
                ],
                weaponStats: [
                    { name: "Damage", value: 0, canBeModified: true },
                    { name: "Critical Rating", value: 6, canBeModified: true },
                    { name: "Hands Needed", value: 0, canBeModified: true },  
                ],
                abilities : [],
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
                abilities: []
            },
            exportContent: '',
            fields: {
                core: [
                    { key: "name", label: "Name", class:"text-left"},
                    { key: "value", label: "Value", class:"text-left"},
                    { key: "actions", label: " ", class:"text-left"},
                ],
                stat: [
                    { key: "name", label: "Name", class:"text-left"},
                    { key: "value", label: "Value", class:"text-left"},
                    { key: "actions", label: " ", class:"text-left"},
                ],
                ability: [
                    { key: "source", label: "Name", class:"text-left"},
                    { key: "ability", label: "Text", class:"text-left"},
                    { key: "actions", label: " ", class:"text-left"},
                ]
            }
        }
    },
    watch: {
        selectedCategory: function () {   

            for (var c = 0; c < this.subCategoryOptions.length; c++) {
                this.subCategoryOptions[c].disabled = this.subCategoryOptions[c].category === this.selectedCategory ? false : true;
            }

            this.clearItem(false);
            this.item.qualities = [];
            var qualityName = [];

            if (this.selectedCategory === 'Armor') { 

                for(var q = 0; q < this.priceSheet.armorQualities.length; q++) {
                    var w = this.priceSheet.armorQualities[q];
                    if (qualityName.indexOf(w.name) < 0) {
                        var n = { name: w.name, value: 0 };
                        this.item.qualities.push(n);
                        qualityName.push(w.name);
                    }
                }
            }

            if (this.selectedCategory === 'Weapon') {
                for(var q = 0; q < this.priceSheet.weaponQualities.length; q++){
                    var w = this.priceSheet.weaponQualities[q];
                    if (qualityName.indexOf(w.name) < 0) {
                        var n = { name: w.name, value: 0 };
                        this.item.qualities.push(n);
                        qualityName.push(w.name);
                    }
                }
            }

            return true;
        },
        selectedSubcategory: function () {

            if (this.selectedCategory === '') return false;

            if (this.selectedCategory === 'Weapon') {
            
                for (var w = 0; w < this.weaponSkills.length; w++) {
                    
                    if (this.weaponSkills[w].sub === this.selectedSubcategory) {

                        this.skillSelected = this.weaponSkills[w].skill;
                        
                        if (["Melee (Light) Weapons", "Ranged (Light) Weapons", "Brawl Weapons"].indexOf(this.selectedSubcategory) >= 0) {
                            this.item.weaponStats[2].value = 1;
                        } else {
                            this.item.weaponStats[2].value = 2;
                        }

                    }
                }

                for (var r = 0; r < this.priceSheet.recommendedWeaponEncumberance.length; r++) {
                    if (this.priceSheet.recommendedWeaponEncumberance[r].h === this.item.weaponStats[2].value && this.priceSheet.recommendedWeaponEncumberance[r].value === this.selectedSubcategory) {
                        this.item.coreStats[3].value = this.priceSheet.recommendedWeaponEncumberance[r].v;
                        this.item.coreStats[0].value = this.priceSheet.recommendedWeaponEncumberance[r].v;
                    }
                }

                for (var i = 0; i < this.allowedRanges.length; i++) {
                    
                    var ary = [];

                    if (this.allowedRanges[i].s === this.selectedSubcategory) {
                        
                        ary = this.allowedRanges[i].r;
                    
                        if (["Melee (Light) Weapons", "Melee Weapons", "Brawl Weapons", "Melee (Heavy) Weapons"].indexOf(this.allowedRanges[i].s) >= 0) {
                            //set starting range.
                            this.selectedRange = this.rangeOptions[0].value;
                        } else {
                            this.selectedRange = this.rangeOptions[1].value;
                        }

                        for (var p = 0; p < this.rangeOptions.length; p++) {    
                            this.rangeOptions[p].disabled = ary.indexOf(this.rangeOptions[p].text) >= 0 ? false : true;
                        }
                    }
                }

                this.item.qualities = [];
                var qualityName = [];

                for(var q = 0; q < this.priceSheet.weaponQualities.length; q++){
                    var w = this.priceSheet.weaponQualities[q];
                    if (qualityName.indexOf(w.name) < 0) {
                        var n = { name: w.name, value: 0 };
                        this.item.qualities.push(n);
                        qualityName.push(w.name);
                    }
                }
            }

            if (this.selectedCategory === 'Armor') {
                
                if (this.selectedSubcategory === 'Soak Armor') {
                    this.item.armorStats[0].value = 2;
                    this.item.coreStats[3].value = 2;
                    this.item.coreStats[0].value = 2;
                }
                else {
                    this.item.armorStats[1].value = 1;
                    this.item.coreStats[3].value = 1;
                    this.item.coreStats[0].value = 1;
                }
                
                this.item.qualities = [];
                var qualityName = [];

                for(var q = 0; q < this.priceSheet.armorQualities.length; q++){
                    var w = this.priceSheet.armorQualities[q];                    
                    if (qualityName.indexOf(w.name) < 0) {
                        var n = { name: w.name, value: 0 };
                        this.item.qualities.push(n);
                        qualityName.push(w.name);
                    }
                }
            }

            this.adjustDerivedStats();
            return true;
        }
    },
    methods: {
        idGen: function () {
            if (this.item.id === '') {
                this.iterator += 1;
                this.item.id = "cI" + this.iterator;
                return true;
            }
            return false;
        },
        findWithAttr: function (array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;      
        },
        increaseEncumbrance: function () {
            return true;
        },
        adjustPricing: function () {

            var val = 0;

            if (this.selectedCategory === 'Weapon') {
                
                for (var d = 0; d < this.priceSheet.damage.length; d++) {                    
                    if (this.item.weaponStats[0].value >= this.priceSheet.damage[d].floor && this.item.weaponStats[0].value <= this.priceSheet.damage[d].ceiling) val += this.priceSheet.damage[d].value;
                }
                for (var c = 0; c < this.priceSheet.critRating.length; c++) {
                    if (this.priceSheet.critRating[c].c === this.item.weaponStats[1].value) val += this.priceSheet.critRating[c].v;
                }
                
                for (var r = 0; r < this.priceSheet.range.length; r++) {
                    if (this.priceSheet.range[r].r === this.selectedRange) val += this.priceSheet.range[r].v;
                }
                for (var q = 0; q < this.priceSheet.weaponQualities.length; q++) {
                    
                    for (var i = 0; i < this.item.qualities.length; i++) {   
                        if ( this.item.qualities[i].name === this.priceSheet.weaponQualities[q].name) {
                            if (["defensive", "deflection"].indexOf(this.priceSheet.weaponQualities[q].name) >= 0) {
                                val += this.priceSheet.weaponQualities[q].r === this.item.qualities[i].value ? this.priceSheet.weaponQualities[q].value : 0;
                            } else if (["cumbersome", "unwieldy"].indexOf(this.priceSheet.weaponQualities[q].name) >= 0) { 
                                if (this.priceSheet.weaponQualities[q].value > 1) val += this.priceSheet.weaponQualities[q].value * this.item.qualities[i].value;
                            } else {
                                val += (this.priceSheet.weaponQualities[q].value * this.item.qualities[i].value);
                            }
                        }
                    }                    
                }
            }

            if (this.selectedCategory === 'Armor') {
                
                for (var s = 0; s < this.priceSheet.soak.length; s++) {
                    if (this.priceSheet.soak[s].s === this.item.armorStats[0].value) val += this.priceSheet.soak[s].v;
                }

                for (var d = 0; d < this.priceSheet.defense.length; d++) {
                    if (this.priceSheet.defense[d].d === this.item.armorStats[1].value) val += this.priceSheet.defense[d].v;
                }

                for (var r = 0; r < this.priceSheet.armorFootnote.length; r++) {
                    var f = this.priceSheet.armorFootnote[r];

                    if (f.s === this.item.armorStats[0].value && this.item.armorStats[1].value === f.d ) val += f.v;
                }

                for (var q = 0; q < this.priceSheet.armorQualities.length; q++) {
                    for (var i = 0; i < this.item.qualities.length; i++) {   
                        if (this.item.qualities[i].name === this.priceSheet.armorQualities[q].name) {
                            if (["defensive", "deflection"].indexOf(this.priceSheet.armorQualities[q].name) >= 0) {
                                val += this.priceSheet.armorQualities[q].r === this.item.qualities[i].value ? this.priceSheet.armorQualities[q].value : 0;
                            } else {
                                val += (this.priceSheet.armorQualities[q].value * this.item.qualities[i].value);
                            }
                        }
                    }                    
                }

                for (var re = 0; re < this.priceSheet.recommendedArmorEncumberance.length; re++) {

                    if (this.priceSheet.recommendedArmorEncumberance[re].s === this.item.armorStats[0].value) {
                        this.item.coreStats[3].value = this.priceSheet.recommendedArmorEncumberance[re].e;
                    }
                 }
            }

            for(var e = 0; e < this.priceSheet.encumbrance.length; e++) {
                if (this.priceSheet.encumAdjusts === this.priceSheet.encumbrance[e].e) val += this.priceSheet.encumbrance[e].v;
            }            
            
            //last thing to ever do.
            if (["Brawl Weapons", "Melee Weapons", "Melee (Light) Weapons", "Melee (Heavy) Weapons"].indexOf(this.selectedSubcategory) >= 0) {
                val = Math.ceil(val/2);
            }

            this.item.coreStats[4].value = val;

            this.boxValue = this.item.coreStats[4].value;

            return true;
        },
        adjustItem: function (item, amount, stat) {

            var newValue = item.value + amount;

            if (newValue < 0 ) return false;
            if (newValue < 1 && item.name === "Critical Rating" ) return false;
            if (newValue > 6 && item.name === "Critical Rating" ) return false;
            if (newValue > 9998 && item.name === "Damage" ) return false;
            if (newValue > 4 && item.name === "Soak" ) return false;
            if (newValue > 4 && item.name === "Defense" ) return false;
            if (newValue > 2 && item.name === "Hands Needed" ) return false;
            if (newValue < 1 && item.name === "Hands Needed" ) return false;
            
            if (item.name === "Encumbrance" && newValue >= 0 ) this.priceSheet.encumAdjusts += amount;            
            if (this.priceSheet.encumAdjusts < -3) this.priceSheet.encumAdjusts = -3;

            var idx = -1;
            switch(stat) {
                case "core": 
                    idx = this.findWithAttr(this.item.coreStats, "name", item.name);
                    this.item.coreStats[idx].value += amount;
                    break;                    
                case "weapon": 
                    idx = this.findWithAttr(this.item.weaponStats, "name", item.name);
                    this.item.weaponStats[idx].value += amount;
                    break;
                case "armor": 
                    idx = this.findWithAttr(this.item.armorStats, "name", item.name);
                    this.item.armorStats[idx].value += amount;
                    break;
            }

            
            if (stat === "armor") {
                for (var re = 0; re < this.priceSheet.recommendedArmorEncumberance.length; re++) {

                    if (this.priceSheet.recommendedArmorEncumberance[re].s === this.item.armorStats[0].value) {
                        this.item.coreStats[3].value = this.priceSheet.recommendedArmorEncumberance[re].e;
                        this.item.coreStats[0].value += this.priceSheet.recommendedArmorEncumberance[re].e;
                    }
                 }
            }

            if (item.name === "Hands Needed") {
                this.item.coreStats[3].value += amount;
                this.item.coreStats[0].value += amount;;
            }
                
            this.adjustDerivedStats();
            return true;
        },
        adjustDerivedStats: function () {
            
            this.item.coreStats[2].value = Math.ceil(this.item.coreStats[0].value/2);
            
            this.item.armorStats[2].value = this.item.coreStats[0].value - 3;

            if (this.item.armorStats[2].value < 0) this.item.armorStats[2].value = 0;

            return true;
        },
        showExportModal: function () {
            this.exportContent = JSON.stringify(this.itemList, null, '\t');
            this.exportModel = true;
            return true;
        },
        addAbility: function () {
            if (this.abilityName === '' || this.abilityDescription === '') return false;
            this.idGen();
            var a = { id: this.item.id, source: this.abilityName , ability: this.abilityDescription }            
            this.item.abilities.push(a);
            this.abilityName = '';
            this.abilityDescription = '';
            return true;
        },
        adjustQuality: function (q, amount) {

            var newValue = q.value + amount;

            if (newValue < 0) return false;

            if (["accurate", "defensive", "deflection", "inaccurate"].indexOf(q.name) >= 0 && newValue > 2) return false;
            
            if (["cumbersome", "unwieldy"].indexOf(q.name) >= 0 && newValue > 5) return false;

            if (["auto-fire", "stun", "superior", "inferior", "sunder", "knockdown"].indexOf(q.name) >= 0 && newValue > 1) return false;

            var qidx = this.findWithAttr(this.item.qualities, "name", q.name);

            this.item.qualities[qidx].value += amount;

            return true;
        },
        removeAbility: function (ability) {
            var i = this.findWithAttr(this.item.abilities, "source", ability.source); 
            this.item.abilities.splice(i, 1);
            return true;
        },
        addItem: function () {
            
            if (this.boxName === '' || this.selectedSubcategory === '' || this.selectedCategory === '') return false;
            
            var i = this.findWithAttr(this.itemList, "name", this.boxName)

            var x = {
                id: this.item.id,
                name: this.boxName,
                value: this.boxValue,
                coreStats: this.item.coreStats,
                armorStats: this.item.armorStats,
                weaponStats: this.item.weaponStats,
                category: this.selectedCategory,
                subCategory: this.selectedSubcategory,
                description: this.description,
                abilities : this.item.abilities,
                skill: this.skillSelected,
                range: this.selectedRange,
                genre: 'Custom',
                qualities: this.item.qualities
            };
                        
            if (i < 0) {
                
                this.idGen();
                x.id = this.item.id;
                this.itemList.push(x);

            } else {
                this.itemList[i] = x;
            }

        },
        clearItem: function (purgeSelections) {
            var x = {
                id: '',
                name: '',
                value: 0,
                category: '',
                subCategory: '',
                skill: '',
                range :'',
                text: '',
                coreStats: [
                    { name: "Encumbrance", value: 0, canBeModified: true },
                    { name: "Rarity", value: 0, canBeModified: true },
                    { name: "Hard Points", value: 0, canBeModified: false },
                    { name: "Recommended Encumbrance", value: 0, canBeModified: false },
                    { name: "Fantasy Flight Recommended Retail Value", value: 0, canBeModified: false },   
                ],
                armorStats: [
                    { name: "Soak", value: 0, canBeModified: true  },
                    { name: "Defense", value: 0, canBeModified: true  },
                    { name: "Worn Encumbrance", value: 0, canBeModified: false  },
                ],
                weaponStats: [
                    { name: "Damage", value: 0, canBeModified: true },
                    { name: "Critical Rating", value: 6, canBeModified: true },
                    { name: "Hands Needed", value: 0, canBeModified: true },   
                ],
                abilities : [],
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
            };            
            this.item = x
            
            if (purgeSelections) {
                this.selectedCategory = '';
                this.selectedSubcategory = '';
                this.selectedRange = '';
                this.boxName = '';
                this.description = '';
            }

            this.boxValue = 0;
            
            this.adjustDerivedStats();
            return true;
        }
    },
    created () {
        this.emptyItem = this.item;
    }
}
</script>