<template>    
    <div class="col-sm-12 p-3">
        <h1> Character Generator </h1>
        <b-container class="p-3">
            <b-row> 
                <b-col> 
                    <b-form-checkbox id="checkbox1"
                                        v-model="isFreedomMode"
                                        value="on"
                                        unchecked-value="off">
                            Freedom Mode
                    </b-form-checkbox>
                </b-col>
                <b-col>
                    <b-btn variant="success">
                        Export as JSON
                    </b-btn>
                </b-col>
            </b-row>
            <b-row v-if="isFreedomMode === 'on'">
                <b-col> <p class="text-center text-warning pt-3"> Freedom Mode is on. Equipment, skills and talents are free. </p>
                        <p class="text-center text-warning"> Be free my friends. </p> </b-col>
            </b-row>
            <b-row> 
                <hr>
            </b-row>
            <b-row>                        
                <b-col> <strong>Name</strong> </b-col>
                <b-col> <strong>Setting</strong> </b-col>
                <b-col> <strong>Alternative Rules</strong> </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-input id="characterName" v-model="this.character.name" placeholder="enter name" type="text"/> 
                </b-col>
                <b-col> 
                    <b-form-select v-model="selectedGenre" :options="this.settingGenres" class="mb-3"/>
                </b-col>
                <b-col> 
                    <b-container>
                        <b-row>
                            <b-col> 
                                <b-form-group>
                                    <b-form-checkbox-group v-model="selectedAlternativeRules" :options="this.sheet.alternativeRules" />                    
                                </b-form-group>
                            </b-col>

                            <b-col>
                                <b-button v-on:click="this.castActiveSkills" variant="info" size="sm"> Redo Skills </b-button>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>

            <b-row>
                <b-col> <strong>Race</strong> </b-col>
                <b-col> <strong>Career</strong> </b-col>
                <b-col v-if="selectedGenre === 'After Seven'"> <strong>Former Faction</strong> </b-col>
            </b-row>

            <b-row>
                <b-col>                    
                    <b-form-select v-model="selectedRace" :options="this.sheet.selectableRaces" class="mb-3"/>                    
                </b-col>
                <b-col>
                    <b-form-select v-model="selectedCareer" :options="this.sheet.selectableCareers" class="mb-3"/>
                </b-col>
                <b-col v-if="selectedGenre === 'After Seven'">
                    <b-form-select v-model="selectedFaction" :options="this.sheet.possibleFactions" class="mb-3"/>
                </b-col>
            </b-row>

            <b-row>                
                <b-col> <strong>Desire</strong> </b-col>
                <b-col> <strong>Fear</strong> </b-col>
                <b-col> <strong>Flaw</strong> </b-col>
                <b-col> <strong>Strength</strong> </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-select v-model="selectedDesire" :options="this.sheet.selectableDesires" class="mb-3"/>
                </b-col>
                <b-col>
                    <b-form-select v-model="selectedFear" :options="this.sheet.selectableFears" class="mb-3"/>
                </b-col>
                <b-col>
                    <b-form-select v-model="selectedFlaw" :options="this.sheet.selectableFlaws" class="mb-3"/>
                </b-col>
                <b-col>
                    <b-form-select v-model="selectedStrength" :options="this.sheet.selectableStrengths" class="mb-3"/>
                </b-col>
            </b-row>
                
            <b-row>                
                <b-col> <strong>Total XP</strong> </b-col>
                <b-col> <strong>Bonus XP</strong> </b-col>
                <b-col> <strong>Spent XP</strong> </b-col>
                <b-col> <strong>Starting XP</strong> </b-col>
            </b-row>

            <b-row>
                <b-col> {{ this.character.xp.total }} </b-col>
                <b-col> <b-form-input v-model="this.character.xp.bonus" type="number"/> </b-col>
                <b-col> {{ this.character.xp.totalSpent }} </b-col>
                <b-col> {{ this.character.xp.starting }} </b-col>                               
            </b-row>

        </b-container>        

        <h2> <strong> Characteristics </strong> </h2>
        <p> </p>
  
        <b-container class="p-3">
            <b-row>
                <b-col>
                    <b-alert :show="characteristicAlert"
                        dismissible
                        @dismissed="characteristicAlert=false"
                        variant="danger">
                        <p> {{ this.illegalLogic }} </p>
                    </b-alert>                        
                </b-col>                        
            </b-row>

            <b-row>                
                <b-col>
                    <b-container> 
                        <b-row>
                            <b-col>
                                <b-table 
                                        responsive 
                                        small 
                                        striped 
                                        class="text-left" 
                                        :items="this.character.stats.characteristics" 
                                        :fields="this.sheet.characteristicFields">

                                    <template slot="actions" slot-scope="row">                                                                              
                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustCharacteristic(row.item, -1)"> - </b-btn>
                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustCharacteristic(row.item, 1)"> + </b-btn>                                
                                    </template>    

                                </b-table>
                            </b-col>
                        </b-row>          
                    </b-container>                            
                </b-col>

                <b-col>
                    <b-container>  
                        <b-row>
                            <b-col>  
                                <b-table 
                                    responsive 
                                    small 
                                    striped 
                                    class="text-left" 
                                    :items="this.character.stats.derivedCharacteristics" 
                                    :fields="this.sheet.derivedCharacteristicFields"/>                              
                            </b-col>
                        </b-row>         
                    </b-container>                   
                </b-col>

                <b-col>
                    <b-container>   
                        <b-row class="text-left text-secondary" >
                            <b-col class="text-primary text-left"> <strong> Armor Worn </strong> </b-col>
                        </b-row>

                        <b-row>
                            <b-col class="text-left"> <strong> {{ this.character.equipment.armor.armorWorn.name }} </strong> </b-col>
                        </b-row>
                        
                        <b-row class="text-left text-secondary" >
                            <b-col> <strong> Defense </strong> </b-col>
                            <b-col> {{ this.character.equipment.armor.armorWorn.defense }} </b-col>                                
                        </b-row>

                        <b-row  class="text-left text-secondary">
                            <b-col> <strong> Soak </strong> </b-col>
                            <b-col> {{ this.character.equipment.armor.armorWorn.soak }} </b-col>                                
                        </b-row>

                        <b-row  class="text-left text-secondary">
                            <b-col> <strong> Encumbrance </strong> </b-col>
                            <b-col> {{ this.character.equipment.armor.armorWorn.encumbrance }} </b-col>
                        </b-row>   
                        
                        <b-row> <hr> </b-row>

                        <b-row class="text-left text-secondary" >
                            <b-col class="text-primary text-left"> <strong> Misc. Item Stats </strong> </b-col>
                        </b-row>
                                                        
                        <b-row class="text-left text-secondary" >
                            <b-col > <strong> Armor </strong> </b-col>
                            <b-col> {{ this.character.equipment.inventory.armorItems }} <small class="text-muted"> (not worn) </small> </b-col>                             
                        </b-row>

                        <b-row class="text-left text-secondary" >
                            <b-col> <strong> Weapons </strong> </b-col>
                            <b-col> {{ this.character.equipment.inventory.weaponItems }} </b-col>                                
                        </b-row>

                        <b-row class="text-left text-secondary" >
                            <b-col> <strong> Gear </strong> </b-col>
                            <b-col> {{ this.character.equipment.inventory.gearItems }} </b-col>
                        </b-row>     
                        
                        <b-row class="text-left text-secondary" >
                            <b-col> <strong> Item Total </strong> </b-col>
                            <b-col> {{ this.character.equipment.inventory.items.length - 1 }} </b-col>
                        </b-row>     

                        
                    </b-container>                   
                </b-col>

            </b-row>
        </b-container>
            
        <p> </p>
        <h2> <strong> Skills and Talents </strong> </h2>
        <b-container class="p-0 col-md-12">
            <b-row>
                <b-col>
                    <b-container>
                        <b-row>
                            <b-col>
                                <b-form-checkbox id="skillCheckBox"
                                        v-model="skillTableMode"
                                        value="on"
                                        unchecked-value="off">
                                    Show Skills
                                </b-form-checkbox>
                            </b-col> 
                            <b-col> Remaining XP: {{ this.character.xp.total }} </b-col>
                            <b-col>
                                <b-form-checkbox id="talentCheckBox"
                                        v-model="talentTableMode"
                                        value="on"
                                        unchecked-value="off">
                                    Show Talents
                                </b-form-checkbox>
                            </b-col>
                        </b-row>
            
                        <b-row>
                            <b-col>                                            
                                <b-btn v-b-toggle.skillLegend variant="secondary" size="sm"> + Skill Legend </b-btn>
                                <b-btn variant="warning" size="sm" v-on:click.stop="this.resetSkills"> Reset Skills </b-btn>
                                <b-btn v-b-toggle.talentLimits variant="secondary" size="sm"> + Talent Limits </b-btn>
                                <b-collapse id ="skillLegend" >
                                    <b-card>
                                        <b-table responsive small striped class="text-left" :items="this.sheet.skillLegend" :fields="this.sheet.skillLegendFields"/>
                                    </b-card>
                                </b-collapse>                                       
                                <b-collapse id="talentLimits">
                                    <b-card>
                                        <b-table class="text-left" small striped :items="this.character.talents.limitations"/>
                                    </b-card>
                                </b-collapse>  
                            </b-col>                    
                        </b-row>    
                        <b-row>
                            <b-col>
                                <b-alert 
                                    :show="skillAlert"
                                    dismissible
                                    @dismissed="skillAlert=false"
                                    variant="danger">
                                        <p> {{ this.illegalLogic }} </p>
                                </b-alert>                        
                            </b-col> 
                        </b-row>
                        <b-row> <hr> </b-row>
                        
                        <b-row id="skillAndTalentGrids" >
                            <b-col v-if="skillTableMode === 'on'" id="skillGrid">
                                <b-container>
                                    <b-row v-if="skillTableMode === 'on'"> <b-col> </br> </b-col> </b-row>
                                    <b-row v-if="skillTableMode === 'on'">
                                        <b-col>
                                            <p> </p>
                                            <b-table                                
                                                responsive 
                                                small 
                                                striped 
                                                class="text-left"
                                                :items="this.character.skills.items"
                                                :fields="this.sheet.skillFields">

                                                <template slot="actions" slot-scope="row">                                                   
                                                    <b-btn size="sm" variant="danger" v-on:click.stop="adjustSkillRank(row.item, -1)"> - </b-btn>
                                                    <b-btn size="sm" variant="success" v-on:click.stop="adjustSkillRank(row.item, 1)"> + </b-btn>                                
                                                </template>    

                                            </b-table>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-col>

                            <b-col v-if="talentTableMode === 'on'">
                                <b-container >
                                    <b-row v-if="talentTableMode === 'on'">
                                        <b-col>
                                            <b-form-input v-model="talentFilter" placeholder="Type to Search" />
                                        </b-col>

                                        <b-col>
                                            <b-input-group-button> 
                                                <b-btn :disabled="!talentFilter" @click="talentFilter = ''" size="sm"> X </b-btn>
                                            </b-input-group-button>
                                        </b-col>
                                    </b-row>                              
                                    
                                    <b-row v-if="talentTableMode === 'on'">
                                        <b-col>
                                            <b-table 
                                                    responsive 
                                                    class="text-left" 
                                                    small 
                                                    striped                                                     
                                                    :filter="talentFilter"
                                                    @filtered="onTalentFilter"
                                                    :items="this.character.talents.items" 
                                                    :fields="this.sheet.talentFields" 
                                                    :per-page="talentsPerPage" 
                                                    :current-page="talentsPage">   

                                                    <template slot="actions" slot-scope="row">
                                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'talent')" variant="secondary"> info </b-btn>                                
                                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustTalentTiering(row.item, -1)"> - </b-btn>
                                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustTalentTiering(row.item, 1)"> + </b-btn>                                
                                                    </template>    

                                            </b-table>
                                        </b-col>
                                    </b-row>
                                    <b-row v-if="talentTableMode === 'on'">
                                        <b-col>
                                            <b-pagination size="sm" :total-rows="this.talentTableRows" :per-page="talentsPerPage" v-model="talentsPage" />
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
    
        <p> </p>
        <h2> <strong> Shop Inventory </strong> </h2>
        <b-container>
            <b-row> 
                <b-col>
                    <b-form-checkbox id="armorShopModeCheckBox"
                            v-model="armorShopMode"
                            value="on"
                            unchecked-value="off">
                        Show Armor Shop
                    </b-form-checkbox>
                </b-col> 
                <b-col>
                    <b-form-checkbox id="weaponShopModeCheckBox"
                            v-model="weaponShopMode"
                            value="on"
                            unchecked-value="off">
                        Show Weapon Shop
                    </b-form-checkbox>
                </b-col> 
                <b-col>
                    <b-form-checkbox id="gearhopModeheckBox"
                            v-model="gearShopMode"
                            value="on"
                            unchecked-value="off">
                        Show Gear Shop
                    </b-form-checkbox>
                </b-col> 
            </b-row>
            <b-row>
                <b-col> Current Encumbrance: {{ this.character.stats.derivedCharacteristics[0].value }}  </b-col>
                <b-col> Encumbrance Capacity: {{ this.character.stats.derivedCharacteristics[1].value }}  </b-col>
                <b-col> Money: {{ this.character.equipment.money }}  </b-col>
            </b-row>
   
            <b-row>
                <b-col>
                    <b-alert :show="inventoryAlert"
                                        dismissible
                                        @dismissed="inventoryAlert=false"
                                        variant="danger">
                                        <p> {{ this.illegalLogic }} </p>
                    </b-alert>     
                </b-col>
            </b-row>
            <hr>
            <b-row id="inventoryGrid">
                <b-col>
                    <b-container>
                        <b-row v-if="armorShopMode === 'on'"> <b-col> <h4 class="text-left"><strong> Armor </strong> </h4> </b-col> </b-row>
                        <b-row id ="armorGrid" v-if="armorShopMode === 'on'">
                            <b-col>
                                <b-table      
                                        responsive
                                        small                         
                                        striped                                                                     
                                        :items="this.character.equipment.armor.items" 
                                        :fields="this.sheet.armorFields" >                                
                                    
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'armor')" variant="secondary"> info </b-btn>                                
                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustArmorInventory(row.item, -1)"> - </b-btn>
                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustArmorInventory(row.item, 1)"> + </b-btn>                                
                                    </template>    
                                </b-table>
                            </b-col>
                        </b-row>
                        <hr v-if="weaponShopMode === 'on'"> 
                        <b-row v-if="weaponShopMode === 'on'"> <b-col> <h4 class="text-left"><strong> Weapons </strong> </h4> </b-col> </b-row>
                        <b-row id ="weaponGrid"  v-if="weaponShopMode === 'on'">
                            <b-col>
                                <b-table      
                                        responsive
                                        small                         
                                        striped                                                                              
                                        :items="this.character.equipment.weapons.items" 
                                        :fields="this.sheet.weaponFields">                                
                                    
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'weapon')" variant="secondary"> info </b-btn>                                
                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustWeaponInventory(row.item, -1)"> - </b-btn>
                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustWeaponInventory(row.item, 1)"> + </b-btn>                                
                                    </template>    
                                </b-table>
                            </b-col>
                        </b-row>
                        <hr v-if="gearShopMode === 'on'"> 
                        <b-row v-if="gearShopMode === 'on'"> <b-col> <h4 class="text-left"><strong> Gear </strong> </h4> </b-col> </b-row>

                        <b-row id ="gearGrid"  v-if="gearShopMode === 'on'">
                            <b-col>
                                <b-table      
                                        responsive
                                        small                         
                                        striped                                                                    
                                        :items="this.character.equipment.gear.items" 
                                        :fields="this.sheet.gearFields">                                
                                    
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'gear')" variant="secondary"> info </b-btn>                                
                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustGearInventory(row.item, -1)"> - </b-btn>
                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustGearInventory(row.item, 1)"> + </b-btn>                                
                                    </template>    
                                </b-table>
                            </b-col>
                        </b-row>

                    </b-container>
                </b-col>
            </b-row>

        </b-container>

        <b-modal 
            centered
            v-model="showModal"
            size="md"
            title="Details">
            <b-container>
                <b-row>
                    <b-col>
                        <ul>
                            <li class="text-left" v-for="(value, key) in this.modalData" :key="key">
                                <p> 
                                    <strong>{{ key }} </strong> </br> 
                                    {{ value }}
                                </p>   
                            </li>                                 
                        </ul>     
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
            sendingAlert: "",
            dismissSecs: 3,
            dismissCountDown: 0,

            altMagicRule : true,
            altAfterSevenRule: true,
            altCustomRule: false,
            altHackingRule: false,
            altVehicleRule: false,

            isFreedomMode: "off",
            skillTableMode: "off",
            talentTableMode: "off",
            armorShopMode: "off",
            weaponShopMode: "off",
            gearShopMode: "off",

            illegalLogic: '',

            selectedRace: '',
            selectedCareer: '',   
            selectedGenre: 'After Seven',
            selectedFaction: '',
            selectedDesire: '',
            selectedFear: '',
            selectedFlaw: '',
            selectedStrength: '',
            selectedRace: '',
            selectedAlternativeRules: ["After Seven"],

            skillData: [],       
            raceData: [],
            careerData: [],
            talentData: [],
            equipmentData: [],   
            armorData: [],
            weaponData: [],
            gearData: [],

            talentFilter: '',
            talentsPerPage: 25,
            talentsPage: 1,
            talentTableRows: 0,

            showModal: false,   
            modalData: [],
            
            characteristicAlert: false,
            skillAlert: false,
            talentAlert: false,
            armorShopAlert: false,
            weaponShopAlert: false,
            gearShopAlert: false,
            

            settingGenres: ["After Seven", "Custom", "Fantasy", "Steampunk", "Weird War", "Modern", "Sci-fi", "Space Opera"],

            sheet: {       
                altRuleButtons: [
                    { variant: "info", size: "sm", caption: "After Seven", state: true},
                    { variant: "info", size: "sm", caption: "Custom", state: false},
                    { variant: "info", size: "sm", caption: "Hacking", state: false},
                    { variant: "info", size: "sm", caption: "Magic", state: true},
                    { variant: "info", size: "sm", caption: "Vechicle", state: true}
                ],
                alternativeRules: ["After Seven", "Custom", "Hacking", "Magic", "Vehicle"],         
                possibleFactions: ["Confederacy of Canada", "Holy American Empire", "Imperium of the North", "Kingdom of Quebec", "New American Republic", "Western Commonwealth"],
                selectableDesires: ["Ambition", "Belonging", "Expertise", "Fame", "Justice", "Knowledge", "Love", "Safety", "Vengeance", "Wealth"],
                selectableFears: ["Change", "Commitment", "Death", "Expression", "Failure", "Humiliation", "Isolation", "Nemesis", "Obscurity", "Poverty"],                
                selectableFlaws: ["Anger", "Compulsion", "Deception", "Greed", "Laziness", "Ignorance", "Intolerance", "Pride", "Recklessness", "Timid"],        
                selectableStrengths: ["Adaptable", "Analytical", "Courageous", "Curious", "Idealistic", "Independent", "Patient", "Spiritual", "Wise", "Witty"],                
                selectableRaces: [], 
                selectableCareers: [],
                skillLegendFields: [{key:"text", label: "Item" }],
                skillLegend: [
                    { text: "Career Skill", _rowVariant: "primary"},
                    { text: "Automatic Skill", _rowVariant: "secondary"},
                    { text: "Racial or Talent Choice", _rowVariant: "warning"},
                    { text: "Racial or Talent Choice Selection", _rowVariant: "info"},
                ],
                talentFields: [                             
                    { key: "name", label: "Name", class: "text-left"},                             
                    { key: "tierDisplay", label: "Tier", class: "text-left" },                 
                    { key: "rankDisplay", label: "Ranked", class: "text-left" },                            
                    { key: "ranks", label: "Ranks", class: "text-center"},       
                    { key: "actions", label: " ", class: "text-left"},  
                    
                ],
                skillFields : [
                    { key: "name", label: "Name"},                   
                    { key: "rank", label: "Rank", class: "text-center" },    
                    { key: "actions", label: " ", class: "text-center"},   
                ],
                characteristicFields : [
                    { key: "name", label: "Name", class: "text-left" },                    
                    { key: "value", label: "Value", class: "text-center" },   
                    { key: "actions", label: " ", class: "text-center"}
                ],
                derivedCharacteristicFields : [
                    { key: "name", label: "Name", class: "text-left" },                    
                    { key: "value", label: "Value", class: "text-center" },                    
                ],
                armorFields : [
                    { key: "name", label: "Name", class: "text-left" },
                    { key: "encumbrance", label: "Encum.", class: "text-center" },
                    { key: "soak", label: "Soak", class: "text-center" },
                    { key: "defense", label: "Defense", class: "text-center"},                    
                    { key: "value", label: "Value", class: "text-center"},
                    { key: "quantity", label: "Amount", class: "text-center"},
                    { key: "actions", label: "Actions", class: "text-left"},                                                            
                ],
                weaponFields : [
                    { key: "name", label: "Name", class: "text-left"},
                    { key: "skill", label: "Skill Used", class: "text-left"},
                    { key: "range", label: "Range", class: "text-left"},        
                    { key: "damage", label: "Damage", class: "text-center"},            
                    { key: "value", label: "Value", class: "text-center"},                    
                    { key: "quantity", label: "Amount", class: "text-center"},
                    { key: "actions", label: "Actions", class: "text-left"},   
                ],
                gearFields : [
                    { key: "subCategory", label: "Type", class: "text-left"},   
                    { key: "name", label: "Name", class: "text-left"},                 
                    { key: "value", label: "Value", class: "text-center"},                    
                    { key: "quantity", label: "Amount", class: "text-center"},
                    { key: "actions", label: "Actions", class: "text-left"},   
                ]
            },    
            character: {
                name: '',
                xp: {
                    total: 0,
                    starting: 0,
                    bonus: 0,
                    totalSpent: 0,
                    skillSpending: 0,
                    characteristicSpending: 0,
                    talentSpending: 0
                },
                stats: {
                    characteristics: [ 
                        { name: "Agility", value: 0 },                   
                        { name: "Brawn", value: 0 },
                        { name: "Cunning", value: 0 }, 
                        { name: "Intellect", value: 0 },
                        { name: "Presence", value: 0 }, 
                        { name: "Willpower", value: 0 }
                    ],  
                    derivedstartingCharacteristics: [        
                        { name: "Current Encumbrance", value: 0 },     
                        { name: "Encumbrance Capacity", value: 0 },     
                        { name: "Melee Defense", value: 0 },
                        { name: "Ranged Defense", value: 0 },
                        { name: "Soak", value: 0 }, 
                        { name: "Strain Threshold", value: 0 },
                        { name: "Wounds Threshold", value: 0 },
                    ], 
                    derivedCharacteristics: [             
                        { name: "Current Encumbrance", value: 0 },        
                        { name: "Encumbrance Capacity", value: 0 },
                        { name: "Melee Defense", value: 0 },
                        { name: "Ranged Defense", value: 0 },
                        { name: "Soak", value: 0 },
                        { name: "Strain Threshold", value: 0 },
                        { name: "Wounds Threshold", value: 0 }
                    ],  
                },
                skills: {
                    firstFour: 4,
                    items: [{
                        id: "",
                        name: "",
                        rank: 0,
                        description: "",
                        _rowVariant: null,
                        isCareer: false,
                        isFreebee: false,
                        canBeFreebee: false,
                        sourceType: "",
                        sourceName: ""
                    }],
                    career: [],
                },
                talents: {
                    items: [{
                        id: "",
                        name: "",
                        ranks: 0,
                        tiering: "",
                        tier: "",
                        activation: "",
                        ranked: "",
                        description: "",
                        sourcing: "",
                        tags: ""
                    }],
                    limitations: [
                        { talent_tier: "Tier: 1", owned: 0, limit: null },
                        { talent_tier: "Tier: 2", owned: 0, limit: 0 },
                        { talent_tier: "Tier: 3", owned: 0, limit: 0 },
                        { talent_tier: "Tier: 4", owned: 0, limit: 0 },
                        { talent_tier: "Tier: 5", owned: 0, limit: 0 }
                    ]                
                },
                equipment: {
                    armor: {
                        items: [{
                            id: "",
                            UUID: "",
                            category: "",
                            subCategory: "",
                            itemType: "",
                            name: "",
                            description:"",
                            wornEncumbrance: 0,
                            hardPoints:0,
                            value: 0,
                            rarity: 0,
                            encumbrance: 0,
                            soak:0,
                            defense:0,
                            specialAbilities: [],
                            qualities: [],
                            qualityText: "",
                            hasQualities: false,
                            hasSpecials: false,
                            _showDetails: false,
                            quantity: 0,
                            repairNeeded: "" 
                        }],
                        armorWorn: {
                            name: "Common Clothing",
                            wornEncumbrance: 0,
                            encumbrance: 0,
                            defense: 0,
                            soak: 0
                        }
                    },
                    weapons: {
                        items: [{ 
                            id: "",
                            UUID: "",
                            category: "",
                            subCategory: "",
                            itemType: "",
                            name: "",
                            description:"",
                            hardPoints:0,
                            value: 0,
                            rarity: 0,
                            encumbrance: 0,                            
                            defense:0,
                            damage:0,
                            critical:0,
                            skill: 0,
                            range: "",
                            specialAbilities: [],
                            qualities: [],
                            qualityText: "",
                            hasQualities: false,
                            hasSpecials: false,
                            _showDetails: false,
                            quantity: 0,
                            repairNeeded: "",
                            _showDetails: false                        
                        }]
                    },
                    gear: {
                        items: [{
                            id: "",
                            UUID: "",
                            category: "",
                            subCategory: "",
                            itemType: "",
                            name: "",
                            description:"",
                            hardPoints:0,
                            value: 0,
                            rarity: 0,
                            encumbrance: 0,                            
                            specialAbilities: [],
                            qualities: [],
                            qualityText: "",
                            hasQualities: false,
                            hasSpecials: false,
                            _showDetails: false,
                            quantity: 0,
                            repairNeeded: "",
                            _showDetails: false                             
                        }]
                    },                 
                    money: 500,
                    inventory: {
                        items: [ {
                            id: "",
                            UUID: "",
                            category: "",
                            subCategory: "",
                            itemType: "",
                            name: "",
                            description:"",
                            hardPoints:0,
                            value: 0,
                            rarity: 0,
                            encumbrance: 0,
                            wornEncumbrance: 0,
                            soak:0,
                            defense:0,
                            damage:0,
                            critical:0,
                            skill: 0,
                            range: "",
                            specialAbilities: [],
                            qualities: [],
                            qualityText: "",
                            hasQualities: false,
                            hasSpecials: false,
                            _showDetails: false,
                            quantity: 0,
                            repairNeeded: "",
                            _showDetails: false   
                        } ],
                        armorItems: 0,
                        weaponItems: 0,
                        gearItems: 0
                    }                    
                },
            }                
        }
    },
    watch: {
        selectedRace : function (newRace) {         
            this.assignRacialCharacteristics();
            this.assignDerivedCharacteristics();
            this.assignRacialSkills();
        },
        selectedCareer : function(newCareer){
            this.assignCareerSkills();

            if(this.selectedRace != "" ) {
                this.assignRacialSkills();
            }            

            this.castActiveSkills();
        },
        selectedGenre : function() {

            if(this.selectedGenre != "After Seven") {
                
                if(this.selectedGenre === "Custom") {
                    this.selectedAlternativeRules = [];
                    this.selectedAlternativeRules.push("Custom");
                }
                else {
                    this.selectedAlternativeRules = [];
                }

            }

            this.castSelectableRaces();
            this.castSelectableCareers();
            this.castActiveSkills();
        }
    },   
    methods : {    
        findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        },
        showSomeModal (rowItem, rowType) {
            
            this.showModal = !this.showModal;
            this.modalData = [];

            var newModalData = [];

            //console.log(rowItem);

            switch (rowType){
                case "armor": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,
                        Value: rowItem.value,
                        Rarity: rowItem.rarity,
                        Soak: rowItem.soak,
                        Defense: rowItem.defense,
                        Qualities: rowItem.qualityText,
                        Abilities: ""
                    }

                    if (typeof rowItem.specialAbilities === "undefined") {                        
                    } else {                        
                        for(var i = 0; i < rowItem.specialAbilities.length; i++) {                            
                            newModalData.Abilities += rowItem.specialAbilities[i] + "\n";
                        }

                        newModalData.Abilities = newModalData.Abilities.slice(0, -2);
                    }                    
                    this.modalData = newModalData;

                    break;

                case "skill": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,                                                       
                    }                
                    break;

                case "gear": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,     
                        Encumbrance: rowItem.encumbrance,
                        Rarity: rowItem.rarity,
                        Vale: rowItem.value,
                        Abilities: ""
                    }                

                    if (typeof rowItem.specialAbilities === "undefined") {                        
                    } else {                        
                        for(var i = 0; i < rowItem.specialAbilities.length; i++) {                               
                            newModalData.Abilities += rowItem.specialAbilities[i] + "\n"                               
                        }                        
                    }                    

                    break;
                    
                case "weapon": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,
                        Value: rowItem.value,
                        Rarity: rowItem.rarity,                                                
                        Skill: rowItem.skill,
                        Range: rowItem.range,
                        Damage: rowItem.damage,
                        Critical: rowItem.critical,                        
                        Quality: rowItem.qualityText,   
                        Abilities: "",                                         
                    }

                    if (typeof rowItem.specialAbilities === "undefined") {                        
                    } else {                        
                        for(var i = 0; i < rowItem.specialAbilities.length; i++) {                               
                            newModalData.Abilities += rowItem.specialAbilities[i] + "\n"                               
                        }                        
                    }                    

                    this.modalData = newModalData;

                    break;
                case "talent": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,                       
                        Activation: rowItem.activation,                                                
                        Ranked: rowItem.ranked,
                        Sourcing: rowItem.sourcing,
                        Tags: rowItem.tags                                     
                    }

                    this.modalData = newModalData;

                    break;
            }

            this.modalData = newModalData;
        },
        getUniqueId() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        },
        adjustGearInventory (gear, amount) {
            
            this.gearShopAlert = false;
            
            var logicCheck = true;

            var newMoney = this.character.equipment.money - (gear.value * amount);

            var gearIndex = this.findWithAttr(this.character.equipment.gear.items, "name", gear.name);

            if (amount > 0) {    
                //can afford this.
                if (newMoney >= 0) {
                    var g = gear;
                    g.repairNeeded = "None";
                    //incase we need to remove this later.
                    g.UUID = this.getUniqueId();
                    
                    this.character.equipment.inventory.items.push(g); 
                }
                //can't afford it.
                else  {
                    this.illegalLogic = "You do not have enough money for this!";
                    this.gearShopAlert = true;
                    logicCheck = false;
                    return;
                }
            //removing item
            } else {
                if (gear.quantity === 0) {
                    this.illegalLogic = "Cannot take away something you don't have.";
                    this.gearShopAlert = true;
                    logicCheck = false;
                    return;                    
                } else {
                    var i = this.findWithAttr(this.character.equipment.inventory.items, "name", gear.name);                                    

                    if (i >= 0) {
                        this.character.equipment.inventory.items.splice(i, 1);                        
                    } else {
                        this.illegalLogic = "How awkward...we couldn't find the item.";
                        this.gearShopAlert = true;
                        logicCheck = false;
                        return;
                    }
                }
            }
            
            if(logicCheck) {
                
                if (amount < 0 ) {
                    //weapons items are 0, so don't need to subtract further.                    
                    if (this.character.equipment.inventory.gearItems != 0) {
                        this.character.equipment.inventory.gearItems = this.character.equipment.inventory.gearItems + amount ; 
                    }
                } else {
                    this.character.equipment.inventory.gearItems = this.character.equipment.inventory.gearItems + amount; 
                }        

                this.character.equipment.money = newMoney;
                this.character.equipment.gear.items[gearIndex].quantity = this.character.equipment.gear.items[gearIndex].quantity + amount;
                this.assignDerivedCharacteristics();    
            }      
        },
        adjustWeaponInventory (weapon, amount) {
            
            this.weaponShopAlert = false;
            
            var logicCheck = true;

            var newMoney = this.character.equipment.money - (weapon.value * amount);

            var weaponIndex = this.findWithAttr(this.character.equipment.weapons.items, "name", weapon.name);

            if (amount > 0) {    
                //can afford this.
                if (newMoney >= 0) {
                    var w = weapon;
                    w.repairNeeded = "None";
                    //incase we need to remove this later.
                    w.UUID = this.getUniqueId();
                    
                    this.character.equipment.inventory.items.push(w); 
                }
                //can't afford it.
                else  {
                    this.illegalLogic = "You do not have enough money for this!";
                    this.weaponShopAlert = true;
                    logicCheck = false;
                    return;
                }
            //removing item
            } else {
                if (weapon.quantity === 0) {
                    this.illegalLogic = "Cannot take away something you don't have.";
                    this.weaponShopAlert = true;
                    logicCheck = false;
                    return;                    
                } else {
                    var i = this.findWithAttr(this.character.equipment.inventory.items, "name", weapon.name);                                    

                    if (i >= 0) {
                        this.character.equipment.inventory.items.splice(i, 1);                        
                    } else {
                        this.illegalLogic = "How awkward...we couldn't find the item.";
                        this.armorShopAlert = true;
                        logicCheck = false;
                        return;
                    }
                }
            }
            
            if(logicCheck) {
                
                if (amount < 0 ) {
                    //weapons items are 0, so don't need to subtract further.                    
                    if (this.character.equipment.inventory.weaponItems != 0) {
                        this.character.equipment.inventory.weaponItems = this.character.equipment.inventory.weaponItems + amount ; 
                    }
                } else {
                    this.character.equipment.inventory.weaponItems = this.character.equipment.inventory.armorItems + amount; 
                }        

                this.character.equipment.money = newMoney;
                this.character.equipment.weapons.items[weaponIndex].quantity = this.character.equipment.weapons.items[weaponIndex].quantity + amount;
                this.assignDerivedCharacteristics();    
            }            
        },
        adjustArmorWorn () {
            
            //console.log("       armorItems: " + this.character.equipment.inventory.armorItems);

            var commonClothing = {
                name: "Common Clothing",
                defense: 0,
                soak: 0,
                encumbrance: 0,
                wornEncumbrance: 0
            }

            var oldWornArmor = this.character.equipment.armor.armorWorn;
            //clear
            this.character.equipment.armor.armorWorn = [];

            //if there is armor.
            if(this.character.equipment.inventory.armorItems > 0) {
                //find first instance of equipment matching the category "Armor"                
                //console.log("           this.character.equipment.inventory.armorItems > 0");
                //console.log(this.character.equipment.inventory.items);
                var inv = this.findWithAttr(this.character.equipment.inventory.items, "itemType", "armor");
                
                if (inv > 0 ) {           
                    //console.log("               Assign Armor Worn");
                    //assign the armorWorn
                    this.character.equipment.armor.armorWorn = this.character.equipment.inventory.items[inv];
                    //console.log("               Remove Armor Worn");
                    this.character.stats.derivedCharacteristics[0].value = this.character.stats.derivedCharacteristics[0].value - this.character.equipment.inventory.items[inv].encumbrance;
                    this.character.equipment.inventory.items.splice(inv, 1);                                            

                } else {
                    //no item was found with the name.
                    //console.log("               No item was found with the name");
                    var newEcum = 0;

                    if (oldWornArmor-3 < 0) {
                        newEcum = 0;
                    } else {
                        newEcum = oldWornArmor-3
                    }                    
                    this.character.equipment.armor.armorWorn = oldWornArmor;
                    return false;
                }                

            } else  {                
                //console.log("           this.character.equipment.armorItems <= 0");
                this.character.equipment.armor.armorWorn = commonClothing;
            }

            this.assignDerivedCharacteristics(); 
            //console.log("       armorItems: " + this.character.equipment.inventory.armorItems);

            return true;
        },
        adjustArmorInventory (armor, amount) {
            //console.log("Start armorItems: " + this.character.equipment.inventory.armorItems);
            this.armorShopAlert = false;

            var logicCheck = true;
            //to adjust the ending thinger
            var armorWornAdjustmentNumber = 0;

            var i = this.findWithAttr(this.character.equipment.armor.items, "name", armor.name);
            
            var newMoney = this.character.equipment.money - (armor.value * amount);

            if (amount > 0) {
                //add
                if (newMoney >= 0) {
                    //if can afford
                    var newArmor = armor;
                    newArmor.repairNeeded = "None";
                    newArmor.UUID = this.getUniqueId();

                    if(this.character.equipment.armor.armorWorn.name === "Common Clothing") {
                        //assign the armor to Armor Worn
                        this.character.equipment.armor.armorWorn = newArmor;
                        armorWornAdjustmentNumber = 1;
                    } else {
                        //place armor in the inventory 
                        this.character.equipment.inventory.items.push(newArmor);
                    }
                } else {
                    this.illegalLogic = "You do not have enough money for this!";
                    this.armorShopAlert = true;
                    logicCheck = false;
                    return;
                }
            } else {
                //removing armor
                if(armor.quantity === 1 && armor.name === this.character.equipment.armor.armorWorn.name) {
                    //this is the armor worn...so let's remove it.
                    //console.log(        "adjustArmorWorn()");
                    logicCheck = this.adjustArmorWorn();

                } else if (armor.quantity > 0) {
                    
                    //console.log(        "remove armor from inventory");
                    //find the armor in inventory
                    var armorIndex = this.findWithAttr(this.character.equipment.inventory.items, "UUID", armor.UUID);
                    
                    if (armorIndex >= 0) {
                        //remove armor from inventory 
                        //console.log(            "(" + armorIndex + ")" + " remove armor from inventory");                        
                        this.character.equipment.inventory.items.splice(armorIndex, 1);
                    } else {
                        this.illegalLogic = "Oh this is awkward, couldn't find the item.";
                        this.armorShopAlert = true;
                        logicCheck = false;
                        return;
                    }
                    
                } else if (armor.quantity <= 0) {
                    this.illegalLogic = "Cannot take away something you don't have, knucklehead.";
                    this.armorShopAlert = true;
                    logicCheck = false;
                    return;
                }
            }

            if(logicCheck) {                
                //console.log("   passed logic check");     
                //adjust money.
                this.character.equipment.money = newMoney;
                //add tallies 
                this.character.equipment.armor.items[i].quantity = this.character.equipment.armor.items[i].quantity + amount;
                
                if (amount < 0 ) {
                    //armor items are 0, so don't need to subtract further.
                    //console.log("   armorItem math:" + this.character.equipment.inventory.armorItems + (amount - armorWornAdjustmentNumber))
                    if (this.character.equipment.inventory.armorItems != 0) {
                        this.character.equipment.inventory.armorItems = this.character.equipment.inventory.armorItems + (amount - armorWornAdjustmentNumber); 
                    }                    
                } else {
                    this.character.equipment.inventory.armorItems = this.character.equipment.inventory.armorItems + (amount - armorWornAdjustmentNumber); 
                }
            }    
            
            //encumberance, defense resets.
            this.assignDerivedCharacteristics();
            //console.log("Fininish armorItems: " + this.character.equipment.inventory.armorItems);
            //console.log("   ");       
        },
        onTalentFilter (filteredItems) {
            this.talentTableRows = filteredItems.length;
            this.talentsPage = 1;            
        },
        adjustTalentTiering (talent, amount) {
            
            this.talentAlert = false;

            var t = this.findWithAttr(this.character.talents.items, "name", talent.name);
            var newOwnedAmount = 0;
            var i = 0;
            var xpSpent = 5;

            var newTiering = talent.tiering;
            
            switch(talent.tiering) {                
                case "Tier: 2":
                    //move up a tier if adding, down if removing.
                    if(talent.ranked === "Ranked: Yes") {
                        if (amount < 0 ) {
                            newTiering = "Tier: 1";
                        }
                        else {
                            newTiering = "Tier: 3";
                        }                        
                    }                    

                    xpSpent = 10;

                    i = 1;

                    break;
                case "Tier: 3":
                    //move up a tier if adding, down if removing.
                    if(talent.ranked === "Ranked: Yes") {
                        if (amount < 0 ) {
                            newTiering = "Tier: 2";
                        }
                        else {
                            newTiering = "Tier: 4";
                        }                        
                    }                    
                    xpSpent = 15;                    
                    i = 2;
                    break;
                case "Tier: 4":
                    //move up a tier if adding, down if removing.
                    if(talent.ranked === "Ranked: Yes") {
                        if (amount < 0 ) {
                            newTiering = "Tier: 3";
                        }
                        else {
                            newTiering = "Tier: 5";
                        }                        
                    }
                    xpSpent = 20;
                    i = 3;
                    break;                    
                case "Tier: 5":
                    //move up a tier if adding, down if removing.
                    if(talent.ranked === "Ranked: Yes") {
                        if (amount < 0 ) {
                            newTiering = "Tier: 4";
                        }
                    }
                    xpSpent = 25;
                    i = 4;
                    break;
                default:
                    //move up a tier if adding, down if removing.
                    if(talent.ranked === "Ranked: Yes") {
                        if (amount > 0 ) {
                            newTiering = "Tier: 2";
                        }             
                    }              
                    i = 0;                    
            }
            
            if (amount < 0) {
                xpSpent = xpSpent * -1;
            }

            newOwnedAmount = this.character.talents.limitations[i].owned + amount;
            
            //see if the talent increase is allowed.
            var limitCheck = true;
            var spendCheck = false;

            if (talent.ranks === 0 && amount < 0) {                
                this.illegalLogic = "Ay how you gun take away from 0? That's sum reel shade.";
                this.talentAlert = true;
                limitCheck = false;   
                return;
                
            } else {
                //check to see limitations are proper, tier 1s are always availble.
                if (talent.tiering === "Tier: 1" || this.character.talents.limitations[i].limit >= newOwnedAmount) {                
                    //spend XP (to refund it)
                    if ( amount < 0 ) {
                        limitCheck = true;
                    } else if (talent.ranked === "Ranked: No" && talent.ranks === 0 && amount >= 0 ) {
                        limitCheck = true;         
                    } else if (talent.ranked === "Ranked: Yes" && talent.ranks >= 0 && amount >= 0) {
                        limitCheck = true;
                    } else {
                        this.illegalLogic = "Yo, you can not increase the rank of this talent.";
                        this.talentAlert = true;
                        limitCheck = false;
                        return;
                    }                                      
                } else {
                    this.illegalLogic = "This ain't going to work.";
                    this.talentAlert = true;
                    limitCheck = false;
                    return;
                }            
            }
            
            if (limitCheck) {
                var spendCheck = this.spendXP(xpSpent, "talent");
            }
                        
            if(spendCheck) {
                
                this.character.talents.limitations[i].owned = newOwnedAmount;

                this.character.talents.items[t].tiering = newTiering;

                this.character.talents.items[t].ranks = this.character.talents.items[t].ranks + amount;

                this.setTalentTieringLimits();    
            }        
            else {
                this.illegalLogic = "This ain't going to work.";
                this.talentAlert = true;
                limitCheck = false;
                return;
            }

            return;

        },
        setTalentTieringLimits() {
            for(var i = 1; i < this.character.talents.limitations.length; i++){
                //skip talent tier 1.
                this.character.talents.limitations[i].limit = this.character.talents.limitations[i-1].owned-1;

                if(this.character.talents.limitations[i].limit <= 0) {
                    this.character.talents.limitations[i].limit = 0;
                }
            }
        },
        adjustCharacteristic(characteristic, amount) {
            
            this.characteristicAlert = false;
            
            var i = this.findWithAttr(this.character.stats.characteristics, 'name', characteristic.name);                    
            
            var logicCheck = true;

            if(i < 0) {
                //if the attribute wasn't found, just quit!
                this.illegalLogic = "Can not find attribute";
                this.characteristicAlert = true;
                logicCheck = false;
                return;
            }
          
            if(i >= 0){
                var oldValue = this.character.stats.characteristics[i].value; 

                var newValue = oldValue + amount;

                var xpSpent = newValue * 10;

                if(oldValue > newValue){
                    //decreased an Attribute, gain XP.
                    xpSpent = oldValue * 10 * -1
                }                
            }

            if( newValue <= 0) {
                this.illegalLogic = "Characteristics can't lower than 0!";
                this.characteristicAlert = true;                      
                logicCheck = false;
                return;
            }

            if( newValue > 5) {
                this.illegalLogic = "Characteristics can't be greater than 5";                
                this.characteristicAlert = true;                     
                logicCheck = false;
                return;
            }
            
            if (logicCheck) {
                logicCheck = this.spendXP(xpSpent, "characteristic");            
            }

            if (logicCheck) {
                this.character.stats.characteristics[i].value = newValue;                 
                this.assignDerivedCharacteristics();
                return;              
            } else  {
                this.illegalLogic = "You can not do this action!";                
                this.characteristicAlert = true; 
                return;
            }
                        
        },
        spendXP (amount, category) {
            var oldXP = this.character.xp.total;

            var newValue = oldXP - amount;

            if (newValue < 0 ){                     
                return false;
            }

            switch(category){
                case "skill":
                    this.character.xp.skillSpending = this.character.xp.skillSpending + amount;
                    break;
                case "characteristic":                    
                    this.character.xp.characteristicSpending = this.character.xp.characteristicSpending + amount;
                    break;
                case "talent":
                    this.character.xp.talentSpending = this.character.xp.talentSpending + amount;
                    break;
                default:
                    break;
            }

            this.character.xp.totalSpent = this.character.xp.totalSpent + amount;

            this.character.xp.total = newValue;

            return true;
        },
        adjustSkillRank(skill, amount) {

            this.skillAlert = false;

            var i = this.findWithAttr(this.character.skills.items, 'name', skill.name);   

            if(i < 0) {
                return;
            }

            var oldValue = this.character.skills.items[i].rank;
            
            var newValue = oldValue + amount;

            if( newValue < 0) {
                this.illegalLogic = "skills can't be lower than 0!";                
                this.skillAlert = true;
                return;
            }

            if( newValue > 2) {
                this.illegalLogic = "Skills can't be greater than 2 during character creation";       
                this.skillAlert = true;
                return;
            }  

            var xpSpent = (newValue * 5);

            var isRacial = false;

            var isFreebee = false;

            if(this.character.skills.items[i].sourceType == 'racial') {
                isRacial = true;
                xpSpent = 0;    
            } else if (!skill.isCareer) {
                //non career skill spending.
                xpSpent = xpSpent + 5;  
            } else if (skill.isCareer) {
                //first four skills in a career are free.
                if (oldValue === 0 && this.character.skills.firstFour > 0) {                    
                    xpSpent = 0;                    
                    this.character.skills.firstFour = this.character.skills.firstFour - 1;                    
                    isFreebee = true;
                }                
            }

            if (newValue < oldValue) {
                //decreasing skills gives back XP
                xpSpent = xpSpent * -1
            }

            var spendCheck = true;

            //If it is a racial, don't need to check to see if we can spend XP.
            if(!isRacial){
                spendCheck = this.spendXP(xpSpent, "skill");
            }

            if(spendCheck){
                this.character.skills.items[i].rank = newValue;
                this.character.skills.items[i].rank = newValue;
                
                if(this.character.skills.items[i].sourceType === "" && isFreebee === false) {
                    this.character.skills.items[i].sourceType = "XP";
                    this.character.skills.items[i].sourceName = "spent";
                }

                if(isFreebee) {
                    this.character.skills.items[i].sourceType = "generation";
                    this.character.skills.items[i].sourceName = this.selectedCareer;
                }

                if(isRacial) {
                    this.reformatSkills(this.character.skills.items[i].sourceName, skill.name);
                }      

                return;                                                         
            } else if (isRacial != true || spendcheck != true ) {
                this.illegalLogic = "You do not have enough XP to spend on this.";   
                this.skillAlert = true;
                return;
            }                      
        },
        reformatSkills(sourceName, skillName) {
                        
            for (var i = 0; i < this.character.skills.items.length; i ++){

                if(this.character.skills.items[i].sourceName === sourceName) {
                    
                    //is the selected skill the right skill?
                    if(this.character.skills.items[i].name === skillName) {                        
                        this.character.skills.items[i]._rowVariant = "info";                 
                    }

                    //if the skill is a career.
                    if(this.character.skills.career.indexOf(this.character.skills.items[i].name) >= 0) {

                        this.character.skills.items[i].isCareer = true;   

                        //mark it as a career skill.
                        if(this.character.skills.items[i].name != skillName) {                                                       
                            this.character.skills.items[i]._rowVariant = "primary";                             
                        }

                    } else if (this.character.skills.items[i].name != skillName) {                
                        //sourceType is not a match in a skill name nor is it a "isCareer", and it isn't the selected skill.
                        this.character.skills.items[i]._rowVariant = null;                                
                        this.character.skills.items[i].sourceType = '';
                        this.character.skills.items[i].sourceName = ''; 
                        this.character.skills.items[i].isFreebee = false;
                        this.character.skills.items[i].canBeFreebee = false;        
                        this.character.skills.items[i].isCareer = false;  
                    }
                }
            }
        },
        assignDerivedCharacteristics(){
            /*using hardcoded numbers cause I know the data! Better research how to better do this.            
                0    { name: "Current Encumbrance", value: 0 },    
                1    { name: "Encumbrance Capacity", value: 0 },
                2    { name: "Melee Defense", value: 0 },
                3    { name: "Ranged Defense", value: 0 },
                4    { name: "Soak", value: 0 },
                5    { name: "Strain Threshold", value: 0 },
                6    { name: "Wounds Threshold", value: 0 }
            */
            this.character.stats.derivedCharacteristics[0].value = 0;
            this.character.stats.derivedCharacteristics[1].value = this.character.stats.derivedstartingCharacteristics[1].value + this.character.stats.characteristics[1].value;
            this.character.stats.derivedCharacteristics[2].value = this.character.stats.derivedstartingCharacteristics[2].value;
            this.character.stats.derivedCharacteristics[3].value = this.character.stats.derivedstartingCharacteristics[3].value;
            this.character.stats.derivedCharacteristics[4].value = this.character.stats.derivedstartingCharacteristics[4].value + this.character.stats.characteristics[1].value;;
            this.character.stats.derivedCharacteristics[5].value = this.character.stats.derivedstartingCharacteristics[5].value + this.character.stats.characteristics[5].value;
            this.character.stats.derivedCharacteristics[6].value = this.character.stats.derivedstartingCharacteristics[6].value + this.character.stats.characteristics[1].value;
                        
            this.character.stats.derivedCharacteristics[0].value = this.character.stats.derivedCharacteristics[0].value + this.character.equipment.armor.armorWorn.wornEncumbrance;
            
            for(var i = 0; i < this.character.equipment.inventory.items.length; i++) {     
                this.character.stats.derivedCharacteristics[0].value = this.character.stats.derivedCharacteristics[0].value + this.character.equipment.inventory.items[i].encumbrance;                                        
            }                                               
        },
        resetSkills (){
            for (var i = 0; i < this.character.skills.items.length; i ++) {
                this.character.skills.items[i]._rowVariant = null;
                this.character.skills.items[i].rank = 0;
                this.character.skills.items[i].sourceType = '';
                this.character.skills.items[i].sourceName = ''; 
                this.character.skills.items[i].isFreebee = false;
                this.character.skills.items[i].canBeFreebee = false; 
            }

            this.character.xp.total = this.character.xp.total + this.character.xp.skillSpending;
            
            this.character.xp.totalSpent = this.character.xp.totalSpent - this.character.xp.skillSpending;                               
            
            this.character.xp.skillSpending = 0;

            this.assignRacialSkills();
            this.assignCareerSkills();
        },
        assignRacialSkills (){
            //any previous racial data cleared.
            for (var i = 0; i < this.character.skills.items.length; i ++){
                if(this.character.skills.items[i].sourceType === "racial") {
                    //clears out the Arisen, Human variants
                    this.character.skills.items[i]._rowVariant = null;
                    this.character.skills.items[i].rank = 0;
                    this.character.skills.items[i].sourceType = '';
                    this.character.skills.items[i].sourceName = ''; 
                    this.character.skills.items[i].isFreebee = false;
                    this.character.skills.items[i].canBeFreebee = false;                
                }
            }

            if(this.selectedRace === "Arisen") {
                for (var i = 0; i < this.character.skills.items.length; i ++){
                    if(["Knowledge: Mortality", "Knowledge: Natural","Knowledge: Paranormal","Knowledge: Systems"].indexOf(this.character.skills.items[i].name) >=0) {   
                        this.character.skills.items[i]._rowVariant = "warning";
                        this.character.skills.items[i].canBeFreebee = true;
                        this.character.skills.items[i].sourceType = "racial";
                        this.character.skills.items[i].sourceName = "I Know Things";
                    }
                }
            }

            if(this.selectedRace === "Elf") {
                for (var i = 0; i < this.character.skills.items.length; i ++){
                    if(this.character.skills.items[i].name === "Perception") {
                        this.character.skills.items[i]._rowVariant = "secondary";
                        this.character.skills.items[i].rank = 1;
                        this.character.skills.items[i].isFreebee = true;
                        this.character.skills.items[i].sourceType = "racial";
                        this.character.skills.items[i].sourceName = "I See Things";
                    }
                }
            }

            if(this.selectedRace === "Human"){
                for (var i = 0; i < this.character.skills.items.length; i ++){                 
                    if(["Gunnery","Mechanics","Operating","Skulduggery","Streetwise","Survival"].indexOf(this.character.skills.items[i].name) >=0) {    
                        this.character.skills.items[i]._rowVariant = "warning";
                        this.character.skills.items[i].canBeFreebee = true;                                      
                        this.character.skills.items[i].sourceType = "racial";
                        this.character.skills.items[i].sourceName = "Capable";  
                    }                                                   
                }             
            }

            if(this.selectedRace === "Protohuman") {
                for (var i = 0; i < this.character.skills.items.length; i ++){
                    if(this.character.skills.items[i].name === "Brawl") {
                        this.character.skills.items[i]._rowVariant = "secondary";
                        this.character.skills.items[i].rank = 1;
                        this.character.skills.items[i].isFreebee = true;
                        this.character.skills.items[i].sourceType = "racial";
                        this.character.skills.items[i].sourceName = "I Hit Things";
                    }
                }
            }

        },
        assignRacialCharacteristics () {
            for(var i = 0; i < this.raceData.length; i++) {
                if(this.raceData[i].name === this.selectedRace) {
                                       
                    this.character.stats.startingCharacteristics = this.raceData[i].characteristics;

                    this.character.stats.characteristics = this.raceData[i].characteristics;
                    
                    this.character.stats.derivedstartingCharacteristics = this.raceData[i].derivedCharacteristics;

                    this.character.xp.total = this.raceData[i].startingXP;
                    this.character.xp.starting = this.raceData[i].startingXP;

                    this.character.xp.totalSpent = 0;
                    this.character.xp.skillSpending = 0;
                    this.character.xp.characteristicSpending = 0;
                    this.character.xp.talentSpending = 0;                    
                }
            }                
        },
        assignCareerSkills () {           
            for(var i = 0; i < this.careerData.length; i++) {
                if(this.careerData[i].name === this.selectedCareer) {
                    this.character.skills.career = this.careerData[i].careerSkills;
                }
            }

            for (var i = 0; i < this.character.skills.items.length; i++){ 
                if (this.character.skills.items[i].sourceType === "starting") {
                    //clears out previous skill info.
                    this.character.skills.items[i].rank = 0;
                    this.character.skills.items[i].sourceType = '';
                    this.character.skills.items[i].sourceName = ''; 
                    this.character.skills.items[i].isFreebee = false;
                    this.character.skills.items[i].canBeFreebee = false;        
                    this.character.skills.items[i].isCareer = false;                  
                }

                //marks as career
                if(this.character.skills.career.indexOf(this.character.skills.items[i].name) >= 0){
                    this.character.skills.items[i]._rowVariant = "primary";
                    this.character.skills.items[i].isCareer = true;
                    this.character.skills.items[i].sourceType = "starting";
                    this.character.skills.items[i].sourceName = this.selectedCareer;   
                }
            }                       
        },
        castSelectableRaces() {           

            this.sheet.selectableRaces = [];              

            this.sheet.selectableRaces.push('');

            for (var i = 0; i < this.raceData.length; i ++){
                
                var n = this.raceData[i].genre.search(this.selectedGenre);
                
                if (n >= 0) {
                    this.sheet.selectableRaces.push(this.raceData[i].name);
                }            
            };

            this.sheet.selectableRaces = this.sheet.selectableRaces.sort();
        },
        castSelectableCareers() {           

            this.sheet.selectableCareers = [];              

            this.sheet.selectableCareers.push('');

            //add default
            var altRules = this.selectedAlternativeRules;
            altRules.push("Default");               

            for (var i = 0; i < this.careerData.length; i ++){
                
                var n = this.careerData[i].genre.search(this.selectedGenre);       
                
                var a = altRules.indexOf(this.careerData[i].alternativeRules);

                if (n >= 0 && a >= 0) {
                    this.sheet.selectableCareers.push(this.careerData[i].name);
                }       
                
            };

            this.sheet.selectableCareers = this.sheet.selectableCareers.sort();
        },
        castActiveSkills () {
            //add default
            console.log("LOL RUNNING");
            var altRules = this.selectedAlternativeRules;
            altRules.push("Default");
            
            const skillList = [];

            for (var i = 0; i < this.skillData.length; i ++) {
                
                var n = this.skillData[i].genres.search(this.selectedGenre);                      
                var a = altRules.indexOf(this.skillData[i].alternativeRules);

                if (n >= 0 && a >=0) {
                    var s = {
                        name: this.skillData[i].skill,
                        rank: 0,    
                        description: this.skillData[i].description,
                        isCareer: false,
                        isFreebee: false,               
                        canBeFreebee: false,        //choice of skills from source
                        sourceType: '',             //racial, talent, XP, freebee, starting
                        sourceName : '',             //ability name, starting  or "spent"
                        _rowVariant: null           
                    };          
                                    
                    skillList.push(s);
                }
                
            }
            
            this.character.skills.items = skillList;

        },
        sortAlternativeRules () {
            this.alternativeRules = [];


        }
    },
    created() {
        this.selectedGenre === "After Seven";
        this.raceData = require('../data/race.json');
        this.careerData = require('../data/careers.json');
        this.skillData = require('../data/skills.json');
        this.talentData = require('../data/talents.json');
        this.armorData = require('../data/armor.json');
        this.weaponData = require('../data/weapons.json');
        this.gearData = require('../data/gear.json');                       

        //after seven races only.
        for (var i = 0; i < this.raceData.length; i ++) {
            
            var n = this.raceData[i].genre.search(this.selectedGenre);
            
            if (n >= 0) {
                this.sheet.selectableRaces.push(this.raceData[i].name);
            }            
        };

        //after seven careers only.
        for (var i = 0; i < this.careerData.length; i ++) {

            var n = this.careerData[i].genre.search(this.selectedGenre);

            if (n >= 0) {
                this.sheet.selectableCareers.push(this.careerData[i].name);
            }         
        };

        //add default
        var altRules = this.selectedAlternativeRules;
        altRules.push("Default"); 

        const skillList = [];

        for (var i = 0; i < this.skillData.length; i ++) {
            
            var n = this.skillData[i].genres.search(this.selectedGenre);                      
            var a = altRules.indexOf(this.skillData[i].alternativeRules);

            if (n >= 0 && a >=0) {
                var s = {
                    name: this.skillData[i].skill,
                    rank: 0,    
                    description: this.skillData[i].description,
                    isCareer: false,
                    isFreebee: false,               
                    canBeFreebee: false,        //choice of skills from source
                    sourceType: '',             //racial, talent, XP, freebee, starting
                    sourceName : '',             //ability name, starting  or "spent"
                    _rowVariant: null           
                };          
                                
                skillList.push(s);
            }
            
        }

        this.character.skills.items = skillList;

        const talentList = [];

        for (var i = 0; i < this.talentData.length; i ++) {
            var t = {
                name: this.talentData[i].talentName,
                ranks: 0,
                tiering: this.talentData[i].tier,
                tier: this.talentData[i].tier,
                tierDisplay: this.talentData[i].tierDisplay,
                rankDisplay: this.talentData[i].rankDisplay,
                activation: this.talentData[i].activation,
                ranked: this.talentData[i].ranked,
                description: this.talentData[i].text,
                sourcing: this.talentData[i].sourcing,
                tags: this.talentData[i].tags
            };

            talentList.push(t);
        }

        this.character.talents.items = talentList;

        this.talentTableRows = this.character.talents.items.length;

        this.setTalentTieringLimits();
        //clear out raw data.
        this.talentData = [];
        
        const armorList = [];

        for(var i = 0; i < this.armorData.length; i++) {
            var armor = this.armorData[i];
            armor.quantity = 0;
            armor.qualityText = "";      
            armor._showDetails = false;     
            armor.hasSpecials = true;       
            armor.hasQualities = true;    
            armor.itemType = "armor";

            if (typeof this.armorData[i].specialAbilities === "undefined") {                        
            } else {
                armor.hasSpecials = true;
            }
            
            if (typeof this.armorData[i].qualities === "undefined") {                        
            } else {       
                
                for(var j = 0; j < this.armorData[i].qualities.length; j++) {                
                    armor.hasQualities = true;

                    if(this.armorData[i].qualities[j].value > 0) {

                        if(["auto-fire", "knockdown", "reinforced"].indexOf(this.armorData[i].qualities[j].name) >= 0) {
                            //Don't give a rating.
                            armor.qualityText += this.armorData[i].qualities[j].name  + ", "
                        } else {                        
                            armor.qualityText += this.armorData[i].qualities[j].name + " " + this.armorData[i].qualities[j].value + ", ";         
                        }
                    }
                }
                
                if(this.armorData[i].qualities.length > 0) {       
                    armor.qualityText = armor.qualityText.slice(0, -2);
                }
            }

            armorList.push(armor);
        }

        this.character.equipment.armor.items = armorList;    
                
        const weaponsList = [];

        for(var i = 0; i < this.weaponData.length; i++) {
            var weapon = this.weaponData[i];
            weapon.quantity = 0;
            weapon.qualityText = "";   
            weapon.hasSpecials = false;
            weapon.hasQualities = false;
            weapon.itemType = "weapon";

            if (typeof this.weaponData[i].specialAbilities === "undefined") {                        
            } else {
                weapon.hasSpecials = true;
            }

            if (typeof this.weaponData[i].qualities === "undefined") {                        
            } else {
                if (this.weaponData[i].qualities.length > 0) {
                    
                    weapon.hasQualities = true;
                
                    for(var j = 0; j < this.weaponData[i].qualities.length; j++) {                
                        if(this.weaponData[i].qualities[j].value > 0) {                                        

                            if(["auto-fire", "knockdown", "reinforced"].indexOf(this.weaponData[i].qualities[j].name) >= 0){                        
                                weapon.qualityText += this.weaponData[i].qualities[j].name  + ", "
                            } else {                        
                                weapon.qualityText += this.weaponData[i].qualities[j].name + " " + this.weaponData[i].qualities[j].value + ", ";                        
                            }                    
                        }
                    }
                    weapon.qualityText = weapon.qualityText.slice(0, -2);
                }                
            }
            weaponsList.push(weapon);
        }

        this.character.equipment.weapons.items = weaponsList;   

        this.weaponShopTableRows = this.character.equipment.weapons.items.length;

                
        const gearList = [];

        for(var i = 0; i < this.gearData.length; i++) {
            var gear = this.gearData[i];
            gear.quantity = 0;        
            gear.hasSpecials = false;
            gear.hasQualities = false;
            gear.qualityText = "";

            if(this.gearData[i].specialAbilities === "undefined") {
            } else {
                gear.hasSpecials = true;
            }

            gearList.push(gear);
        }

        this.character.equipment.gear.items = gearList;   

    }    
}
</script>