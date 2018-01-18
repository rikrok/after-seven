<template>    
    <div class="col-sm-12 p-3">
        <h1> Character Generator </h1>
        <b-container class="p-3">
            <b-row>
                <b-col>
                    <b-container>
                        <b-row>
                            <b-col> 
                                <b-button variant="info" size="sm"> Redo Skills </b-button>
                                <b-button v-on:click="this.castTalents" variant="info" size="sm"> Redo Talents </b-button> 
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>

                <b-col>
                    <b-btn variant="success">
                        Export as JSON
                    </b-btn>
                </b-col>
            </b-row>
        </b-container>
        <hr>
        <p> </p>
        <b-check v-model="showHeader" value="on" unchecked-value="off"> Show Header? </b-check>
        
        <b-container class="p-3 text-left" style="border:1px solid #cecece;" v-if="showHeader === 'on'">
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
                    <b-form-group>
                        <b-form-checkbox-group v-model="selectedAlternativeRules" :options="this.sheet.alternativeRules" />                    
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> <b-col> <hr> </b-col> </b-row>
            <b-row v-if="this.selectedGenre === 'After Seven'"> 
                <b-col>
                    <b-btn variant="secondary" v-if="this.selectedGenre === 'After Seven'" size="sm">
                        Random Roll Race, Career, Faction
                    </b-btn>
                
                    <b-btn variant="secondary" v-if="this.selectedGenre === 'After Seven' && this.selectedCareer !=''" size="sm" @click="grantCareerBoost">
                        Roll for Career Bonus 
                    </b-btn>
                </b-col>                    
            </b-row>
            <p > </p>

            <b-row>
                <b-col> <strong>Race</strong> </b-col>
                <b-col> <strong>Career</strong> </b-col>
                <b-col v-if="selectedGenre === 'After Seven'"> <strong>Former Faction</strong> </b-col>
            </b-row>
            
            <b-row> <p> </p> </b-row>
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
            <b-row> <b-col> <hr> </b-col> </b-row>
            <b-row>
                <b-col>
                    <b-btn variant="secondary" size="sm"> Random Roll Motivations </b-btn>
                </b-col>
            </b-row>
            <p > </p>
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
        <hr>
        <p> </p>
        <b-check v-model="showCharacteristics" value="on" unchecked-value="off"> Show Characteristics? </b-check>

        <h2 v-if="showCharacteristics === 'on'"> <strong> Characteristics </strong> </h2>
        <p> </p>
  
        <b-container class="p-3" v-if="showCharacteristics === 'on'" style="border:1px solid #cecece;">
            <b-row>
                <b-col>
                    <b-alert :show="characteristicAlert"
                        dismissible
                        @dismissed="characteristicAlert=false"
                        variant="warning">
                            {{ this.illegalLogic }}                            
                    </b-alert>                        
                </b-col>                        
            </b-row>

            <b-row>                
                <b-col>
                    <b-container> 
                        <b-row>
                            <b-col>
                                <b-table 
                                    small 
                                    responsive="sm"
                                    striped 
                                    bordered
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
                                    small 
                                    responsive="sm"
                                    striped 
                                    bordered
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
                            <b-col class="text-primary text-left"> <strong> Carried Item Stats </strong> </b-col>
                        </b-row>
                                                        
                        <b-row class="text-left text-secondary" >
                            <b-col > <strong> Armor </strong> </b-col>
                            <b-col> {{ this.character.equipment.inventory.armorItems }} </b-col>                             
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
                            <b-col> {{ this.character.equipment.inventory.items.length }} </b-col>
                        </b-row>     

                        
                    </b-container>                   
                </b-col>

            </b-row>
        </b-container>

        <p> </p>
        <h2 v-if="skillTableMode === 'on' && talentTableMode === 'on'"> <strong> Skills and Talents </strong> </h2>
        <h2 v-if="skillTableMode === 'on' && talentTableMode === 'off'"> <strong> Skills </strong> </h2>
        <h2 v-if="skillTableMode === 'off' && talentTableMode === 'on'"> <strong> Talents </strong> </h2>
        <b-container class="p-0" style="border:1px solid #cecece;" >
            <b-row>
                    <b-col>
                        <b-form-checkbox id="skillCheckBox"
                                v-model="skillTableMode"
                                value="on"
                                unchecked-value="off">
                            Show Skills
                        </b-form-checkbox>
                    </b-col> 
                    <b-col> <strong> Remaining Free Skills: </strong> {{ this.character.skills.firstFour }} </b-col>
                    <b-col> <strong> Remaining XP: </strong> {{ this.character.xp.total }} </b-col>
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
                    <b-container>                                    
                        <b-row>
                            <b-col>                                            
                                <b-btn v-if="skillTableMode === 'on'" v-b-toggle.skillLegend variant="secondary" size="sm"> + Skill Legend </b-btn>
                                <b-btn v-if="skillTableMode === 'on'" v-on:click="cleanSkills" variant="warning" size="sm"> Reset Skills </b-btn>
                                <b-btn v-if="talentTableMode === 'on'" v-b-toggle.talentLimits variant="secondary" size="sm"> + Talent Limits </b-btn>
                                <b-btn v-if="talentTableMode === 'on'" variant="warning" size="sm"> Reset Talents </b-btn>
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
                                    :show="xpAlert"
                                    dismissible
                                    @dismissed="xpAlert=false"
                                    variant="warning">
                                        {{ this.illegalLogic }}                                        
                                </b-alert>                        
                            </b-col> 
                        </b-row>
                        <b-row> <hr> </b-row>
                        
                        <b-row id="skillAndTalentGrids" >
                            <b-col v-if="skillTableMode === 'on'" id="skillGrid">
                                <b-container>
                                    <b-row v-if="skillTableMode === 'on'">
                                        <b-col>
                                            <b-form-input v-model="skillFilter" placeholder="Type to Search" />
                                        </b-col>

                                        <b-col>
                                            <b-input-group-button> 
                                                <b-btn :disabled="!skillFilter" @click="skillFilter = ''"> Clear </b-btn>
                                            </b-input-group-button>
                                        </b-col>
                                    </b-row>      
                                    <b-row v-if="skillTableMode === 'on'">
                                        <b-col>
                                            <p> </p>
                                            <b-table                  
                                                responsive="sm"
                                                small
                                                outlined                                                          
                                                striped                                                                                               
                                                class="text-left"  
                                                :filter="skillFilter"
                                                @filtered="onSkillFilter"
                                                :items="this.character.skills.items"
                                                :fields="this.sheet.skillFields"
                                                :per-page="skillsPerPage" 
                                                :current-page="skillsPage">

                                                <template slot="actions" slot-scope="row">                                                   
                                                    <b-btn size="sm" variant="danger" v-on:click.stop="adjustSkillRank(row.item, -1)"> - </b-btn>
                                                    <b-btn size="sm" variant="success" v-on:click.stop="adjustSkillRank(row.item, 1)"> + </b-btn>                                
                                                </template>    

                                            </b-table>
                                        </b-col>
                                    </b-row>

                                    <b-row v-if="skillTableMode === 'on'">
                                        <b-col>
                                            <b-pagination size="sm" :total-rows="this.skillTableRows" :per-page="skillsPerPage" v-model="skillsPage" />
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
                                                <b-btn :disabled="!talentFilter" @click="talentFilter = ''"> Clear </b-btn>
                                            </b-input-group-button>
                                        </b-col>
                                    </b-row>                              
                                    
                                    <b-row v-if="talentTableMode === 'on'">
                                        <b-col>
                                            <p> </p>
                                            <b-table           
                                                responsive="sm"
                                                small
                                                outlined                                                          
                                                striped                                                                                               
                                                class="text-left"                                                   
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
        <h2> <strong>  </strong> </h2>
        <h2 v-if="abilityMode === 'on' && inventoryMode === 'on'"> <strong> Abilities and Inventory </strong> </h2>
        <h2 v-if="abilityMode === 'on' && inventoryMode === 'off'"> <strong> Abilities </strong> </h2>
        <h2 v-if="abilityMode === 'off' && inventoryMode === 'on'"> <strong> Inventory </strong> </h2>
        <b-container class="p-0" style="border:1px solid #cecece;">
            <b-row> 
                <b-col>
                    <b-form-checkbox id="abilityModeCheckBox"
                            v-model="abilityMode"
                            value="on"
                            unchecked-value="off">
                        Abilities
                    </b-form-checkbox>
                </b-col>
                <b-col> 
                    <b-form-checkbox id="inventoryModeCheckBox"
                            v-model="inventoryMode"
                            value="on"
                            unchecked-value="off">
                        Inventory
                    </b-form-checkbox>
                </b-col> 
            </b-row>
            <b-row>
                <b-col>
                </b-col>
            </b-row>
            <b-row>
                <b-col v-if="abilityMode ==='on'"> 
                    <b-container v-if="abilityMode === 'on'">
                        <b-row>
                            <b-col>
                                <b-form-input v-model="abilityFilter" placeholder="Type to Search" />
                            </b-col>

                            <b-col>
                                <b-input-group-button> 
                                    <b-btn :disabled="!abilityFilter" @click="abilityFilter = ''"> Clear </b-btn>
                                </b-input-group-button>
                            </b-col>
                        </b-row>     

                        <b-row>
                            <b-col>
                                <p> </p>
                                <b-table                
                                    responsive="sm"
                                    small
                                    outlined                                                          
                                    striped                                                                                               
                                    class="text-left"  
                                    :filter="abilityFilter"
                                    @filtered="onAbilityFilter"
                                    :per-page="abilityPerPage" 
                                    :current-page="abilityPage"
                                    :items="this.character.abilities"
                                    :fields="this.sheet.abilityFields"
                                    >
                                </b-table>
                            </b-col>                   
                        </b-row>

                        <b-row>
                            <b-col>
                                <b-pagination size="sm" :total-rows="this.abilityTableRows" :per-page="abilityPerPage" v-model="abilityPage" />                        
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
                <b-col> 
                    <b-container v-if="inventoryMode ==='on'">
                        <b-row>
                            <b-col>
                                <b-form-input v-model="inventoryFilter" placeholder="Type to Search" />
                            </b-col>

                            <b-col>
                                <b-input-group-button> 
                                    <b-btn :disabled="!inventoryFilter" @click="inventoryFilter = ''"> Clear </b-btn>
                                </b-input-group-button>
                            </b-col>
                        </b-row>  

                        <b-row>
                            <b-col>
                                <p> </p>                    
                                <b-table                
                                    responsive="sm"
                                    small
                                    outlined                                                          
                                    striped                                                                                               
                                    class="text-left"  
                                    :filter="inventoryFilter"
                                    @filtered="onInventoryFilter"
                                    :per-page="inventoryPerPage" 
                                    :current-page="inventoryPage"
                                    :items="this.character.equipment.inventory.items"
                                    :fields="this.sheet.inventoryFields">
                                </b-table>
                            </b-col>
                        </b-row>
                                            
                        <b-row>
                            <b-col>
                                <b-pagination size="sm" :total-rows="this.inventoryTableRows" :per-page="inventoryPerPage" v-model="inventoryPage" />                        
                            </b-col>
                        </b-row>
                    </b-container>     
                </b-col>
            </b-row>               
        </b-container>

        <p> </p>
        <b-container style="border:1px solid #cecece;">
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
                    <b-form-checkbox id="gearhopModeCheckBox"
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
                        variant="warning">
                            {{ this.illegalLogic }}                            
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
                                    responsive="sm"
                                    small
                                    outlined                                                                                              
                                    striped                                           
                                    :filter="weaponFilter"                                                        
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
                        
                        <b-row v-if="weaponShopMode === 'on'">

                                <b-col>
                                    <b-form-input v-model="weaponFilter" placeholder="Type to Search" />
                                </b-col>

                                <b-col>
                                    <b-input-group-button> 
                                        <b-btn :disabled="!weaponFilter" @click="weaponFilter = ''"> Clear </b-btn>
                                    </b-input-group-button>
                                </b-col>                                    
                        </b-row>
                        <b-row id ="weaponGrid"  v-if="weaponShopMode === 'on'">
                            <b-col>
                                <p> </p>
                                <b-table      
                                        responsive="sm"
                                        small
                                        outlined                                                          
                                        striped                                           
                                        :filter="weaponFilter"
                                        @filtered="onWeaponFilter"                                                                        
                                        :items="this.character.equipment.weapons.items" 
                                        :fields="this.sheet.weaponFields"
                                        :per-page="weaponShopPerPage" 
                                        :current-page="weaponShopPage">                                
                                    
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'weapon')" variant="secondary"> info </b-btn>                                
                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustWeaponInventory(row.item, -1)"> - </b-btn>
                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustWeaponInventory(row.item, 1)"> + </b-btn>                                
                                    </template>    
                                </b-table>
                            </b-col>
                        </b-row>
                        <b-row v-if="weaponShopMode === 'on'">
                            <b-col>
                                <b-pagination size="sm" :total-rows="this.weaponShopTableRows" :per-page="weaponShopPerPage" v-model="weaponShopPage" />
                            </b-col>
                        </b-row>


                        <hr v-if="gearShopMode === 'on'"> 
                        <b-row v-if="gearShopMode === 'on'"> <b-col> <h4 class="text-left"><strong> Gear </strong> </h4> </b-col> </b-row>

                        <b-row v-if="gearShopMode === 'on'">

                                <b-col>
                                    <b-form-input v-model="gearFilter" placeholder="Type to Search" />
                                </b-col>

                                <b-col>
                                    <b-input-group-button> 
                                        <b-btn :disabled="!gearFilter" @click="gearFilter = ''"> Clear </b-btn>
                                    </b-input-group-button>
                                </b-col>                                    
                        </b-row>

                        <b-row id ="gearGrid"  v-if="gearShopMode === 'on'">
                            <b-col>
                                <p> </p>
                                <b-table     
                                    responsive="sm"
                                    small
                                    outlined                                                          
                                    striped                                           
                                    :filter="gearFilter"
                                    @filtered="onGearFilter"       
                                    :per-page="gearShopPerPage" 
                                    :current-page="gearShopPage"                                                                 
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

                        <b-row v-if="gearShopMode === 'on'">
                            <b-col>
                                <b-pagination size="sm" :total-rows="this.gearShopTableRows" :per-page="gearShopPerPage" v-model="gearShopPage" />
                            </b-col>
                        </b-row>


                    </b-container>
                </b-col>
            </b-row>

        </b-container>

        <b-modal 
            centered
            v-model="showModal"
            size="md">
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
            
            rolledCareer: false,

            altMagicRule : true,
            altAfterSevenRule: true,
            altCustomRule: false,
            altHackingRule: false,
            altVehicleRule: false,

            isFreedomMode: "off",
            skillTableMode: "on",
            talentTableMode: "on",
            armorShopMode: "off",
            weaponShopMode: "off",
            gearShopMode: "off",
            abilityMode: "off",
            inventoryMode: "off",
            showHeader: "on",
            showCharacteristics: "on",

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
            abilityData: [],    

            talentFilter: '',
            talentsPerPage: 10,
            talentsPage: 1,
            talentTableRows: 0,
            
            skillFilter: '',
            skillsPerPage: 10,
            skillsPage: 1,
            skillTableRows: 0,

            weaponFilter: '',
            weaponShopPerPage: 8,
            weaponShopPage: 1,     
            weaponShopTableRows: 0,   

            gearFilter: '',
            gearShopPerPage: 8,
            gearShopPage: 1,     
            gearShopTableRows: 0,     

            abilityFilter: '',
            abilityPerPage: 4,
            abilityPage: 1,     
            abilityTableRows: 0,       

            inventoryFilter: '',
            inventoryPerPage: 8,
            inventoryPage: 1,     
            inventoryTableRows: 0,       

            showModal: false,   
            showChararcteristicModal: false,
            showSkillsModal: false,

            modalData: [],
            
            characteristicAlert: false,
            characteristicDismissSecs: 3,
            characteristicCountdown: 0,
            xpAlert: false,
            xpDismissSecs: 3,
            xpCountdown: 0,
            inventoryAlert: false,
            inventoryDismissSecs: 3,
            inventoryCountdown: 0,
            
            sortKey: 'tier',
            sortDesc: false,

            settingGenres: ["After Seven", "Custom", "Fantasy", "Steampunk", "Weird War", "Modern", "Sci-fi", "Space Opera"],

            sheet: {       
                selectableCharacteristics: ["Agility", "Brawl", "Cunning", "Intellect", "Presence", "Willpower"],
                selectedCharacteristic: "",
                selectedableSkills: [],
                selectedSkills: [],
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
                    { key: "tier", label: "Tier", class: "text-center", sortable: false   }, 
                    { key: "name", label: "Name", class: "text-left", sortable: false  },                  
                    { key: "ranked", label: "Ranked", class: "text-left", sortable: false },     
                    { key: "ranks", label: "Rank", class: "text-center", sortable: true } ,
                    { key: "actions", label: " ", class: "text-left" },                      
                ],
                skillFields : [
                    { key: "name", label: "Name", sortable: true },                   
                    { key: "ranks", label: "Rank", class: "text-center", sortable: true  },    
                    { key: "actions", label: " ", class: "text-center" },   
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
                    { key: "damage", label: "Damage", class: "text-center", sortable: true },            
                    { key: "value", label: "Value", class: "text-center", sortable: true },                    
                    { key: "quantity", label: "Amount", class: "text-center", sortable: true },
                    { key: "actions", label: "Actions", class: "text-left"},   
                ],
                gearFields : [
                    { key: "subCategory", label: "Type", class: "text-left"},   
                    { key: "name", label: "Name", class: "text-left"},                 
                    { key: "value", label: "Value", class: "text-center", sortable: true },                    
                    { key: "quantity", label: "Amount", class: "text-center", sortable: true },
                    { key: "actions", label: "Actions", class: "text-left"},   
                ],
                abilityFields : [
                    { key: "source", label: "Name", class: "text-left", sortable: true },                 
                    { key: "ability", label: "Description", class: "text-left", sortable: true },                    
                ],
                inventoryFields : [
                    { key: "name", label: "Name", class: "text-left", sortable: true },   
                    { key: "subCategory", label: "Class", class: "text-left", sortable: true},                 
                    { key: "qualityText", label: "Qualities", class: "text-left", sortable: true },                    
                    { key: "encumbrance", label: "Encumbrance", class: "text-center", sortable: true },                    
                ]
            },    
            character: {
                name: '',
                abilities : [],
                rolledBonus : [],
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
                    bonusSoak: 0,
                    bonusWounds: 0,
                    bonusStrain: 0,
                    bonusMeleeDefense: 0,
                    bonusRangedDefense: 0,
                    bonusAgility: 0,
                    bonusBrawn: 0,
                    bonusCunning: 0,
                    bonusIntellect: 0,
                    bonusPresence: 0,
                    bonusWillpower:0,
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
                    transactionLog: [],
                    items: [],
                    career: [],
                },
                talents: {
                    items: [],
                    transactionLog: [],
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
                        items: [],
                        armorWorn: {
                            name: "Common Clothing",
                            wornEncumbrance: 0,
                            encumbrance: 0,
                            defense: 0,
                            soak: 0
                        }
                    },
                    weapons: {              
                        items: []
                    },
                    gear: {
                        items: []
                    },                 
                    money: 500,
                    inventory: {
                        items: [],
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
            this.addRacialAbilities();
        },
        selectedCareer : function(newCareer){

            if(this.selectedRace != "" ) {
                this.assignRacialSkills();
            }            

            this.castActiveSkills();

            this.assignCareerSkills();
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
            this.castTalents();

            if(this.selectedRace != "" ) {
                this.assignRacialSkills();
            }            

            this.assignCareerSkills();
        }

    },   
    methods : { 
        getAllIndexesWithAttr (array, attr, value) {
            var indexes = [-1];
            
            for(var i = 0; i < array.length; i += 1) {
                                
                if(array[i][attr] === value) {
                                      
                    indexes.push(i);
                }
            }
            
            return indexes;
        },
        findWithAttr(array, attr, value) {
            
            for(var i = 0; i < array.length; i += 1) {
                
                if(array[i][attr] === value) {

                    return i;
                }
            }
            return -1;
        },
        specialTalent (talent, amount) {
            switch(talent.name) {
                case "Armor Master": 
                    this.character.stats.bonusSoak += (1 * amount);
                    break;

                case "Armor Master (Improved)":
                    if (this.character.equipment.armor.armorWorn.soak >= 2) {
                        this.character.stats.bonusMeleeDefense += (1 * amount);
                    }
                    break;

                case "Basic Military Training": 
                    var id = this.findWithAttr(this.character.skills.items, "name", "Athletics");
                    this.character.skills[id].isCareer = true;                    
                    
                    id = this.findWithAttr(this.character.skills.items, "name", "Ranged (Heavy)");
                    this.character.skills[id].isCareer = true;

                    id = this.findWithAttr(this.character.skills.items, "name", "Resilience");
                    this.character.skills[id].isCareer = true;
                    break;

                /*                
                Need to research how to implement.
                case "Burly": 
                    var newEnumRating = this.character.equipment.weapons.equipped.totalEncumbrance - (1 * amount);
                    
                    if (this.character.equipment.weapons.equipped.qualities[6].value > 0) {
                        var newCumbersomeRating = this.character.equipment.weapons.equipped.qualities[6].value - (1 * amount);
                    } else {
                        var newCumbersomeRating = 0;
                    }

                    if (newEnumRating < 1 ) {
                        this.character.equipment.weapons.equipped.totalEncumbrance = 1
                    } else {
                        this.character.equipment.weapons.equipped.totalEncumbrance = newEnumRating;
                    }

                    if (newCumbersomeRating < 1 && this.character.equipment.weapons.equipped.qualities[6].value > 0 ) {
                        this.character.equipment.weapons.equipped.qualities[6].value = 1;
                    }
                    
                    for(var j = 0; j < this.character.equipment.weapons.equipped.qualities.length; j++) {                                 
                        if(data[i].qualities[j].value > 0) {                    
                            if(["auto-fire", "knockdown", "reinforced"].indexOf(data[i].qualities[j].name) >= 0) {
                                //Don't give a rating.                    
                                d.qualityText += data[i].qualities[j].name  + ", "
                            } else {                        
                                d.qualityText += data[i].qualities[j].name + " " + data[i].qualities[j].value + ", ";         
                            }           
                        }
                    }
                    break;
                */

                case "Dedication":
                    this.showChararcteristicModal();
                    break;
                
                case "Defensive":
                    this.character.stats.bonusRangedDefense += (1 * amount);
                    this.character.stats.bonusMeleeDefense += (1 * amount);
                    break;

                case "Grit": 
                    this.character.stats.bonusStrain += (1 * amount);
                    break;
                    
                case "Toughened":
                    this.character.stats.bonusWounds += (2 * amount);
                    break;

                case "Vehicle Combat Training": 
                    var id = this.findWithAttr(this.character.skills.items, "name", "Gunnery");
                    this.character.skills[id].isCareer = true;                    
                    
                    id = this.findWithAttr(this.character.skills.items, "name", "Driving");
                    this.character.skills[id].isCareer = true;

                    id = this.findWithAttr(this.character.skills.items, "name", "Piloting");
                    this.character.skills[id].isCareer = true;
                    break;

                case "Well Read": 
                    this.showKnowledgeModal();
                    break;

                case "Well Rounded": 
                    this.showNoMagicSkillModal();
                    break;               
            }

            this.assignDerivedCharacteristics();
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
                        Tags: rowItem.tags,      
                        Description: rowItem.alternativeText,                       
                        Activation: rowItem.activation,                                                
                        Ranked: rowItem.ranked,
                        Sourcing: rowItem.sourcing,                         
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
        adjustArmorInventory (armor, amount, bonus=false) {
            
            console.log(armor);

            if (bonus) {
                armor.obtainedBy = "bonus";
            } else if (amount > 0) {
                armor.obtainedBy = "purchase";
            }

            this.inventoryAlert = false;

            var logicCheck = true;
            //to adjust the ending thinger
            var armorWornAdjustmentNumber = 0;

            var armorId = this.findWithAttr(this.character.equipment.armor.items, "name", armor.name);
            
            var newMoney = this.character.equipment.money - (armor.value * amount);

            if (!bonus && amount < 0 && armor.obtainedBy != "bonus") {
                newMoney = this.character.equipment.money;
            }

            if (amount > 0 || bonus === true) {
                //add
                if (newMoney >= 0 || bonus === true) {
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
                        this.inventoryTableRows = this.character.equipment.inventory.items.length;
                    }

                    //if there are any abilities, slap them in!
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", newArmor.id);
                    //it is always 1, because it starts with a -1. 
                    if (abilityIndexes.length > 1) {
                        //start off as one instead of 0, because [0] = -1...
                        for(var i = 1; i < abilityIndexes.length; i++) {        
                            
                            var ability = this.abilityData[abilityIndexes[i]];      

                            var a = this.findWithAttr(this.character.abilities, "source", ability.source);    

                            if (a <= 0) {
                                this.character.abilities.push(ability);
                                this.abilityTableRows = this.character.abilities.length;
                            }                            
                        }
                    }

                } else {
                    this.illegalLogic = "You do not have enough money for this!";
                    this.inventoryAlert = true;
                    logicCheck = false;
                    return;
                }
            } else {
                //removing armor
                if(armor.quantity === 1 && armor.name === this.character.equipment.armor.armorWorn.name) {
                    //this is the armor worn...so let's remove it.
                    //console.log(        "adjustArmorWorn()");
                    logicCheck = this.adjustArmorWorn();

                    if(logicCheck) {
                        var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", armor.id);
                        //it is always 1, because it starts with a -1. 
                        if (abilityIndexes.length > 1) {
                            //start off as one instead of 0, because [0] = -1...
                            for(var i = 1; i < abilityIndexes.length; i++) {        
                                
                                var ability = this.abilityData[abilityIndexes[i]];       
                                
                                var a = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         

                                //remove this ability if its the only one.
                                if (armor.quantity === 1) {
                                    this.character.abilities.splice(a, 1);  
                                    this.abilityTableRows = this.character.abilities.length;                                      
                                }                            
                            }
                        }
                    }

                } else if (armor.quantity > 0) {
                    
                    //console.log(        "remove armor from inventory");
                    //find the armor in inventory
                    var armorIndex = this.findWithAttr(this.character.equipment.inventory.items, "UUID", armor.UUID);
                    
                    if (armorIndex >= 0) {
                        //remove armor from inventory 
                        //console.log(            "(" + armorIndex + ")" + " remove armor from inventory");                        
                        this.character.equipment.inventory.items.splice(armorIndex, 1);
                        this.inventoryTableRows = this.character.equipment.inventory.items.length;

                        var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", armor.id);
                        //it is always 1, because it starts with a -1. 
                        if (abilityIndexes.length > 1) {
                            //start off as one instead of 0, because [0] = -1...
                            for(var x = 1; x < abilityIndexes.length; x++) {        
                                
                                var ability = this.abilityData[abilityIndexes[x]];       
                                
                                var a = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         

                                //remove this ability if its the only one.
                                if (armor.quantity === 1) {
                                    this.character.abilities.splice(a, 1);                                        
                                }                            
                            }
                        }

                    } else {
                        this.illegalLogic = "Oh this is awkward, couldn't find the item.";
                        this.inventoryAlert = true;
                        logicCheck = false;
                        return;
                    }
                    
                } else if (armor.quantity <= 0) {
                    this.illegalLogic = "Cannot take away something you don't have, knucklehead.";
                    this.inventoryAlert = true;
                    logicCheck = false;
                    return;
                }
            }

            if(logicCheck) {                                  
                
                if (amount < 0 ) {
                    //armor items are 0, so don't need to subtract further.
                    //console.log("   armorItem math:" + this.character.equipment.inventory.armorItems + (amount - armorWornAdjustmentNumber))
                    if (this.character.equipment.inventory.armorItems != 0) {
                        this.character.equipment.inventory.armorItems = this.character.equipment.inventory.armorItems + (amount - armorWornAdjustmentNumber); 
                    }                    
                } else {
                    this.character.equipment.inventory.armorItems = this.character.equipment.inventory.armorItems + (amount - armorWornAdjustmentNumber); 
                }

                if (!bonus) {
                    //adjust money.
                    this.character.equipment.money = newMoney;
                    //add tallies 
                    this.character.equipment.armor.items[armorId].quantity = this.character.equipment.armor.items[armorId].quantity + amount;
                }

            }    
            
            //encumberance, defense resets.
            this.assignDerivedCharacteristics();
            //console.log("Fininish armorItems: " + this.character.equipment.inventory.armorItems);
            //console.log("   ");       
        },
        adjustGearInventory (gear, amount, bonus=false) {
            
            if (bonus) {
                gear.obtainedBy = "bonus";
            } else if (amount > 0) {
                gear.obtainedBy = "purchase";
            }

            this.inventoryAlert = false;
            
            var logicCheck = true;

            var newMoney = this.character.equipment.money - (gear.value * amount);

            var gearIndex = this.findWithAttr(this.character.equipment.gear.items, "name", gear.name);

            if (amount > 0 || bonus === true) {    
                //can afford this.
                if (newMoney >= 0 || bonus === true) {
                    var g = gear;
                    g.repairNeeded = "None";
                    //incase we need to remove this later.
                    g.UUID = this.getUniqueId();
                    
                    //add gear.
                    this.character.equipment.inventory.items.push(g);                       
                    this.inventoryTableRows = this.character.equipment.inventory.items.length;
                    
                    //add abilities.
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", g.id);
                    
                    console.log(abilityIndexes);

                    if (abilityIndexes.length > 1) {
                                                
                        //start off as one instead of 0, because [0] = -1...
                        for(var x = 1; x < abilityIndexes.length; x++) {        
                            
                            var ability = this.abilityData[abilityIndexes[x]];      

                            var index = this.findWithAttr(this.character.abilities, "source", ability.source);
                            
                            if (index <= 0) {
                                this.character.abilities.push(ability);
                                this.abilityTableRows = this.character.abilities.length;
                            }                            
                        }
                    }

                }
                //can't afford it.
                else  {
                    this.illegalLogic = "You do not have enough money for this!";
                    this.inventoryAlert = true;
                    logicCheck = false;
                    return;
                }
            //removing item
            } else {
                if (gear.quantity === 0) {
                    this.illegalLogic = "Cannot take away something you don't have.";
                    this.inventoryAlert = true;
                    logicCheck = false;
                    return;                    
                } else {
                    var i = this.findWithAttr(this.character.equipment.inventory.items, "name", gear.name);                                    

                    if (i >= 0) {
                        
                        this.character.equipment.inventory.items.splice(i, 1);                        
                        this.inventoryTableRows = this.character.equipment.inventory.items.length; 
                                            
                        var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", gear.id);
                        //it is always 1, because it starts with a -1. 
                        if (abilityIndexes.length > 1) {
                            //start off as one instead of 0, because [0] = -1...
                            for(var z = 1; z < abilityIndexes.length; z++) {        
                                
                                var ability = this.abilityData[abilityIndexes[z]];       
                                
                                var index = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         

                                //remove this ability if its the only one.
                                if (gear.quantity === 1) {
                                    this.character.abilities.splice(index, 1);    
                                    this.abilityTableRows = this.character.abilities.length;                                    
                                }                            
                            }
                        }

                    } else {
                        this.illegalLogic = "How awkward...we couldn't find the item.";
                        this.inventoryAlert = true;
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

                if(!bonus) {
                    this.character.equipment.money = newMoney;
                    this.character.equipment.gear.items[gearIndex].quantity = this.character.equipment.gear.items[gearIndex].quantity + amount;
                } else {
                }

                this.assignDerivedCharacteristics();    
            }      
        },
        adjustWeaponInventory (weapon, amount, bonus=false) {
            
            if (bonus) {
                weapon.obtainedBy = "bonus";
            } else if (amount > 0) {
                weapon.obtainedBy = "purchase";
            }

            this.inventoryAlert = false;
            
            var logicCheck = true;

            var newMoney = this.character.equipment.money - (weapon.value * amount);

            if (!bonus && amount < 0 && weapon.obtainedBy != "bonus") {
                newMoney = this.character.equipment.money;
            }

            var weaponIndex = this.findWithAttr(this.character.equipment.weapons.items, "name", weapon.name);

            if (amount > 0 || bonus === true) {    
                //can afford this.
                if (newMoney >= 0 || bonus === true)  {
                    var w = weapon;
                    w.repairNeeded = "None";
                    //incase we need to remove this later.
                    w.UUID = this.getUniqueId();
                    
                    this.character.equipment.inventory.items.push(w);                      
                    this.inventoryTableRows = this.character.equipment.inventory.items.length;

                    //if there are any abilities, slap them in!
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", w.id);
                    //it is always 1, because it starts with a -1. 
                    if (abilityIndexes.length > 1) {
                        //start off as one instead of 0, because [0] = -1...
                        for(var x = 1; x < abilityIndexes.length; x++) {        
                            
                            var ability = this.abilityData[abilityIndexes[x]];      

                            var index = this.findWithAttr(this.character.abilities, "source", ability.source);    

                            if (index <= 0) {
                                this.character.abilities.push(ability);
                                this.abilityTableRows = this.character.abilities.length;
                            }                            
                        }
                    }
                }
                //can't afford it.
                else  {
                    this.illegalLogic = "You do not have enough money for this!";
                    this.inventoryAlert = true;
                    logicCheck = false;
                    return;
                }
            //removing item
            } else if (amount < 0) {
                if (weapon.quantity === 0) {
                    this.illegalLogic = "Cannot take away something you don't have.";
                    this.inventoryAlert = true;
                    logicCheck = false;
                    return;                    
                } else {
                    var i = this.findWithAttr(this.character.equipment.inventory.items, "name", weapon.name);                                    

                    if (i >= 0) {
                        
                        this.character.equipment.inventory.items.splice(i, 1);                       
                        this.inventoryTableRows = this.character.equipment.inventory.items.length;  
                        
                        var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", weapon.id);
                        //it is always 1, because it starts with a -1. 
                        if (abilityIndexes.length > 1) {
                            //start off as one instead of 0, because [0] = -1...
                            for(var z = 1; z < abilityIndexes.length; z++) {        
                                
                                var ability = this.abilityData[abilityIndexes[z]];       
                                
                                var index = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         

                                //remove this ability if its the only one.
                                if (weapon.quantity === 1) {
                                    this.character.abilities.splice(index, 1); 
                                    this.abilityTableRows = this.character.abilities.length;                                       
                                }                            
                            }
                        }

                    } else {
                        this.illegalLogic = "How awkward...we couldn't find the item.";
                        this.inventoryAlert = true;
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
                    this.character.equipment.inventory.weaponItems = this.character.equipment.inventory.weaponItems + amount; 
                }

                if(!bonus) {
                    this.character.equipment.money = newMoney;
                    this.character.equipment.weapons.items[weaponIndex].quantity = this.character.equipment.weapons.items[weaponIndex].quantity + amount;
                }        

                this.assignDerivedCharacteristics();    
            }            
        },
        adjustTalentTiering (talent, amount, bonus=false) {
            //turn off alert.
            this.xpAlert = false; 

            if (!this.rolledCareer) {
                this.illegalLogic = "Roll up a career bonus first.";
                this.xpAlert = true;
                return;
            }

            var talentOrigin = "";

            var index = this.findWithAttr(this.character.talents.items, "id", talent.id);

            var adjustedRank = this.character.talents.items[index].ranks + amount;

            var xpSpent = 0;     

            //will changed if its ranked.
            var newTier = talent.tier;

            var tli = newTier - 1;  

            //console.log(talent.tier);
            //console.log("this.character.talents.limitations"); 
            //console.log(this.character.talents.limitations);

            var tiersOwned = this.character.talents.limitations[tli].owned + amount;

            if (amount > 0) {
                if (bonus) {
                    //note as such, bonus talents do not skill up or down.
                    talent.origin = "bonus"
                } else {

                    if (adjustedRank > 1 && talent.ranked === "No") {
                        this.illegalLogic = "Can not increase talent further.";
                        this.xpAlert = true;
                        return;

                    } else if (adjustedRank > 5 && talent.ranked === "No" ) {
                        this.illegalLogic = "Can not increase talent further.";
                        this.xpAlert = true;
                        return;

                    } else if ( talent.tier > 1 && tiersOwned > this.character.talents.limitations[tli].limit ) {
                        //if its a tier 2, 3, 4, 5 and greater than the tier limit...
                        this.illegalLogic = "You can not buy into this tier.";
                        this.xpAlert = true;
                        return;
                    } else {

                        if (talent.ranked === "Yes") {
                            //tier 1 -> tier 2 for next purchase cost.
                            newTier = talent.tier + amount;
                        }      

                        xpSpent = (newTier * 5) * amount;
                    }

                }                 
                
                if(this.spendXP(xpSpent, "Talent")) {
                    //valid purchase
                    talent.origin = "purchase"
                  
                    var newTierDisplay = "Tier: " + newTier;
                    
                    var log = {
                        id: talent.id,
                        xp: xpSpent,
                        ranks: talent.ranks,
                        origin: talent.origin,
                        tier: talent.tier,
                        tierDisplay: talent.tierDisplay
                    }

                    this.character.talents.transactionLog.push(log);
                        
                    this.character.talents.items[index].tierDisplay = newTierDisplay;
                    this.character.talents.items[index].ranks += amount;
                    
                    if (talent.ranked === "Yes") {
                        this.character.talents.items[index].tier = newTier;
                    }

                    this.character.talents.limitations[tli].owned = tiersOwned;


                    //if there are any abilities, slap them in!
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", talent.id);
                    
                    //it is always 1, because it starts with a -1.                     
                    if (abilityIndexes.length > 1) {
                        //start off as one instead of 0, because [0] = -1...
                        for(var z = 1; z < abilityIndexes.length; z++) {        
                            
                            var ability = this.abilityData[abilityIndexes[z]];      

                            var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);    

                            if (abilityIndex <= 0) {
                                this.character.abilities.push(ability);
                                this.abilityTableRows = this.character.abilities.length;
                            }                            
                        }
                    }                

                    //update accordingly.
                    this.specialTalent(talent, amount);

                    this.setTalentTieringLimits();                    
                }

            }
            else {
                //looking for a refund!
                if (adjustedRank < 0) {
                    return;
                } else if ( talent.origin === "bonus" ) {
                    this.illegalLogic = "Can not take away a free talent.";
                    xpAlert = true;
                    return;

                } else {
                    
                    for(var l = 0; l < this.character.talents.transactionLog.length; l++) {

                        if (this.character.talents.transactionLog[l].id === talent.id) {

                            if (this.character.talents.transactionLog[l].ranks === adjustedRank) {
                                //this is the refund.
                                xpSpent = this.character.talents.transactionLog[l].xp * -1;   
                                this.character.talents.items[index].ranks = this.character.talents.transactionLog[l].ranks;
                                this.character.talents.items[index].origin = this.character.talents.transactionLog[l].origin;
                                this.character.talents.items[index].tierDisplay = this.character.talents.transactionLog[l].tierDisplay;
                                this.character.talents.items[index].tier = this.character.talents.transactionLog[l].tier;                                   
                                this.character.talents.transactionLog.splice(l,1);
                            }
                        }
                    }

                    if(this.spendXP(xpSpent, "talent")) {
                        var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", talent.id);
                        //it is always 1, because it starts with a -1. 
                        if (abilityIndexes.length > 1) {
                            //start off as one instead of 0, because [0] = -1...
                            for(var j = 1; j < abilityIndexes.length; j++) {        
                                
                                var ability = this.abilityData[abilityIndexes[j]];       
                                
                                var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         

                                //remove this ability if its the only one.
                                if (talent.ranks === 1) {
                                    this.character.abilities.splice(abilityIndex, 1);    
                                    this.abilityTableRows = this.character.abilities.length;                                    
                                }                            
                            }
                        }

                        this.setTalentTieringLimits();
                    }
                }                   
            }
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
        adjustSkillRank(skill, amount, bonus=false) {   
            
            //turn off alert.
            this.xpAlert = false;

            var skillOrigin = " ";

            var index = this.findWithAttr(this.character.skills.items, "id", skill.id);

            var adjustedRank = this.character.skills.items[index].ranks + amount;

            var xpSpent = 0;        

            if (!this.rolledCareer) {
                this.illegalLogic = "Roll up a career bonus first.";
                this.xpAlert = true;
                return;
            }

            if (amount > 0) {
                //we are making a purchase....
                if (bonus) {                    
                    //bonus can not place skills greater than 2 or anything of that nature.
                    //this is because that must be done FIRST.
                    skillOrigin = "bonus";
                } else {
                    if (adjustedRank > 2) {
                        this.illegalLogic = "Can't increase skills past two in character creation.";
                        this.xpAlert = true;
                        return;                    

                    } else if (skill.isRacial && skill.canBeFreebee) {
                        //the skill is a racial one and was chosen...
                        skillOrigin = "racial choice";
                        
                        //turn off the other skills that are racial.
                        for(var s = 0; s < this.character.skills.items.length; s++) {
                            
                            if (skill.abilityId === this.character.skills[s].abilityId && skill.id != this.character.skills[s].id) {
                                //if this is a racial choice and was not chosen, turn it off!
                                this.character.skills.items[s].canBeFreebee = false;
                                this.character.skills.items[s].isRacial = false;
                            }
                        }
                                                
                    } else if (skill.isCareer && this.character.skills.firstFour > 0 && adjustedRank === 1) {
                        //its a career skill and can be purchased for free.
                        skillOrigin = "first four";
                        this.character.skills.firstFour -= 1;

                    } else if (skill.isCareer) {
                        //usual cost.
                        skillOrigin = "purchase";
                        xpSpent = adjustedRank * 5;

                    } else {
                        skillOrigin = "purchase";
                        xpSpent = (adjustedRank * 5) + 5;                        
                    }
                }

                //Purchase and Log
                if(this.spendXP(xpSpent, "skill")) {

                    //make and push the log, to help with refunding and resets later.
                    var log = {
                        id: skill.id,
                        xp: xpSpent,
                        ranks: skill.ranks,
                        origin: skill.source
                    };
                    this.character.skills.transactionLog.push(log);

                    //record changes.
                    this.character.skills.items[index].ranks = adjustedRank;
                    this.character.skills.items[index].source = skillOrigin;

                    //if there are any abilities, slap them in!
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", this.character.skills.items[index].id);         
                    //it is always 1, because it starts with a -1.                     
                    if (abilityIndexes.length > 1) {
                        //start off as one instead of 0, because [0] = -1...
                        for(var z = 1; z < abilityIndexes.length; z++) {        
                            
                            var ability = this.abilityData[abilityIndexes[z]];      
                            
                            var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);
                            
                            if (abilityIndex <= 0) {
                                this.character.abilities.push(ability);
                                this.abilityTableRows = this.character.abilities.length;
                            }                            
                        }
                    }
                }
                else {
                    this.illegalLogic = "Didn't have the XP for this.";
                    this.xpAlert = true;
                    return;
                }
                             
            //so we're looking for a refund.
            } else {
                if (adjustedRank < 0) {
                        return;
                } else {

                    if (skill.isRacial || skill.source === "bonus") {
                        this.illegalLogic = "Can't take away from a racial or a bonus skill.";
                        xpAlert = true;
                        return;

                    } else if (skill.isCareer && skill.source != "first four") {
                        //career skill improvement.
                        xpSpent = skill.ranks * 5 * amount;

                    } else if (!skill.isCareer) {
                        xpSpent = ((skill.ranks * 5) + 5) * amount;
                    }

                    //keep an arary of indexes where the skill was purchased.
                    var logArray = []; 

                    for (var l = 0; l < this.character.skills.transactionLog.length; l++) {
                        //look at the transaction history
                        if (this.character.skills.transactionLog[l].id === skill.id) {
                            //skill matches
                            if (this.character.skills.transactionLog[l].ranks === skill.ranks) {
                                //this is the refund.                            
                                xpSpent = this.character.skills.transactionLog[l].xp *-1;    
                                
                                this.character.skills.items[index].source = this.character.skills.transactionLog[l].origin;
                                this.character.skills.items[index].ranks = this.character.skills.transactionLog[l].ranks;
                                
                                if (this.character.skills.transactionLog[l].origin === "first four") {
                                    this.character.skills.firstFour += 1;
                                }

                                //remove it from the log.
                                this.character.skills.transactionLog.splice(l,1);
                            } else {
                                //update skill's origin and source accordingly...
                                logArray.push(l);
                            }

                        }
                    }                   

                    if(this.spendXP(xpSpent, "skill")) {
                        //search for any stored abilities.
                        var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", this.character.skills.items[index].id);
                    
                        if (abilityIndexes.length > 1) {
                            //start off as one instead of 0, because [0] = -1...
                            for(var j = 1; j < abilityIndexes.length; j++) {        
                            
                                var ability = this.abilityData[abilityIndexes[j]];       
                            
                                var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         
                       
                                //remove this ability if its the only one.
                                if (skill.ranks === 0) {
                                    this.character.abilities.splice(abilityIndex, 1);    
                                    this.abilityTableRows = this.character.abilities.length;                                    
                                }                            
                            }
                        }                                                          
                    }
                }
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
                    this.inventoryTableRows = this.character.equipment.inventory.items.length;

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
        spendXP (amount, category) {
            
            var oldXP = this.character.xp.total;

            var newValue = 0;

            newValue = oldXP - amount
            if (newValue < 0){                     
                return false;
            }

            switch(category){
                case "skill":
                    this.character.xp.skillSpending += amount;
                    break;
                case "characteristic":                    
                    this.character.xp.characteristicSpending += amount;
                    break;
                case "talent":
                    this.character.xp.talentSpending += amount;
                    break;
                default:
                    break;
            }

            this.character.xp.totalSpent += amount;

            this.character.xp.total = newValue;       

            return true;
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
        onTalentFilter (filteredItems) {
            this.talentTableRows = filteredItems.length;
            this.talentsPage = 1;            
        },
        onSkillFilter (filteredItems) {
            this.skillTableRows = filteredItems.length;
            this.skillsPage = 1;            
        },
        onWeaponFilter (filteredItems) {
            this.weaponShopTableRows = filteredItems.length;
            this.weaponShopPage = 1;            
        },
        onGearFilter (filteredItems) {
            this.gearShopTableRows = filteredItems.length;
            this.gearShopPage = 1;            
        },
        onAbilityFilter (filteredItems) {
            this.abilityTableRows = filteredItems.length;
            this.abilityPage = 1;           
        },
        onInventoryFilter (filteredItems) {
            this.inventoryTableRows = filteredItems.length;
            this.inventoryPage = 1;           
        },
        colorSkillRows () {

        },
        cleanSkills (clearRacial = false, clearBonus = false) {

            console.log("before purge");
            console.log(this.character.skills.transactionLog);
            //clean out attributes (non-bonus)
            //clean out purchase history 
            //reset row color

            var skill = [];
            skill._rowVariant = null;
            var log = [];
            var xpSpent = 0;
            var shouldRemove = true;

            for (var i = 0; i < this.character.skills.items.length; i ++) {

                skill = this.character.skills.items[i];
                
                //refund xp, work backwards to skill rank 0.
                var logIndices = this.getAllIndexesWithAttr(this.character.skills.transactionLog, "id", skill.id);  
                var spliceIndices = [];
                
                if (logIndices.length > 1) {        

                    //work from the most recent and work your way down son.
                    for(var l = logIndices.length-1; l > 0; l-- ) {
                        console.log("var l = " + l);
                        log = this.character.skills.transactionLog[logIndices[l]];
                        
                        if (log.origin === 'bonus' && clearRacial === false) shouldRemove = false;    
                        if (log.origin === 'racial choice' && clearRacial === false) shouldRemove = false;    
                        
                        if ( shouldRemove )  {
                            //go ahead and reset the racial.
                            console.log("OMG I'M DOING SOMETHING!!! " + skill.name + " " + skill.ranks);
                            skill.ranks = log.ranks;
                            skill.origin = log.origin;
                            this.character.xp.total += log.xp;
                            this.character.xp.skillSpending -= log.xp;
                            this.character.xp.totalSpent -= log.xp;
                            //cut later.
                            spliceIndices.push(l);
                            this.character.skills.items[i] = skill;
                        }                                                   
                    }
                }   

                //note how skill has changed from log. 
                
                if (skill.source === 'bonus' && clearRacial === false) shouldRemove = false;    

                if (skill.source === 'racial choice' && clearRacial === false) shouldRemove = false;  

                if (shouldRemove) {
                    //remove abilities
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", skill.id);

                    if (abilityIndexes.length > 1) {
                        //start off as one instead of 0, because [0] = -1...
                        for(var j = 1; j < abilityIndexes.length; j++) {        
                    
                            var ability = this.abilityData[abilityIndexes[j]];       
                    
                            var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         
                                            
                            this.character.abilities.splice(abilityIndex, 1);
                            this.abilityTableRows = this.character.abilities.length;                            
                        }
                    }

                }

                for(var z = 0; z < spliceIndices.length; z++) {
                    this.character.skills.transactionLog.splice(z, 1);
                }
                
            }
            console.log("after purge");
            console.log(this.character.skills.transactionLog);
        },
        assignRacialSkills () {

            /*

            //any previous racial data cleared.
            for (var i = 0; i < this.character.skills.items.length; i ++){
                if(this.character.skills.items[i].isRacial) {
                    //clears out the Arisen, Human variants
                    this.character.skills.items[i]._rowVariant = null;
                    this.character.skills.items[i].rank = 0;
                    this.character.skills.items[i].isFreebee = false;
                    this.character.skills.items[i].canBeFreebee = false;                
                }
            }

            if(this.selectedRace === "Arisen") {
                for (var i = 0; i < this.character.skills.items.length; i ++){
                    if(["Knowledge: Mortality", "Knowledge: Natural","Knowledge: Paranormal","Knowledge: Systems"].indexOf(this.character.skills.items[i].name) >=0) {   
                        this.character.skills.items[i]._rowVariant = "warning";
                        this.character.skills.items[i].canBeFreebee = true;
                        this.character.      
                    }
                }
            }

            if(this.selectedRace === "Elf") {
                for (var i = 0; i < this.character.skills.items.length; i ++){
                    if(this.character.skills.items[i].name === "Perception") {
                        this.character.skills.items[i]._rowVariant = "dark";
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
                        this.character.skills.items[i]._rowVariant = "dark";
                        this.character.skills.items[i].rank = 1;
                        this.character.skills.items[i].isFreebee = true;
                        this.character.skills.items[i].sourceType = "racial";
                        this.character.skills.items[i].sourceName = "I Hit Things";
                    }
                }
            }
        */
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
        grantCareerBoost() {
            
            if(this.rolledCareer) {
                alert("can't roll again!");
                return;
            }
            
            var roll = Math.floor(Math.random() * 20) + 1;            
            var index = 0;
            this.rolledCareer = true;

            var gear = [];
            var talent = [];
            var weapon = [];
            var armor = [];
            var skill = [];

            switch(this.selectedCareer) {
                case "Arcanist":
                    switch(roll) {
                        case 1:
                        case 2: 
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G12");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);                            
                            break;
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            index = this.findWithAttr(this.character.talents.items, "id", "T305");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);                            
                            break;
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            index = this.findWithAttr(this.character.talents.items, "id", "T35");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);                            
                            break;
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T151");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);                            
                            break;
                        case 13:
                        case 14:
                            index = this.findWithAttr(this.character.talents.items, "id", "T220");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);                            
                            break;
                        case 15:
                        case 16:                            
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G10");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);                            
                            break;
                        case 17:
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G23");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);                            
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G15");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);                            
                            break;
                    }     
                    break;               
                case "Aristocrat":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G12");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            this.character.equipment.money += 150;
                            break;
                        case 11:
                        case 12:
                        case 13:
                            index = this.findWithAttr(this.character.talents.items, "id", "T254");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T104");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T55");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A6");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            break;
                    }     
                    break;              
                case "Druid":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                            index = this.findWithAttr(this.character.talents.items, "id", "T254");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            index = this.findWithAttr(this.character.talents.items, "id", "T254");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T309");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 13:                            
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T104");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 16:
                        case 17:
                            index = this.findWithAttr(this.character.talents.items, "id", "T254");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T55");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A5");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            break;
                    }     
                    break;             
                case "Emissary":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A3");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            break;
                        case 6:
                        case 7:
                            index = this.findWithAttr(this.character.talents.items, "id", "T211");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 8:
                        case 9:
                        case 10:
                            index = this.findWithAttr(this.character.talents.items, "id", "T105");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 11:
                        case 12:
                        case 13:  
                            index = this.findWithAttr(this.character.talents.items, "id", "T87");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);      
                            break;                    
                        case 14:
                        case 15:
                        case 16:
                            index = this.findWithAttr(this.character.talents.items, "id", "T214");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 17:
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T41");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.skills.items, "id", "S62");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            break;
                    }     
                    break;   
                case "Infantry":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W40");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A3");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            break;
                        case 13:                                     
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W14");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);           
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W22");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);  
                            break;
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W38");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W33");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                    }     
                    break;    
            
                case "Knight":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G5");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 5, true);
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G12");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G14");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;
                        case 10:
                        case 11:
                            index = this.findWithAttr(this.character.talents.items, "id", "T254");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 12:
                        case 13:   
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W10");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true); 
                            break;                                   
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W24");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true); 
                            break; 
                        case 16:
                        case 17:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W34");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W21");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A6");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            break;
                    }     
                    break;                                
                case "Lost One":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G11");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 5, true);
                            break;
                        case 7:
                        case 8:
                        case 9:                            
                        case 10:
                            index = this.findWithAttr(this.character.talents.items, "id", "T206");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            break;
                        case 11:
                        case 12:
                        case 13:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T257");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true); 
                            break;                                
                        case 14:
                        case 15: 
                        case 16:
                        case 17:
                            index = this.findWithAttr(this.character.talents.items, "id", "T118");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true); 
                            break;  
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W8");
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W25");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                    }   
                    break;    
                case "Magus":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W16");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W22");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 9: 
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W10");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);   
                            break;                        
                        case 10:
                        case 11:
                        case 12:
                        case 13:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T87");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            break;                               
                        case 14:
                        case 15: 
                        case 16:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A1");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            break;
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T333");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            break;         
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W25");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                    }
                    break;
                case "Medic":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                            index = this.findWithAttr(this.character.skills.items, "id", "S79");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            index = this.findWithAttr(this.character.talents.items, "id", "T325");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            break;
                        case 9:                          
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T262");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            break;
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T151");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            break; 
                        case 16:
                        case 17: 
                        case 18:         
                        case 19:
                            this.character.xp.bonus += 5;       
                            break;
                        case 20:
                            this.character.xp.bonus += 10;  
                            break;
                    }
                    break;
                case "Operator":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G11");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 5, true);
                            break;
                        case 7:
                        case 8:
                        case 9:    
                            index = this.findWithAttr(this.character.talents.items, "id", "T46");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;                    
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W29");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T152");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            break;
                        case 16:
                        case 17: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T187");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            break;
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T284");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            break;     
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W25");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                    }
                    break;
                case "Raider":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                        case 5:
                        case 6:    
                            index = this.findWithAttr(this.character.talents.items, "id", "T221");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;   
                        case 7:
                        case 8:
                        case 9:        
                            index = this.findWithAttr(this.character.talents.items, "id", "T333");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;            
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W5");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W22");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T216");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            break;
                        case 16:
                        case 17: 
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W6");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T222");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            break; 
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W11");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                    }
                    break;    
                case "Refugee":
                    switch(roll) {
                        case 1:
                        case 2: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T342");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 3:
                        case 4:
                            index = this.findWithAttr(this.character.talents.items, "id", "T151");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 5:
                        case 6:    
                            index = this.findWithAttr(this.character.skills.items, "id", "S37");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            break;
                        case 7:
                        case 8: 
                            this.character.xp.bonus += 5;
                            break;
                        case 9:               
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G11");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;
                        case 13:                                  
                        case 14:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G5");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 5, true);
                            break;
                        case 15:
                        case 16:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A2");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 5, true);
                            break;
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W26");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 20:
                            this.character.xp.bonus += 10;
                            break;
                    }
                    break;    
                case "Shaman":
                    switch(roll) {
                        case 1:
                        case 2:  
                        case 3:
                        case 4:
                            index = this.findWithAttr(this.character.skills.items, "id", "S17");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            break;
                        case 5:
                        case 6:    
                        case 7:
                            index = this.findWithAttr(this.character.talents.items, "id", "T41");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 8: 
                        case 9:               
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T309");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T315");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 16:
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T122");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 20:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G16");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;
                    }
                    break;     
                case "Storm Trooper":
                    switch(roll) {
                        case 1:
                        case 2:  
                        case 3:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W34");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 4:
                        case 5:
                        case 6: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T152");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;    
                        case 7:
                        case 8: 
                        case 9:   
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W13");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W22");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;            
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T256");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.equipment.weapon.items, "id", "W28");
							weapon = this.character.equipment.weapon.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break; 
                        case 16:
                        case 17: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T257");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break; 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.skills.items, "id", "S17");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A4");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 5, true);
                            break;
                    }
                    break;      
                case "Warlock":
                    switch(roll) {
                        case 1:
                        case 2:  
                        case 3:
                            index = this.findWithAttr(this.character.talents.items, "id", "T214");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;  
                        case 4:
                        case 5:
                            index = this.findWithAttr(this.character.talents.items, "id", "T5");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;  
                        case 6:  
                        case 7:
                            index = this.findWithAttr(this.character.talents.items, "id", "T192");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;    
                        case 8: 
                        case 9:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T3");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;              
                        case 10:
                        case 11:
                        case 12:
                        case 13: 
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G10");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;                                 
                        case 14:
                        case 15:
                        case 16:
                            index = this.findWithAttr(this.character.talents.items, "id", "T216");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;  
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A5");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 5, true);
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G18");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;  
                    }
                    break;      
                case "Worker":
                    switch(roll) {
                        case 1:
                        case 2:  
                            this.character.xp.bonus += 5;
                            break;
                        case 3:
                        case 4:
                        case 5:   
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G1");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 2, true);
                            break;   
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G2");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;  
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G3");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;                          
                        case 6: 
                        case 7:                            
                        case 8: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T216");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;  
                        case 9:   
                        case 10:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G18");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            break;  
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T299");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;  
                        case 13:                              
                        case 14:
                            index = this.findWithAttr(this.character.talents.items, "id", "T187");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;  
                        case 15:
                        case 16:
                        case 17: 
                        case 18:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T203");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            break;        
                        case 19:
                        case 20:
                            this.character.xp.bonus += 10;
                            break;
                    }
                    break;                                                                          
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
            var altRules = this.selectedAlternativeRules;
            altRules.push("Default");
            
            const skillList = [];

            for (var i = 0; i < this.skillData.length; i ++) {
                
                var n = this.skillData[i].genres.search(this.selectedGenre);                      
                var a = altRules.indexOf(this.skillData[i].alternativeRules);

                if (n >= 0 && a >=0) {
                    var s = {
                        id: this.skillData[i].id,
                        name: this.skillData[i].skill,
                        ranks: 0,    
                        description: this.skillData[i].description,
                        isCareer: false,
                        isRacial: false,                    
                        isFreebee: false,               
                        canBeFreebee: false,
                        abilityId: "",
                        _rowVariant: null           
                    };          
                                    
                    skillList.push(s);
                }                
            }
            
            this.character.skills.items = skillList;
            this.skillTableRows = skillList.length;

        },
        castTalents () {

            //add default
            var altRules = this.selectedAlternativeRules;
            altRules.push("Default"); 

            const talentList = [];

            for (var i = 0; i < this.talentGenreData.length; i ++) {            

                var n = this.talentGenreData[i].genres.search(this.selectedGenre);                      
                var a = altRules.indexOf(this.talentGenreData[i].alternativeRules);

                if (n >= 0 && a >= 0) {

                    var x = this.findWithAttr(this.talentData, "id", this.talentGenreData[i].id);

                    if( x >= 0) {
                        var t = {
                            id: this.talentData[x].id,
                            name: this.talentData[x].name,                        
                            tierDisplay: this.talentData[x].tierDisplay,
                            rankDisplay: this.talentData[x].rankedDisplay,
                            activation: this.talentData[x].activation,
                            tier: this.talentData[x].tier,                                                                        
                            ranked: this.talentData[x].isRanked,
                            description: this.talentData[x].alternativeText,
                            sourcing: this.talentData[x].sourcing,
                            tags: this.talentData[x].tags,     
                                
                            originalTier: this.talentData[x].originalTier,
                            origin: " ",                        
                            ranks: 0
                        };

                        talentList.push(t);
                    }
                }
            }

            this.character.talents.items = talentList;
                            
            this.talentTableRows = this.character.talents.items.length;

            this.setTalentTieringLimits();
        },
        addRacialAbilities () {
                               
            var racialIndex = this.findWithAttr(this.raceData, "name", this.selectedRace);

            var raceId = this.raceData[racialIndex].id;

            ///if there are any abilities, slap them in!
            var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", raceId);
            //it is always 1, because it starts with a -1. 
            if (abilityIndexes.length > 1) {
                //start off as one instead of 0, because [0] = -1...
                for(var x = 1; x < abilityIndexes.length; x++) {        
                    
                    var ability = this.abilityData[abilityIndexes[x]];      

                    var index = this.findWithAttr(this.character.abilities, "source", ability.source);    

                    if (index <= 0) {
                        this.character.abilities.push(ability);
                        this.abilityTableRows = this.character.abilities.length;
                    }                            
                }
            }
        }
    },
    created() {
        this.selectedGenre === "After Seven";
        this.raceData = require('../data/race.json');
        this.careerData = require('../data/careers.json');
        this.skillData = require('../data/skills.json');
        this.talentData = require('../data/talents.json');
        this.talentGenreData = require('../data/talentGenres.json');
        this.armorData = require('../data/armor.json');
        this.weaponData = require('../data/weapons.json');
        this.gearData = require('../data/gear.json');     
        this.abilityData = require('../data/abilities.json');                     

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
                    id: this.skillData[i].id,
                    name: this.skillData[i].skill,
                    ranks: 0,    
                    description: this.skillData[i].description,
                    isRacial: false,                    
                    isCareer: false,
                    isFreebee: false,               
                    canBeFreebee: false, 
                    abilityId: "",
                    _rowVariant: null           
                };          
                                
                skillList.push(s);
            }
            
        }

        this.character.skills.items = skillList;

        this.skillTableRows = skillList.length;

        const talentList = [];

        for (var i = 0; i < this.talentGenreData.length; i ++) {            

            var n = this.talentGenreData[i].genres.search(this.selectedGenre);                      
            var a = altRules.indexOf(this.talentGenreData[i].alternativeRules);

            if (n >= 0 && a >= 0) {

                var x = this.findWithAttr(this.talentData, "id", this.talentGenreData[i].id);

                if( x >= 0) {

                    var t = {
                        id: this.talentData[x].id,
                        name: this.talentData[x].name,                        
                        tierDisplay: this.talentData[x].tierDisplay,
                        rankDisplay: this.talentData[x].rankedDisplay,
                        activation: this.talentData[x].activation,
                        tier: this.talentData[x].tier,                                                                        
                        ranked: this.talentData[x].isRanked,
                        description: this.talentData[x].alternativeText,
                        sourcing: this.talentData[x].sourcing,
                        tags: this.talentData[x].tags,
 
                        originalTier: this.talentData[x].originalTier,
                        origin: " ",             
                        ranks: 0
                    };

                    talentList.push(t);
                }
            }
        }

        this.character.talents.items = talentList;

        this.talentTableRows = this.character.talents.items.length;

        this.setTalentTieringLimits();

        const armorList = [];

        for(var i = 0; i < this.armorData.length; i++) {
            var armor = this.armorData[i];
            armor.quantity = 0;
            armor.qualityText = "";      
            armor._showDetails = false;     
            armor.hasSpecials = true;       
            armor.hasQualities = true;    
            armor.itemType = "armor";
            armor.obtainedBy = " ";

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
            weapon.obtainedBy = " ";

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
            gear.obtainedBy = " ";

            if(this.gearData[i].specialAbilities === "undefined") {
            } else {
                gear.hasSpecials = true;
            }

            gearList.push(gear);
        }

        this.character.equipment.gear.items = gearList;   

        this.gearShopTableRows = gearList.length;

        console.log(this.character.talents.items[0]);

    }    
}
</script>