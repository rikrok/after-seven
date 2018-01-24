<template>    
    <div class="col-sm-12 p-3">
        <h1> Character Generator </h1>
        <b-container class="p-3">
            <b-row class="text-right">
                <b-col>
                    <b-btn variant="success"> Export as JSON </b-btn>
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
                    <b-btn variant="dark" v-if="this.selectedGenre === 'After Seven'" size="sm" @click.stop="randomRollASFluff"> Random Roll Race, Career, Faction </b-btn>
                
                    <b-btn variant="dark" v-if="this.selectedGenre === 'After Seven'" size="sm" @click.stop="grantCareerBoost"> Roll for Career Bonus </b-btn>
                
                    <div v-if="this.character.bonusGiven != ''"  class="text-muted text-left"> <strong> After Seven Career Bonus: </strong> {{this.character.bonusGiven}} </div>
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
                <b-col> <b-form-select v-model="selectedRace" :options="this.sheet.selectableRaces" class="mb-3"/> </b-col>

                <b-col>  <b-form-select v-model="selectedCareer" :options="this.sheet.selectableCareers" class="mb-3"/> </b-col>

                <b-col v-if="selectedGenre === 'After Seven'"> <b-form-select v-model="selectedFaction" :options="this.sheet.possibleFactions" class="mb-3"/> </b-col>

            </b-row>
            <b-row> <b-col> <hr> </b-col> </b-row>
            <b-row>
                <b-col> <b-btn variant="dark" size="sm" @click.stop="randomRollMotivation"> Random Roll Motivations </b-btn> </b-col>
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
                

        </b-container>        
        <hr>
        <p> </p>
        <b-check v-model="showCharacteristics" value="on" unchecked-value="off"> Show Characteristics? </b-check>

        <h2 v-if="showCharacteristics === 'on'"> <strong> Characteristics </strong> </h2>
        <p> </p>
  
        <b-container class="p-3" v-if="showCharacteristics === 'on'" style="border:1px solid #cecece;">
            <b-row>
                <b-col> <b-alert :show="characteristicAlert" dismissible @dismissed="characteristicAlert=false" variant="warning"> {{ this.illegalLogic }} </b-alert> </b-col>                        
            </b-row>

            <b-row>                
                <b-col>
                    <b-container> 
                        <b-row>
                            <b-col>
                                <b-table small striped bordered responsive="sm" class="text-left" :items="this.character.stats.characteristics" :fields="this.sheet.characteristicFields">
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
                                <b-table small striped bordered responsive="sm" class="text-left" :items="this.character.stats.derivedCharacteristics" :fields="this.sheet.derivedCharacteristicFields"/>                              
                            </b-col>
                        </b-row>         
                    </b-container>                   
                </b-col>

                <b-col>
                    <b-container class="text-left">       
                        <b-row class="pb-2"> <b-col> <strong> Experience and $$$ Tracker </strong> </b-col> </b-row>
                                                
                        <b-row>                
                            <b-col> <strong>Total XP</strong> </b-col>
                            <b-col> {{ this.character.xp.total }} </b-col>
                        </b-row>
                        
                        <b-row class="text-muted">
                            <b-col> Spent XP </b-col>
                            <b-col> {{ this.character.xp.totalSpent }} </b-col>                        
                        </b-row>

                        <b-row class="text-muted">
                            <b-col> Starting XP </b-col>
                            <b-col> {{ this.character.xp.starting }} </br> </b-col>
                        </b-row>

                        <b-row class="pt-2">
                            <b-col > Bonus XP </b-col>
                            <b-col > <b-form-input v-model="bonusXp" type="number" size="sm"/> </b-col>                            
                        </b-row>

                        <b-row class="pt-3">
                            <b-col > Money </b-col>
                            <b-col > <b-form-input v-model="character.equipment.money" type="number" size="sm"/> </b-col>                            
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
            <b-row class="col-12">
                    <b-col>
                        <b-form-checkbox id="skillCheckBox" v-model="skillTableMode" value="on" unchecked-value="off"> Show Skills </b-form-checkbox>
                    </b-col> 
                    <b-col> <strong> Free Skills: </strong> {{ this.character.skills.freebees }} </b-col>
                    <b-col> <strong> Free Non-Career Skills: </strong> {{ this.character.skills.noncareerfreebees }} </b-col>
                    <b-col> <strong> Remaining Free Career Skills: </strong> {{ this.character.skills.firstFour }} </b-col>
                    <b-col> <strong> Remaining XP: </strong> {{ this.character.xp.total }} </b-col>
                    <b-col>
                        <b-form-checkbox id="talentCheckBox" v-model="talentTableMode" value="on" unchecked-value="off"> Show Talents </b-form-checkbox>
                    </b-col>
                </b-row>
            <b-row>
                <b-col>
                    <b-container>                                    
                        <b-row>
                            <b-col>                                                                            
                                <b-btn v-if="skillTableMode === 'on'" v-on:click="cleanSkills(false, false)" variant="warning" size="sm"> Reset Skills </b-btn>                                
                                <b-btn v-if="talentTableMode === 'on'" v-on:click="cleanTalents(false, false)" variant="warning" size="sm"> Reset Talents </b-btn>
                                <p> </p>
                            </b-col>                                
                        </b-row>
                        
                        <b-row>
                            <b-col v-if="skillTableMode === 'on'">
                                <b-table responsive small striped class="text-left" :items="this.sheet.skillLegend" :fields="this.sheet.skillLegendFields"/>
                            </b-col>
                            <b-col v-if="talentTableMode === 'on'">
                                <b-table class="text-left" small striped :items="this.character.talents.limitations"/>
                            </b-col>
                        </b-row>    

                        <b-row>
                            <b-col>
                                <b-alert :show="xpAlert" dismissible @dismissed="xpAlert=false" variant="warning"> {{ this.illegalLogic }} </b-alert>                        
                            </b-col> 
                        </b-row>
                        <b-row> <hr> </b-row>
                        
                        <b-row id="skillAndTalentGrids" >
                            <b-col v-if="skillTableMode === 'on'" id="skillGrid" cols="5"> 
                                <b-container>
                                    <b-row v-if="skillTableMode === 'on'">                                        
                                        <b-col> <b-form-input v-model="skillFilter" placeholder="Type to Search" /> </b-col>

                                        <b-col>
                                            <b-input-group-button> 
                                                <b-btn :disabled="!skillFilter" @click="skillFilter = ''"> Clear </b-btn>
                                            </b-input-group-button>
                                        </b-col>
                                    </b-row>      
                                    <b-row v-if="skillTableMode === 'on'" >
                                        <b-col>
                                            <p> </p>
                                            <b-table                  
                                                responsive="sm" small outlined striped class="text-left" :filter="skillFilter" @filtered="onSkillFilter" :items="this.character.skills.items"
                                                    :fields="this.sheet.skillFields" :per-page="skillsPerPage" :current-page="skillsPage">
                                                <template slot="actions" slot-scope="row">                                                   
                                                    <b-btn size="sm" variant="danger" v-on:click.stop="removeSkillRank(row.item, -1, false)"> - </b-btn>
                                                    <b-btn size="sm" variant="success" v-on:click.stop="adjustSkillRank(row.item, 1, false)"> + </b-btn>                                
                                                </template>    
                                            </b-table>
                                        </b-col>
                                    </b-row>

                                    <b-row v-if="skillTableMode === 'on'">
                                        <b-col> <b-pagination size="sm" :total-rows="this.skillTableRows" :per-page="skillsPerPage" v-model="skillsPage" /> </b-col>
                                    </b-row>

                                </b-container>
                            </b-col>

                            <b-col v-if="talentTableMode === 'on'">
                                <b-container >
                                    <b-row v-if="talentTableMode === 'on'">
                                        <b-col> <b-form-input v-model="talentFilter" placeholder="Type to Search" /> </b-col>

                                        <b-col>
                                            <b-input-group-button> 
                                                <b-btn :disabled="!talentFilter" @click="talentFilter = ''"> Clear </b-btn>
                                            </b-input-group-button>
                                        </b-col>
                                    </b-row>                              
                                    
                                    <b-row v-if="talentTableMode === 'on'">
                                        <b-col>
                                            <p> </p>
                                            <b-table responsive="sm" small outlined striped class="text-left" :filter="talentFilter" @filtered="onTalentFilter" 
                                                :items="this.character.talents.items" :fields="this.sheet.talentFields" :per-page="talentsPerPage" :current-page="talentsPage">        
                                                    <template slot="details" slot-scope="row"> {{row.item.tierDisplay}} {{row.item.name}} </template>
                                                    <template slot="actions" slot-scope="row">
                                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'talent')" variant="secondary"> ? </b-btn>                                
                                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustTalentTiering(row.item, -1, false)"> - </b-btn>
                                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustTalentTiering(row.item, 1, false)"> + </b-btn>                                
                                                    </template>    
                                            </b-table>
                                        </b-col>
                                    </b-row>
                                    <b-row v-if="talentTableMode === 'on'">
                                        <b-col> <b-pagination size="sm" :total-rows="this.talentTableRows" :per-page="talentsPerPage" v-model="talentsPage" /> </b-col>
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
        <h2 v-if="abilityMode === 'on' && inventoryMode === 'on'"> <strong>  Inventory and Abilities </strong> </h2>
        <h2 v-if="abilityMode === 'off' && inventoryMode === 'on'"> <strong> Inventory </strong> </h2>
        <h2 v-if="abilityMode === 'on' && inventoryMode === 'off'"> <strong> Abilities </strong> </h2>
        <b-container class="p-0" style="border:1px solid #cecece;">
            <b-row> 
                <b-col> <b-form-checkbox id="inventoryModeCheckBox" v-model="inventoryMode" value="on" unchecked-value="off"> Inventory </b-form-checkbox> </b-col> 
                <b-col> <b-form-checkbox id="abilityModeCheckBox"  v-model="abilityMode" value="on" unchecked-value="off"> Abilities </b-form-checkbox> </b-col>
            </b-row>

            <b-row> <b-col> </b-col> </b-row>

            <b-row v-if="inventoryMode ==='on'">
                <b-container>
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
                            <b-table responsive="sm" small outlined striped class="text-left" caption-top :filter="inventoryFilter" @filtered="onInventoryFilter" 
                                :per-page="inventoryPerPage" :current-page="inventoryPage" :items="this.character.equipment.inventory.items" 
                                :fields="this.sheet.inventoryFields">
                                    <template slot="table-caption"> Highlighted rows indicate equipped items. </template>
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'inv')" variant="secondary"> ? </b-btn>                                
                                        <b-btn size="sm" variant="warning" v-on:click.stop="removeFromLoadOut(row.item)"> - </b-btn>
                                        <b-btn size="sm" variant="primary" v-on:click.stop="addToLoadout(row.item, row.item.category)"> + </b-btn>                                
                                    </template>
                                    <template slot="remove" slot-scope="row">
                                        <b-btn size="sm" variant="danger" @click.stop="adjustInventory(row.item)"> x </b-btn>                                
                                    </template>   
                            </b-table>
                        </b-col>
                    </b-row>
                                            
                    <b-row>
                        <b-col>
                            <b-pagination size="sm" :total-rows="this.inventoryTableRows" :per-page="inventoryPerPage" v-model="inventoryPage" />                        
                        </b-col>
                    </b-row>
                </b-container>                     
            </b-row>  
            <b-row v-if="abilityMode ==='on'" class="text-left p-3"> <b-col> <h4> Abilities </h4> </b-col> </b-row>
            <b-row v-if="abilityMode ==='on'">
                <b-col> 
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
                                <b-table responsive="sm" small outlined striped class="text-left" :filter="abilityFilter" @filtered="onAbilityFilter" :per-page="abilityPerPage"
                                    :current-page="abilityPage" :items="this.character.abilities" :fields="this.sheet.abilityFields"/>                                
                            </b-col>                   
                        </b-row>

                        <b-row>
                            <b-col>
                                <b-pagination size="sm" :total-rows="this.abilityTableRows" :per-page="abilityPerPage" v-model="abilityPage" />                        
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
                    <b-form-checkbox id="armorShopModeCheckBox" v-model="armorShopMode" value="on" unchecked-value="off"> Show Armor Shop </b-form-checkbox>
                </b-col> 
                <b-col>
                    <b-form-checkbox id="weaponShopModeCheckBox" v-model="weaponShopMode" value="on" unchecked-value="off"> Show Weapon Shop </b-form-checkbox>
                </b-col> 
                <b-col>
                    <b-form-checkbox id="gearhopModeCheckBox" v-model="gearShopMode" value="on" unchecked-value="off"> Show Gear Shop </b-form-checkbox>
                </b-col> 
            </b-row>
            <b-row>
                <b-col> Current Encumbrance: {{ this.character.stats.derivedCharacteristics[0].value }}  </b-col>
                <b-col> Encumbrance Capacity: {{ this.character.stats.derivedCharacteristics[1].value }}  </b-col>
                <b-col> Money: {{ this.character.equipment.money }}  </b-col>
            </b-row>
   
            <b-row>
                <b-col>
                    <b-alert :show="inventoryAlert" dismissible @dismissed="inventoryAlert=false" variant="warning"> {{ this.illegalLogic }} </b-alert>     
                </b-col>
            </b-row>
            <hr>
            <b-row id="inventoryGrid">
                <b-col>
                    <b-container>
                        <b-row v-if="armorShopMode === 'on'"> <b-col> <h4 class="text-left"><strong> Armor </strong> </h4> </b-col> </b-row>
                        <b-row id ="armorGrid" v-if="armorShopMode === 'on'">
                            <b-col>
                                <b-table responsive="sm" small outlined striped :filter="weaponFilter" :items="this.character.equipment.armor.items" 
                                    :fields="this.sheet.armorFields" >                                                                    
                                    <template slot="actions" slot-scope="invRow">
                                        <b-btn size="sm" variant="secondary" @click.stop="showSomeModal(invRow.item, 'armor')" > ? </b-btn>                                
                                        <b-btn id="removeArmor" size="sm" variant="danger" @click.stop="adjustArmorInventory(invRow.item, -1)"> - </b-btn>
                                        <b-btn id="addArmor" size="sm" variant="success" @click.stop="adjustArmorInventory(invRow.item, 1)"> + </b-btn>                                
                                    </template>    
                                </b-table>
                            </b-col>
                        </b-row>
                        <hr v-if="weaponShopMode === 'on'"> 

                        <b-row v-if="weaponShopMode === 'on'"> <b-col> <h4 class="text-left"><strong> Weapons </strong> </h4> </b-col> </b-row>                        
                        <b-row v-if="weaponShopMode === 'on'">
                                <b-col>  <b-form-checkbox-group buttons button-variant="dark" v-model="this.sheet.selectedTiers" :options="this.sheet.availableTiers" />  </b-col>                                                             
                        </b-row>
                        <b-row id ="weaponGrid"  v-if="weaponShopMode === 'on'">
                            <b-col>
                                <p> </p>
                                <b-table responsive="sm" small outlined striped :filter="weaponFilter" @filtered="onWeaponFilter" :items="this.character.equipment.weapons.items" 
                                        :fields="this.sheet.weaponFields" :per-page="weaponShopPerPage"  :current-page="weaponShopPage">                                                                    
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'weapon')" variant="secondary"> ? </b-btn>                                
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
                                <b-table responsive="sm" small outlined striped :filter="gearFilter" @filtered="onGearFilter" :per-page="gearShopPerPage" 
                                    :current-page="gearShopPage" :items="this.character.equipment.gear.items" :fields="this.sheet.gearFields">                                                                    
                                    <template slot="actions" slot-scope="row">
                                        <b-btn size="sm" @click.stop="showSomeModal(row.item, 'gear')" variant="secondary"> ? </b-btn>                                
                                        <b-btn size="sm" variant="danger" v-on:click.stop="adjustGearInventory(row.item, -1)"> - </b-btn>
                                        <b-btn size="sm" variant="success" v-on:click.stop="adjustGearInventory(row.item, 1)"> + </b-btn>                                
                                    </template>    
                                </b-table>
                            </b-col>
                        </b-row>

                        <b-row v-if="gearShopMode === 'on'">
                            <b-col> <b-pagination size="sm" :total-rows="this.gearShopTableRows" :per-page="gearShopPerPage" v-model="gearShopPage" /> </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>

        </b-container>

        <b-modal centered v-model="showModal" size="md" v-bind:title="this.modalData.Name" header-class="bg-dark text-light">
            <b-container>
                <b-row>
                    <b-col>
                        <p class="text-left" v-for="(value, key) in this.modalData" :key="key" v-if="key != 'Abilities' && key != 'Name'">                                
                            <strong>{{ key }} </strong> </br> {{ value }}  
                        </p> 
                        <div class = "text-left" v-for="(value, key) in this.modalData.Abilities" :key="key">  {{value}} </div>                    
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>        


        <!--p> </p>
        <hr>
        <b-table :items="this.character.equipment.inventory.items"/>

        <p> </p>
        <hr>
        <b-table :items="this.character.talents.transactionLog"/>

        <p> </p>
        <hr>
        <b-table :items="this.character.skills.transactionLog"/>

        <p> </p>
        <hr>
        <b-table :items="this.character.talents.items"/>

        <p> </p>
        <hr>
        <b-table :items="this.character.skills.items"/-->
    </div>
</template>

<script>
export default {    
    data () {
        return {
            
            rolledCareer: false,
            bonusXp : 0,
            altMagicRule : true,
            altAfterSevenRule: true,
            altCustomRule: false,
            altHackingRule: false,
            altVehicleRule: false,

            isFreedomMode: "off",
            skillTableMode: "on",
            talentTableMode: "on",
            armorShopMode: "on",
            weaponShopMode: "on",
            gearShopMode: "on",
            abilityMode: "on",
            inventoryMode: "on",
            showHeader: "on",
            showCharacteristics: "on",

            illegalLogic: '',

            selectedGenre: 'After Seven',
            selectedAlternativeRules: ["After Seven"],
            selectedRace: "",
            selectedRaceId: "",
            selectedCareer: "",
            selectedDesire: "",
            selectedFear: "",
            selectedFlaw: "",
            selectedStrength: "",
            selectedFaction: "",

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
            xpAlert: false,
            inventoryAlert: false,
            
            sortKey: 'tier',
            sortDesc: false,


            settingGenres: ["After Seven", "Custom", "Fantasy", "Steampunk", "Weird War", "Modern", "Sci-fi", "Space Opera"],
            selectedTiers: ["Tier: 1", "Tier: 2", "Tier: 3", "Tier: 4", "Tier: 5" ],

            sheet: {     
                avaiableTiers: ["Tier: 1", "Tier: 2", "Tier: 3", "Tier: 4", "Tier: 5" ],
                selectableCharacteristics: ["Agility", "Brawl", "Cunning", "Intellect", "Presence", "Willpower"],
                selectedCharacteristic: "",
                selectedableSkills: [],
                selectedSkills: [],                
                altRuleButtons: [
                    { variant: "?", size: "sm", caption: "After Seven", state: true},
                    { variant: "?", size: "sm", caption: "Custom", state: false},
                    { variant: "?", size: "sm", caption: "Hacking", state: false},
                    { variant: "?", size: "sm", caption: "Magic", state: true},
                    { variant: "?", size: "sm", caption: "Vechicle", state: true}
                ],
                alternativeRules: ["After Seven", "Custom", "Hacking", "Magic", "Vehicle"],         
                possibleFactions: ["Confederacy of Canada", "Holy American Empire", "Imperium of the North", "Kingdom of Quebec", "New American Republic", "Western Commonwealth"],
                selectableDesires: ["Ambition", "Belonging", "Expertise", "Fame", "Justice", "Knowledge", "Love", "Safety", "Vengeance", "Wealth"],
                selectableFears: ["Change", "Commitment", "Death", "Expression", "Failure", "Humiliation", "Isolation", "Nemesis", "Obscurity", "Poverty"],                
                selectableFlaws: ["Anger", "Compulsion", "Deception", "Greed", "Laziness", "Ignorance", "Intolerance", "Pride", "Recklessness", "Timid"],        
                selectableStrengths: ["Adaptable", "Analytical", "Courageous", "Curious", "Idealistic", "Independent", "Patient", "Spiritual", "Wise", "Witty"],                
                selectableRaces: [], 
                selectableCareers: [],
                skillLegendFields: [{key:"key", label: "Symbol" }, {key:"meaning", label:"Meaning"}],
                skillLegend: [
                    { key: "R", meaning: "1st rank recieved by a racial ability."},
                    { key: "^", meaning: "Is a career skill."},
                    { key: "+", meaning: "1st rank recieved by a career bonus."},
                    { key: "^R", meaning: "1st rank recieved by a racial ability, is career skill."},
                    { key: "^^", meaning: "1st rank recieved from a career."},
                    { key: "^+", meaning: "1st rank recieved by a career bonus and is a career skill."},
                ],
                talentFields: [
                    { key: "details", label: "Talent", class:"text-left", sortable: false} ,
                    { key: "ranked", label: "Ranked", class: "text-left", sortable: false },     
                    { key: "ranks", label: "Rank", class: "text-center", sortable: true } ,
                    { key: "actions", label: " ", class: "text-left" },                      
                ],
                skillFields : [
                    { key: "name", label: "Name", sortable: true },                   
                    { key: "sourceLegend", label: "Key", sortable: false}, 
                    { key: "ranks", label: "Rank", class: "text-center", sortable: true  },    
                    { key: "actions", label: " ", class: "text-center" },   
                ],
                selectableArmor : [],
                selectableProperHand: [],
                selectableOffHand: [],
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
                    { key: "subCategory", label: "Class", class: "text-left", sortable: true},   
                    { key: "name", label: "Name", class: "text-left", sortable: true },                 
                    { key: "qualityDisplay", label: "Qualities", class: "text-left", sortable: true },
                    { key: "encumbrance", label: "Encum.", class: "text-center", sortable: true },
                    { key: "actions", label: "Equip", class: "text-left", sortable: false },
                    { key: "remove", label: "Remove Item", class: "text-left", sortable: false }
                ]
            },    
            character: {
                name: '',
                bonusGiven: '',
                abilities : [],
                rolledBonus : [],
                bonusGear: 0,
                bonusArmor: 0,
                bonusWeapons: 0,
                bonusTalents: 0,
                bonusSkills: 0,
                fluff: {
                    career: "",
                    race: "",
                    faction: "",
                    fear: "",
                    desire: "",
                    strength: "",
                    flaw: "",
                    note: "",
                },
                xp: {
                    total: 0,
                    starting: 0,
                    bonus: 0,
                    careerBoost: 0,
                    totalSpent: 0
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
                    freebees: 0,
                    noncareerfreebees: 0,
                    transactionLog: [],
                    items: [],
                    career: [],
                },
                talents: {
                    items: [],
                    transactionLog: [],
                    specialTalents: [],
                    limitations: [
                        { talent_tier: "Tier: 1", owned: 0, limit: null },
                        { talent_tier: "Tier: 2", owned: 0, limit: 0 },
                        { talent_tier: "Tier: 3", owned: 0, limit: 0 },
                        { talent_tier: "Tier: 4", owned: 0, limit: 0 },
                        { talent_tier: "Tier: 5", owned: 0, limit: 0 }
                    ]                
                },
                equipment: {
                    loadOut: [
                        {uuid: "000"},
                        {uuid: "000"},
                        {uuid: "000"}
                    ],               
                    loadOutOrder: 1, 
                    armor: {
                        items: []
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
                    }                    
                },
            }                
        }
    },
    watch: {
        bonusXp: function () {
            this.character.xp.total = parseInt(this.bonusXp) + this.character.xp.starting - this.character.xp.totalSpent;
            return true;
        },
        selectedRace : function () {
            this.cleanSkills(true, false);
            this.assignRacialSkills();    
            this.assignCareerSkills();
            this.assignRacialCharacteristics();
            this.assignDerivedCharacteristics();
            this.addRacialAbilities();        
            var name = this.findWithAttr(this.raceData, "id", this.selectedRace);
            this.character.fluff.race = name;
            return true;
        },
        selectedCareer : function(newCareer){
    
            //this.cleanSkills(false, false);
            this.clearoutBonus();
            this.castActiveSkills();
            this.assignCareerSkills();
            this.grantCareerBoost();
            this.character.fluff.career = this.selectedCareer;
            return true;
        },
        selectedGenre : function() {

            if (this.selectedGenre != "After Seven") {
                
                if(this.selectedGenre === "Custom") {
                    this.selectedAlternativeRules = [];
                    this.selectedAlternativeRules.push("Custom");
                }
                else {
                    this.selectedAlternativeRules = [];
                }

            } 

            if (this.selectedGenre === "After Seven") this.selectedAlternativeRules = ["After Seven"];

            this.castSelectableRaces();
            this.castSelectableCareers();
            this.castActiveSkills();
            this.castTalents();         

            this.assignCareerSkills();
            return true;
        }        
    },   
    methods : { 
        getAllIndexesWithAttr: function (array, attr, value) {
            var indices = [];
            
            for(var i = 0; i < array.length; i += 1) {
           
                if(array[i][attr] === value) {

                    indices.push(i);
                }
            }

            return indices;
        },
        findWithAttr: function (array, attr, value) {

            for(var i = 0; i < array.length; i += 1) {

                if(array[i][attr] === value) {

                    return i;
                }
            }
            return -1;
        },
        adjustInventory: function (inv) {
            //this automatically unequips items to
            var index = this.findWithAttr(this.character.equipment.inventory.items, "uuid", inv.uuid);
            var itemIndex = -1;
            
            if (index > 0) {
                this.character.equipment.inventory.items[index].isMainHand = false;
                this.character.equipment.inventory.items[index].isOffHand = false;
                this.character.equipment.inventory.items[index].isWorn = false;            
                this.character.equipment.inventory.items[index]._rowVariant = null;
            }

            for(var i = 0; i < this.character.equipment.loadOut.length; i++) {
                if (this.character.equipment.loadOut[i] === inv.uuid) this.character.equipment.loadOut[i].uuid = "000";
            }

            this.removeItemAbility(inv, inv.category);

            switch (inv.category) {
                case "Armor":
                    itemIndex = this.findWithAttr(this.character.equipment.armor.items, "id", inv.id);
                    this.character.equipment.armor.items[itemIndex].quantity -= 1;
                    this.character.equipment.money += this.character.equipment.armor.items[itemIndex].value;
                    break;
                case "Weapon":
                    itemIndex = this.findWithAttr(this.character.equipment.weapons.items, "id", inv.id);
                    this.character.equipment.weapons.items[itemIndex].quantity -= 1;
                    this.character.equipment.money += this.character.equipment.weapons.items[itemIndex].value;
                    break;
                case "Gear":
                    itemIndex = this.findWithAttr(this.character.equipment.gear.items, "id", inv.id);
                    this.character.equipment.gear.items[itemIndex].quantity -= 1;
                    this.character.equipment.money += this.character.equipment.gear.items[itemIndex].value;
                    break;
            }
            
            this.character.equipment.inventory.items.splice(index,1);
        },
        randomRollASFluff : function () {
            var asFluffData = require('../data/asrandom.json');

            var raceRand = 1 + Math.floor(Math.random() * 4);
            var careerRand = 1 + Math.floor(Math.random() * 16);
            var factionRand = 1 + Math.floor(Math.random() * 6);
            
            for(var a7 = 0; a7 < asFluffData.length; a7++) {

                if (asFluffData[a7].type === "race" && asFluffData[a7].rollValue === raceRand) {
                    //get race index
                    var ri = this.findWithAttr(this.raceData, "id", asFluffData[a7].outcomeId);
                    this.selectedRace = this.raceData[ri].id;
                } 

                if (asFluffData[a7].type === "career" && asFluffData[a7].rollValue === careerRand){
                    //get race index
                    var ci = this.findWithAttr(this.careerData, "id", asFluffData[a7].outcomeId);
                    this.selectedCareer = this.careerData[ci].name;
                } 

                if (asFluffData[a7].type === "faction" && asFluffData[a7].rollValue === factionRand){
                    this.selectedFaction = asFluffData[a7].outcomeId;
                } 

            }

            this.grantCareerBoost();
            return true;
        },
        randomRollMotivation : function () {
            
            var motivationalData = require('../data/motivations.json');            
            
            var desireRand = Math.floor(Math.random() * 10);
            var fearRand = Math.floor(Math.random() * 10);
            var strengthRand = Math.floor(Math.random() * 10);
            var flawRand = Math.floor(Math.random() * 10);

            for (var m=0; m < motivationalData.length; m++) {

                if (motivationalData[m].type === "desires" && motivationalData[m].rollValue === desireRand ) this.selectedDesire = motivationalData[m].result; 
                if (motivationalData[m].type === "fears" && motivationalData[m].rollValue === fearRand ) this.selectedFear = motivationalData[m].result;
                if (motivationalData[m].type === "flaws" && motivationalData[m].rollValue === flawRand ) this.selectedFlaw = motivationalData[m].result; 
                if (motivationalData[m].type === "strengths" && motivationalData[m].rollValue === strengthRand ) this.selectedStrength = motivationalData[m].result;

            }

            return true;
        },
        specialTalent: function (talent, amount) {
            switch(talent.name) {
                case "Armor Master": 
                    this.character.stats.bonusSoak = this.character.stats.bonusSoak + amount;
                    break;

                case "Armor Master (Improved)":                   
                    
                    for(var i = 0; i < this.character.equipment.inventory.items.length; i++) {

                        if (this.character.equipment.inventory.items[i].isWorn) {
                            this.character.stats.bonusMeleeDefense = this.character.stats.bonusMeleeDefense + amount;
                        }
                    }

                    break;

                case "Basic Military Training": 
                    var id = this.findWithAttr(this.character.skills.items, "name", "Athletics");
                    this.character.skills.items[id].isCareer = amount > 0 ? true : false;
                    
                    id = this.findWithAttr(this.character.skills.items, "name", "Ranged (Heavy)");
                    this.character.skills.items[id].isCareer = amount > 0 ? true : false;

                    id = this.findWithAttr(this.character.skills.items, "name", "Resilience");
                    this.character.skills.items[id].isCareer = amount > 0 ? true : false;
                    break;

                case "Burly": 
                    //Reduce any wielded weapon's Cumbersome quality and Encumbrance rating by a number equal to ranks in Burly to a minimum of 1.
                    for (var i = 0; i < this.character.equipment.inventory.items.length; i++) {
                        
                        if (this.character.equipment.inventory.items[i].isMainHand === true || this.character.equipment.inventory.items[i].isOffHand === true) {
                            //if it is equipped, reduce / enchance stats.

                            var burlyEncumbrance = this.character.equipment.inventory.items[i].encumbrance = this.character.equipment.inventory.items[i].encumbrance + amount;

                            if (burlyEncumbrance < 1) burlyEncumbrance = 1;

                            //weapons have the identitical worn encumbrance stat.
                            this.character.equipment.inventory.items[i].wornEncumbrance = burlyEncumbrance;
                            this.character.equipment.inventory.items[i].encumbrance = burlyEncumbrance;
                            
                            //cumbersome is always six.
                            var burlyCumbersome = this.character.equipment.inventory.items[i].qualities[6].value + amount;

                            //cumbersome values can start off as zero...don't want to penalize whats not there.
                            if (burlyCumbersome < 1 && this.character.equipment.inventory.items[i].qualities[6].value < 0) burlyCumbersome = 1;

                            this.character.equipment.inventory.items[i].qualities[6].value = burlyCumbersome;
                        }
                    }                                        
                    break;                

                case "Dedication":
                    this.showChararcteristicModal();
                    break;
                
                case "Defensive":
                    this.character.stats.bonusRangedDefense = this.character.stats.bonusRangedDefense + amount;
                    this.character.stats.bonusMeleeDefense = this.character.stats.bonusMeleeDefense + amount;
                    break;

                case "Grit": 
                    this.character.stats.bonusStrain = this.character.stats.bonusStrain + amount;
                    break;
                    
                case "Toughened":
                    this.character.stats.bonusWounds = this.character.stats.bonusWounds + (2 * amount);
                    break;

                case "Vehicle Combat Training": 
                    var id = this.findWithAttr(this.character.skills.items, "name", "Gunnery");
                    this.character.skills.items[id].isCareer = amount > 0 ? true : false;
                    
                    id = this.findWithAttr(this.character.skills.items, "name", "Driving");
                    this.character.skills.items[id].isCareer = amount > 0 ? true : false;

                    id = this.findWithAttr(this.character.skills.items, "name", "Piloting");
                    this.character.skills.items[id].isCareer = amount > 0 ? true : false;
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
        showSomeModal : function (rowItem, rowType) {
            
            this.showModal = !this.showModal;
            this.modalData = [];

            var newModalData = [];
            
            switch (rowType){
                case "armor": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,  
                        Encumbrance: rowItem.encumbrance,  
                        Worn_Encumbrance: rowItem.wornEncumbrance,
                        Value: rowItem.value,
                        Rarity: rowItem.rarity,
                        Soak: rowItem.soak,
                        Defense: rowItem.defense                 
                    }                    

                    if (rowItem.qualityText != "") newModalData.Qualities = rowItem.qualityText

                    if (typeof rowItem.specialAbilities === "undefined") {                        
                    } else {                      
                        newModalData.Abilities = rowItem.specialAbilities;     
                    }     

                    this.modalData = newModalData;

                    break;

                case "gear": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,     
                        Encumbrance: rowItem.encumbrance,
                        Rarity: rowItem.rarity,
                        Vale: rowItem.value
                    }                

                    if (rowItem.qualityText != "") newModalData.Qualities = rowItem.qualityText

                    if (typeof rowItem.specialAbilities === "undefined") {                        
                    } else {                      
                        newModalData.Abilities = rowItem.specialAbilities;     
                    }     

                    this.modalData = newModalData;

                    break;
                    
                case "weapon": 
                    newModalData = {
                        Name: rowItem.name,
                        Description: rowItem.description,  
                        Encumbrance: rowItem.encumbrance,
                        Value: rowItem.value,
                        Rarity: rowItem.rarity,                                                
                        Skill: rowItem.skill,
                        Range: rowItem.range,
                        Damage: rowItem.damage,
                        Critical: rowItem.critical,                                
                    }

                    if (rowItem.qualityText != "") newModalData.Qualities = rowItem.qualityText

                    if (typeof rowItem.specialAbilities === "undefined") {                        
                    } else {                      
                        newModalData.Abilities = rowItem.specialAbilities;     
                    }                    

                    this.modalData = newModalData;

                    break;
                
                case "talent": 
                    newModalData = {
                        Name: rowItem.name,
                        Tags: rowItem.tags,      
                        Description: rowItem.description,                       
                        Activation: rowItem.activation,                                                
                        Ranked: rowItem.ranked,
                        Sourcing: rowItem.sourcing,                         
                    }

                    this.modalData = newModalData;

                    break;

                case "inv": 
                    newModalData = {
                        Name: rowItem.name,
                        Value: rowItem.value,
                        Rarity: rowItem.rarity,   
                        Repairs: rowItem.repairNeeded                
                    }

                    if (rowItem.category === "Weapon") {                                           
                        newModalData.Skill = rowItem.skill;
                        newModalData.Range = rowItem.range;
                        newModalData.Damage = rowItem.damage;
                        newModalData.Critical = rowItem.critical;
                    }

                    if (rowItem.category === "Armor") {            
                        newModalData.Soak = rowItem.soak;
                        newModalData.Defense = rowItem.defense;                                   
                    }

                    if (rowItem.qualityDisplay != "") newModalData.Qualities = rowItem.qualityDisplay

                    if (typeof rowItem.specialAbilities === "undefined") {                        
                    } else {                      
                        newModalData.Abilities = rowItem.specialAbilities;     
                    }                    

                    this.modalData = newModalData;

                    break;
            }
            
            return true;
        },
        getUniqueId: function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        },
        addItemAbility: function (item, category) {
             var index = 0;
             var quantity = 0;

            switch (category) {
                case "Skill":
                    index = this.findWithAttr(this.character.skills.items, "id", item.id);
                    quantity = this.character.skills.items[index].ranks;
                    break;
                case "Talent":
                    index = this.findWithAttr(this.character.talents.items, "id", item.id);
                    quantity = this.character.talents.items[index].ranks;
                    break;
                case "Weapon":
                    index = this.findWithAttr(this.character.equipment.weapons.items, "id", item.id);
                    quantity = this.character.equipment.weapons.items[index].quantity;
                    break;
                case "Armor":
                    index = this.findWithAttr(this.character.equipment.armor.items, "id", item.id);
                    quantity = this.character.equipment.armor.items[index].quantity;
                    break;
                case "Gear":
                    index = this.findWithAttr(this.character.gear.items, "id", item.id);
                    quantity  = this.character.gear.items[index].quantity;
                    break;
                case "Race":
                    //always do something.
                    quantity = 1;
                    break;
            }

            var abilityIndices = this.getAllIndexesWithAttr(this.abilityData, "id", item.id);

            if (abilityIndices.length > 0) {

                for(var x = 0; x < abilityIndices.length; x++) {

                    var ability = this.abilityData[abilityIndices[x]];

                    var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);    

                    //only add it once                    
                    if (abilityIndex <= 0 && quantity === 1) {
                        this.character.abilities.push(ability);
                        this.abilityTableRows = this.character.abilities.length;
                    }     
                }
            }

            return true;
        },
        removeItemAbility: function (item, category) {
             var index = 0;
             var quantity = 0;
             var toSplice = [];

            switch (category) {
                case "Skill":
                    index = this.findWithAttr(this.character.skills.items, "id", item.id);
                    quantity = this.character.skills.items[index].ranks;
                    break;
                case "Talent":
                    index = this.findWithAttr(this.character.talents.items, "id", item.id);
                    quantity = this.character.talents.items[index].ranks;
                    break;
                case "Weapon":
                    index = this.findWithAttr(this.character.equipment.weapons.items, "id", item.id);
                    quantity = this.character.equipment.weapons.items[index].quantity;
                    break;
                case "Armor":
                    index = this.findWithAttr(this.character.equipment.armor.items, "id", item.id);
                    quantity = this.character.equipment.armor.items[index].quantity;
                    break;
                case "Gear":
                    index = this.findWithAttr(this.character.equipment.gear.items, "id", item.id);
                    quantity  = this.character.equipment.gear.items[index].quantity;
                    break;
                case "Race":
                    //always delete.
                    quantity = 1;
                    break;
            }

            var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", item.id);
                    
            //start off as one instead of 0, because [0] = -1...
            for(var j = 0; j < abilityIndexes.length; j++) {        

                var ability = this.abilityData[abilityIndexes[j]];       
            
                var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);                                                         

                //remove this ability if its the only one.
                if (quantity === 0) {
                    toSplice.push(abilityIndex);                                   
                }                            
            }

            for (var ai = 0; ai < toSplice.length; ai++) {
                this.character.abilities.splice(ai);
                this.abilityTableRows = this.character.abilities.length;
            }

            return true;
        },        
        addToLoadout: function (inv, category) {
            //this automatically unequips items too.
            this.inventoryAlert = false;

            if (inv.isWorn === true && category === "Armor") return;

            if (category === "Gear") return;     
                             
            var index = this.findWithAttr(this.character.equipment.inventory.items, "uuid", inv.uuid);            

            if (category === "Gear") return;            

            if (category === "Armor") {

                if (this.character.equipment.loadOut[0].uuid != "000" && this.character.equipment.loadOut[0] != inv.uuid) {                    

                    var targetIndex = this.findWithAttr(this.character.equipment.inventory.items, "uuid", this.character.equipment.loadOut[0].uuid);
                    
                    if (targetIndex >= 0) {
                        this.character.equipment.inventory.items[targetIndex].isWorn = false;
                        this.character.equipment.inventory.items[targetIndex]._rowVariant = null;
                        this.removeFromLoadOut(this.character.equipment.inventory.items[targetIndex]);        
                    }   

                }
                    this.character.equipment.loadOut[0].uuid = inv.uuid;
                    this.character.equipment.inventory.items[index].isWorn = true;
                    this.character.equipment.inventory.items[index]._rowVariant = "warning";
                    this.addItemAbility(inv, "Armor");
                    //add bonus defense and soak (aid = armor id)
                    var aid = this.findWithAttr(this.character.equipment.armor.items, "id", inv.id);
                    this.character.stats.bonusSoak += this.character.equipment.armor.items[aid].soak;
                    this.character.stats.bonusRangedDefense += this.character.equipment.armor.items[aid].defense;
                    this.character.stats.bonusMeleeDefense += this.character.equipment.armor.items[aid].defense;

            } else {

                if (inv.hands === 2) {
                    //remove the main hand / off hand with the entry.
                    if (this.character.equipment.loadOut[1].uuid != "000") {
                        var targetIndex = this.findWithAttr(this.character.equipment.inventory.items, "uuid", this.character.equipment.loadOut[1].uuid);                    
                        this.character.equipment.inventory.items[targetIndex].isMainHand = false;
                        this.character.equipment.inventory.items[targetIndex]._rowVariant = null;
                        this.removeFromLoadOut(this.character.equipment.inventory.items[targetIndex]);
                    }
                    
                    if (this.character.equipment.loadOut[2].uuid != "000") {
                        var targetIndex = this.findWithAttr(this.character.equipment.inventory.items, "uuid", this.character.equipment.loadOut[2].uuid);                                            
                        this.character.equipment.inventory.items[targetIndex].isOffHand = false;         
                        this.character.equipment.inventory.items[targetIndex]._rowVariant = null;           
                        this.removeFromLoadOut(this.character.equipment.inventory.items[targetIndex]);
                    }
                                       
                    this.character.equipment.loadOut[1].uuid = inv.uuid;
                    this.character.equipment.loadOut[2].uuid = inv.uuid;
                    this.character.equipment.inventory.items[index].isOffHand = true;
                    this.character.equipment.inventory.items[index].isMainHand = true;
                    this.character.equipment.inventory.items[index]._rowVariant = "primary";
                    this.addItemAbility(inv, "Weapon");

                } else if (this.character.equipment.loadOut[1].uuid === this.character.equipment.loadOut[2].uuid && this.character.equipment.loadOut[1].uuid != "000")  {                    
                    //so this replacing a 2 hander, defaulting to main hand.
                    var targetIndex = this.findWithAttr(this.character.equipment.inventory.items, "uuid", this.character.equipment.loadOut[1].uuid);
                    this.character.equipment.inventory.items[targetIndex].isWorn = false;
                    this.character.equipment.inventory.items[targetIndex]._rowVariant = null;
                    this.removeFromLoadOut(this.character.equipment.inventory.items[targetIndex]);

                    this.character.equipment.loadOut[1].uuid = inv.uuid;
                    this.character.equipment.loadOut[2].uuid = "000";
                    this.character.equipment.inventory.items[index].isMainHand = true;
                    this.character.equipment.inventory.items[index]._rowVariant = "primary";

                    this.character.equipment.loadOutOrder = 2;

                } else if (this.character.equipment.loadOut[1].uuid != this.character.equipment.loadOut[2].uuid)  {
                    //replaces main hand / off hand - depending on clicking order.   
                    
                    //changes off hand to main hand, main hand to off hand.
                    var currentHand = this.character.equipment.loadOutOrder;
                    var changeHand = this.character.equipment.loadOutOrder === 1 ? 2 : 1;

                    if (this.character.equipment.loadOut[currentHand].uuid != "000") {
                        var targetIndex = this.findWithAttr(this.character.equipment.inventory.items, "uuid", this.character.equipment.loadOut[currentHand].uuid);                    
                        this.character.equipment.inventory.items[targetIndex].isOffHand = false;
                        this.character.equipment.inventory.items[targetIndex].isMainHand = false;
                        this.character.equipment.inventory.items[targetIndex]._rowVariant = null;
                        this.removeFromLoadOut(this.character.equipment.inventory.items[targetIndex]);
                    }

                    if (this.character.equipment.loadOut[changeHand].uuid != "000") {
                        var targetIndex = this.findWithAttr(this.character.equipment.inventory.items, "uuid", this.character.equipment.loadOut[changeHand].uuid);                    
                        this.character.equipment.inventory.items[targetIndex].isOffHand = changeHand === 2 ? true : false;
                        this.character.equipment.inventory.items[targetIndex].isMainHand = changeHand === 1 ? true : false;
                        this.character.equipment.inventory.items[targetIndex]._rowVariant = changeHand === 1 ? "primary" : "info";
                    }
                                
                    //resort order, 2 is off hand. 1 is main hand.                                 
                    if (this.character.equipment.loadOutOrder === 2) {
                        this.character.equipment.inventory.items[index].isOffHand = true;
                        this.character.equipment.inventory.items[index]._rowVariant = "info";
                        this.character.equipment.loadOutOrder = 1;
                        this.character.equipment.loadOut[2].uuid = inv.uuid;              
                    } else  {
                        this.character.equipment.inventory.items[index].isMainHand = true;
                        this.character.equipment.inventory.items[index]._rowVariant = "primary";
                        this.character.equipment.loadOutOrder = 2;
                        this.character.equipment.loadOut[1].uuid = inv.uuid;                                      
                    }

                } else if (this.character.equipment.loadOut[1].uuid === "000" && this.character.equipment.loadOut[2].uuid === "000")  {                    
                    this.character.equipment.loadOut[1].uuid = inv.uuid;    
                    this.character.equipment.inventory.items[index].isMainHand = true;
                    this.character.equipment.inventory.items[index]._rowVariant = "primary";
                    this.character.equipment.loadOutOrder = 2;

                }

                //defensive
                if(this.character.equipment.inventory.items[index].qualities[7].value > 0) {
                   this.character.stats.bonusMeleeDefense += this.character.equipment.inventory.items[index].qualities[7].value;
                }

                //deflective
                if(this.character.equipment.inventory.items[index].qualities[8].value > 0) {
                   this.character.stats.bonusRangedDefense += this.character.equipment.inventory.items[index].qualities[8].value;
                }

                this.addItemAbility(inv, "Weapon");
            }    
            
            this.assignDerivedCharacteristics();    

            return true;    
        },
        removeFromLoadOut: function (inv, category) {
            //this automatically unequips items too.
            this.inventoryAlert = false;            
                    
            var index = this.findWithAttr(this.character.equipment.inventory.items, "uuid", inv.uuid);
            
            if (index >= 0 ) {

                var actuallyLoaded = this.character.equipment.inventory.items[index].isMainHand; 

                if (!actuallyLoaded) this.character.equipment.inventory.items[index].isOffHand;

                if (!actuallyLoaded) this.character.equipment.inventory.items[index].isWorn;

                if (actuallyLoaded) {
                    this.character.equipment.inventory.items[index].isMainHand = false;
                    this.character.equipment.inventory.items[index].isOffHand = false;
                    this.character.equipment.inventory.items[index].isWorn = false;

                    //defensive
                    if (category != "Gear") {
                        
                        if (this.character.equipment.inventory.items[index].qualities[7].value) {
                            this.character.stats.bonusMeleeDefense -= this.character.equipment.inventory.items[index].qualities[7].value;
                        }

                        //deflective
                        if (this.character.equipment.inventory.items[index].qualities[8].value > 0) {
                            this.character.stats.bonusRangedDefense -= this.character.equipment.inventory.items[index].qualities[8].value;
                        }
                    }

                    if (inv.category === "Armor") {
                        //add bonus defense and soak (aid = armor id)
                        var aid = this.findWithAttr(this.character.equipment.armor.items, "id", inv.id);
                        this.character.stats.bonusSoak -= this.character.equipment.armor.items[aid].soak;
                        this.character.stats.bonusRangedDefense -= this.character.equipment.armor.items[aid].defense;
                        this.character.stats.bonusMeleeDefense -= this.character.equipment.armor.items[aid].defense;
                    }

                }

                for(var i = 0; i < this.character.equipment.loadOut.length; i++) {
                    if (this.character.equipment.loadOut[i] === inv.uuid) this.character.equipment.loadOut[i].uuid = "000";
                }

                this.removeItemAbility(inv, inv.category);
                this.assignDerivedCharacteristics();
            }
            
            return true;
        },
        clearoutBonus: function () {

            this.character.xp.total = this.character.xp.total - this.character.xp.careerBoost;
            this.character.xp.careerBoost = 0;
            this.rolledCareer = false;

            this.character.xp.bonusXp = 0;

            //clear skill
            var s = this.findWithAttr(this.character.skills.transactionLog, "source", "bonus");            
            if (s >= 0 ) {

                var id = this.character.skills.transactionLog[s].id;
                var sIndex = this.findWithAttr(this.character.skills.items, "id", id);

                this.character.skills.items[sIndex].ranks = 0;
                this.character.skills.items[sIndex].source = "out-of-the-box";
                this.character.skills.items[sIndex].sourceLegend = this.character.skills.items[sIndex].isCareer ? "^" : "";
                this.character.skills.transactionLog.splice(s, 1);

                this.removeItemAbility(this.character.skills.items[sIndex], "Skill");

            }
            
            //clear talent
            var t = this.findWithAttr(this.character.talents.transactionLog, "source", "bonus");
            if (t >= 0 ) {

                var id = this.character.talents.transactionLog[t].id;
                var tIndex = this.findWithAttr(this.character.talents.items, "id", id);
                
                this.character.talents.items[tIndex].ranks = 0;
                this.character.talents.items[tIndex].sourcing = "out-of-the-box";
                this.character.talents.items[tIndex].tierDisplay = "Tier: " + this.character.talents.items[tIndex].originalTier;
                this.character.talents.items[tIndex].tier = this.character.talents.items[tIndex].originalTier;
                this.character.talents.transactionLog.splice(t, 1);
                
                this.removeItemAbility(this.character.talents.items[tIndex], "Talent");
                this.specialTalent(this.character.talents.items[tIndex], -1);
                this.setTalentTieringLimits();
            }

            var invIds = this.getAllIndexesWithAttr(this.character.equipment.inventory.items, "source", "bonus");            

            if (invIds.length >= 0 ) {
                
                for (var v = 0; v < invIds.length; v++) {
                    
                    var inv = this.character.equipment.inventory.items[invIds[v]];

                    if (inv.category === "Gear") {
                        
                        var gIndex = this.findWithAttr(this.character.equipment.gear.items, "id", inv.id);

                        var quantiyAdjusted = this.character.equipment.gear.items[gIndex].quantity - 1;
                        
                        this.character.equipment.gear.items[gIndex].quantity = quantiyAdjusted < 0 ? 0 : quantiyAdjusted;                        
                    }
                    
                    if (inv.category === "Weapon") {
                        
                        var wIndex = this.findWithAttr(this.character.equipment.weapons.items, "id", inv.id);

                        var quantiyAdjusted = this.character.equipment.weapons.items[wIndex].quantity - 1;

                        this.character.equipment.weapons.items[wIndex].quantity = quantiyAdjusted < 0 ? 0 : quantiyAdjusted; 
                    }
                    
                    
                    if (inv.category === "Armor") {

                        var aIndex = this.findWithAttr(this.character.equipment.armor.items, "id", inv.id);

                        var quantiyAdjusted = this.character.equipment.armor.items[aIndex].quantity - 1;

                        this.character.equipment.armor.items[aIndex].quantity = quantiyAdjusted < 0 ? 0 : quantiyAdjusted; 
                    }

                    this.removeFromLoadOut(inv, inv.category);
                }

                for (var m = invIds.length-1; m >= 0; m--) {
                    this.character.equipment.inventory.items.splice(invIds[m], 1);
                }
            }
            this.inventoryTableRows = this.character.equipment.inventory.items.length;            
        },
        adjustCharacteristic: function (characteristic, amount) {
            
            this.characteristicAlert = false;
            
            var i = this.findWithAttr(this.character.stats.characteristics, 'name', characteristic.name);                    
            
            var logicCheck = true;

            if(i < 0) {
                //if the attribute wasn't found, just quit!
                this.illegalLogic = "Can not find attribute";
                this.characteristicAlert = true;
                logicCheck = false;
                return false;
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
                return false;
            }

            if( newValue > 5) {
                this.illegalLogic = "Characteristics can't be greater than 5";                
                this.characteristicAlert = true;                     
                logicCheck = false;
                return false;
            }
            
            if (logicCheck) logicCheck = this.spendXP(xpSpent, "characteristic");

            if (logicCheck) {
                this.character.stats.characteristics[i].value = newValue;                 
                this.assignDerivedCharacteristics();
                return false;       
            } else  {
                this.illegalLogic = "You can not do this action!";                
                this.characteristicAlert = true; 
                return false;
            }
                        
        },
        adjustArmorInventory: function (armor, amount, bonus = false) {

            this.inventoryAlert = false;

            var adjustedQuantity = armor.quantity + amount;

            var adjustedMoney = this.character.equipment.money - (armor.value * amount);

            var adjustedSource = bonus === true ? "bonus" : "purchase";

            if (adjustedQuantity < 0 && amount === -1 && bonus === false) {
                this.illegalLogic = "You can not take away what you do not own.";
                this.inventoryAlert = true;
                return false;
            }

            if (adjustedMoney < 0 && amount === 1 && bonus === false) {
                this.illegalLogic = "You can not afford this aciton just yet.";
                this.inventoryAlert = true;
                return false;
            }

            if (amount === 1) {
                var i = this.findWithAttr(this.character.equipment.armor.items, "id", armor.id);

                var inventoryItem = {
                    uuid: this.getUniqueId(),
                    id: armor.id,
                    name: armor.name,
                    category: armor.category,
                    subCategory: armor.subCategory,
                    soak: armor.soak,
                    defense: armor.defense,
                    repairNeeded: "None",
                    qualityDisplay: armor.qualityText,
                    value: armor.value,
                    encumbrance: armor.encumbrance,
                    wornEncumbrance: armor.wornEncumbrance,
                    rarity: armor.rarity,
                    qualities: armor.qualities,
                    source : adjustedSource,
                    isMainHand: false,
                    isOffHand: false,
                    isWorn: false,
                    hands: 0
                };

                //Adjust inventory.
                this.character.equipment.inventory.items.push(inventoryItem);
                this.inventoryTableRows = this.character.equipment.inventory.items.length;
            
            } else if (amount === -1) {
                //find possible items carried around.
                var inventoryIndices = this.getAllIndexesWithAttr(this.character.equipment.inventory.items, "id", armor.id);

                if (inventoryIndices >= 0) {                        
                    //find first inventory item and remove it.                    
                    this.removeFromLoadOut(armor);
                    this.removeItemAbility(armor, "armor");
                    this.character.equipment.inventory.items.splice(inventoryIndices[0], 1);
                    this.inventoryTableRows = this.character.equipment.inventory.items.length;
                }              
            }           
                
            //refund money and adjust quantity.
            this.character.equipment.money = bonus ? this.character.equipment.money : adjustedMoney;
            this.character.equipment.armor.items[i].quantity = adjustedQuantity;              
            this.assignDerivedCharacteristics();
            return true;                         
        },
        adjustGearInventory: function (gear, amount, bonus = false) {

            this.inventoryAlert = false;

            var adjustedQuantity = gear.quantity + amount;

            var adjustedMoney = this.character.equipment.money - (gear.value * amount);
            
            var adjustedSource = bonus === true ? "bonus" : "purchase";

            var gearIndex = this.findWithAttr(this.character.equipment.gear.items, "id", gear.id);

            if (adjustedQuantity < 0 && amount === -1 && bonus === false) {
                this.illegalLogic = "You can not take away what you do not own.";
                this.inventoryAlert = true;
                return false;
            }

            if (adjustedMoney < 0 && amount === 1 && bonus === false) {
                this.illegalLogic = "You can not afford this aciton just yet.";
                this.inventoryAlert = true;
                return false;
            }

            if (amount === 1) {
                var i = this.findWithAttr(this.character.equipment.gear.items, "id", gear.id);

                var inventoryItem = {
                    uuid: this.getUniqueId(),
                    id: gear.id,
                    name: gear.name,
                    category: gear.category,
                    subCategory: gear.subCategory,
                    repairNeeded: "None",
                    qualityDisplay: gear.qualityText,
                    value: gear.value,
                    encumbrance: gear.encumbrance,
                    wornEncumbrance: gear.encumbrance,
                    rarity: gear.rarity,
                    qualities: gear.qualities,
                    source: adjustedSource,
                    isMainHand: false,
                    isOffHand: false,
                    isWorn: false,
                    hands: 0
                };

                //Adjust inventory.
                this.character.equipment.inventory.items.push(inventoryItem);
                this.inventoryTableRows = this.character.equipment.inventory.items.length;
            
            } else if (amount === -1) {
                //find possible items carried around.
                var inventoryIndices = this.getAllIndexesWithAttr(this.character.equipment.inventory.items, "id", gear.id);

                if (inventoryIndices >= 0) {                        
                    //find first inventory item and remove it.                    
                    this.removeFromLoadOut(gear);
                    this.removeItemAbility(gear, "gear");
                    this.character.equipment.inventory.items.splice(inventoryIndices[0], 1);
                    this.inventoryTableRows = this.character.equipment.inventory.items.length;
                }              
            }           
                
            //refund money and adjust quantity.
            this.character.equipment.money = bonus ? this.character.equipment.money : adjustedMoney;
            this.character.equipment.gear.items[gearIndex].quantity = adjustedQuantity;              
            this.assignDerivedCharacteristics();
            return true;      
        },
        adjustWeaponInventory: function (weapon, amount, bonus = false) {

            this.inventoryAlert = false;

            var adjustedQuantity = weapon.quantity + amount;

            var adjustedMoney = this.character.equipment.money - (weapon.value * amount);

            var adjustedSource = bonus === true ? "bonus" : "purchase";

            if (adjustedQuantity < 0 && amount === -1 && bonus === false) {
                this.illegalLogic = "You can not take away what you do not own.";
                this.inventoryAlert = true;
                return false;
            }

            if (adjustedMoney < 0 && amount === 1 && bonus === false) {
                this.illegalLogic = "You can not afford this aciton just yet.";
                this.inventoryAlert = true;
                return false;
            }

            if (amount === 1) {
                var i = this.findWithAttr(this.character.equipment.weapons.items, "id", weapon.id);

                var inventoryItem = {
                    uuid: this.getUniqueId(),
                    id: weapon.id,                    
                    name: weapon.name,
                    damage: weapon.damage,
                    critical: weapon.critical,
                    skill: weapon.skill,
                    range: weapon.range,
                    category: weapon.category,
                    subCategory: weapon.subCategory,
                    repairNeeded: "None",
                    qualityDisplay: weapon.qualityText,
                    value: weapon.value,
                    encumbrance: weapon.encumbrance,
                    wornEncumbrance: weapon.encumbrance,
                    rarity: weapon.rarity,
                    qualities: weapon.qualities,
                    source: adjustedSource,
                    isMainHand: false,
                    isOffHand: false,
                    isWorn: false,
                    hands: weapon.hands
                };

                //Adjust inventory.
                this.character.equipment.inventory.items.push(inventoryItem);
                this.inventoryTableRows = this.character.equipment.inventory.items.length;
            
            } else if (amount === -1) {
                //find possible items carried around.
                var inventoryIndices = this.getAllIndexesWithAttr(this.character.equipment.inventory.items, "id", weapon.id);

                if (inventoryIndices >= 0) {                        
                    //find first inventory item and remove it.                    
                    this.removeFromLoadOut(weapon);
                    this.removeItemAbility(weapon, "weapon");
                    this.character.equipment.inventory.items.splice(inventoryIndices[0], 1);
                    this.inventoryTableRows = this.character.equipment.inventory.items.length;
                }              
            }           
                
            //refund money and adjust quantity.
            this.character.equipment.money = bonus ? this.character.equipment.money : adjustedMoney;
            this.character.equipment.weapons.items[i].quantity = adjustedQuantity; 
            this.character.equipment.weapons.items[i].source = adjustedSource;             
            this.assignDerivedCharacteristics();            
            return true;      
        },
        adjustTalentTiering: function (talent, amount, bonus = false) {
            this.xpAlert = false;        
        
            var index = this.findWithAttr(this.character.talents.items, "id", talent.id);

            var talentSource = "purchase"; 

            var adjustedRank = talent.ranks + amount;
            
            var adjustedTierDisplay = "Tier: " + talent.tier;
            var adjustedTier = talent.tier;
            
            if (adjustedTier >= 5 && talent.ranked === "Yes" && amount > 1) {
                adjustedTier = 5; 
            }

            var talentLimitIndex = adjustedTier - 1;

            var tiersOwned = this.character.talents.limitations[talentLimitIndex].owned + amount;

            if (bonus) talentSource = "bonus";

            var xpSpent = 0;

            if (amount > 0) {
                
                if (talent.ranked === "Yes" && adjustedRank > 1) {
                    //better increase the tiersOwned for ranked talent.                
                    if (adjustedTier >= 5 && talent.ranked === "Yes") {
                        adjustedTier = 5;
                    } else {
                        adjustedTier += 1;
                    }                    
                    var talentLimitIndex = adjustedTier - 1;
                    var adjustedTierDisplay = "Tier: " + adjustedTier;                    
                    tiersOwned = this.character.talents.limitations[talentLimitIndex].owned + amount;
                }

                //verify purchase.
                if (adjustedRank > 1 && talent.ranked === "No") {
                    this.illegalLogic = "Can not increase talent further, it is a non-ranked talent.";
                    this.xpAlert = true;
                    return false;

                } else if (adjustedTier > 1 && tiersOwned > this.character.talents.limitations[talentLimitIndex].limit) {
                    this.illegalLogic = "You can not buy into this tier.";
                    this.xpAlert = true;
                    return false;
                
                } else {
                    //record the price.
                    if (!bonus) xpSpent = (adjustedTier * 5) * amount;      
                                  
                }
                
                if(this.spendXP(xpSpent, "Talent")) {

                    var log = {
                        id: talent.id, 
                        name: talent.name, 
                        xp: xpSpent,
                        priorRank: talent.ranks,
                        newRank: adjustedRank,
                        priorTier: talent.tier,
                        tier: adjustedTier,
                        source: talentSource
                    }

                    this.character.talents.transactionLog.push(log);

                    this.character.talents.items[index].tierDisplay = adjustedTierDisplay;
                    this.character.talents.items[index].ranks = adjustedRank;
                    this.character.talents.items[index].tier = adjustedTier;
                    
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", talent.id);

                    for (var z = 0; z < abilityIndexes.length; z++ ) {  
                            
                        var ability = this.abilityData[abilityIndexes[z]];      

                        var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);    

                        if (abilityIndex <= 0) {
                            this.character.abilities.push(ability);
                            this.abilityTableRows = this.character.abilities.length;
                        }     
                    }

                    this.addItemAbility(talent, "talent");

                    //update accordingly.
                    this.specialTalent(talent, amount);

                    this.setTalentTieringLimits();

                    this.assignDerivedCharacteristics();

                    return true;  

                } else {
                    this.illegalLogic = "You do not have XP for this.";
                    this.xpAlert = true;
                    return false;
                }

            } else {

                if (adjustedRank < 0) {
                    return false;

                } else if ( talent.tier === "bonus" ) {
                    this.illegalLogic = "Can not take away a free talent.";
                    this.xpAlert = true;
                    return false;

                } else {

                    for (var t = 0; t < this.character.talents.transactionLog.length; t++) {
                        
                        if (this.character.talents.transactionLog[t].id === talent.id) {

                            if (this.character.talents.transactionLog[t].priorRank === adjustedRank ) {
                                //this is the talent we want. 
                                var priorTier = this.character.talents.transactionLog[t].priorTier;
                                
                                //let's look at the talent tier limits, [-1] because of the array order.
                                var adjustedTiersOwned = this.character.talents.limitations[priorTier-1].owned-1;
                                
                                //not [-1], because its an array.                                
                                var nextTierOwned = this.character.talents.limitations[priorTier].owned;
                                
                                if ( adjustedTiersOwned > nextTierOwned ) {                 
                                    //if we take one away from the log but the next tier has just one in it, then it's not cool, man.
                                    this.illegalLogic = "You can not take away this talent due to talent tiering.";
                                    this.xpAlert = true;
                                    return false;
                                } else {

                                    this.character.talents.items[index].ranks = this.character.talents.transactionLog[t].priorRank;
                                    this.character.talents.items[index].source = this.character.talents.transactionLog[t].source;
                                    this.character.talents.items[index].tierDisplay = "Tier: " + priorTier;
                                    this.character.talents.items[index].tier = this.character.talents.transactionLog[t].priorTier;   
                                    xpSpent = this.character.talents.transactionLog[t].xp * -1;  

                                    this.character.talents.transactionLog.splice(t,1);  

                                    if (this.spendXP(xpSpent, "talent")) {                                                            
                                        this.removeItemAbility(talent, "talent");
                                        //update accordingly.
                                        this.specialTalent(talent, amount);

                                        this.setTalentTieringLimits();

                                        this.assignDerivedCharacteristics();
                                        return true;
                                    }                                                                        
                                }                                                                                               
                            }
                        }
                    }                                       
                }
            }
            return true;
        },
        setTalentTieringLimits: function () {

            this.character.talents.limitations[0].owned = 0;    //Tier: 1 
            this.character.talents.limitations[1].owned = 0;    //Tier: 2
            this.character.talents.limitations[2].owned = 0;    //Tier: 3
            this.character.talents.limitations[3].owned = 0;    //Tier: 4
            this.character.talents.limitations[4].owned = 0;    //Tier: 5

            for(var i = 0; i < this.character.talents.items.length; i++) {
                
                var tier = this.character.talents.items[i].tier;
                var rawTier = this.character.talents.items[i].originalTier;

                if (this.character.talents.items[i].ranks > 0 ) {

                    switch (tier) {
                        case 1:
                            this.character.talents.limitations[0].owned += 1;
                            break;
                        case 2:
                            if (rawTier === 1 ) this.character.talents.limitations[0].owned += 1;                               
                            this.character.talents.limitations[1].owned += 1;                                         
                            break;
                        case 3:
                            if (rawTier === 1) {
                                this.character.talents.limitations[0].owned += 1;
                                this.character.talents.limitations[1].owned += 1;  
                            }   
                            if (rawTier === 2) {                                
                                this.character.talents.limitations[1].owned += 1;  
                            }                                                                                  
                            this.character.talents.limitations[2].owned += 1;                      
                            break;
                        case 4:                            
                            if (rawTier === 1) {
                                this.character.talents.limitations[0].owned += 1;
                                this.character.talents.limitations[1].owned += 1;  
                                this.character.talents.limitations[2].owned += 1;                              
                                this.character.talents.limitations[3].owned += 1;  
                            }      
                            if (rawTier === 2) {                                
                                this.character.talents.limitations[1].owned += 1;  
                                this.character.talents.limitations[2].owned += 1;  
                                this.character.talents.limitations[3].owned += 1;  
                            }      
                            if (rawTier === 3) {
                                this.character.talents.limitations[2].owned += 1;                                  
                            }                                    
                            this.character.talents.limitations[3].owned += 1;                        
                            break;
                        case 5:
                            if (rawTier === 1) {
                                this.character.talents.limitations[0].owned += 1;
                                this.character.talents.limitations[1].owned += 1;  
                                this.character.talents.limitations[2].owned += 1;  
                                this.character.talents.limitations[3].owned += 1;  
                            }                            
                            if (rawTier === 2) {                                
                                this.character.talents.limitations[1].owned += 1;  
                                this.character.talents.limitations[2].owned += 1;  
                                this.character.talents.limitations[3].owned += 1;  
                            }                            
                            if (rawTier === 3) {
                                this.character.talents.limitations[2].owned += 1;  
                                this.character.talents.limitations[3].owned += 1;  
                            }                            
                            if (rawTier === 4) {
                                this.character.talents.limitations[3].owned += 1;  
                            }                                                                                     
                            this.character.talents.limitations[4].owned += 1;                     
                            break;
                    }
                }
            }

            for(var z = 1; z < this.character.talents.limitations.length; z++){
                //skip talent tier 1.
                this.character.talents.limitations[z].limit = this.character.talents.limitations[z-1].owned-1;

                if(this.character.talents.limitations[z].limit <= 0) {
                    this.character.talents.limitations[z].limit = 0;
                }
            }
            return true;
        },
        adjustSkillRank: function(skill, amount, bonus=false) {
            //turn off alert.
            this.xpAlert = false;

            var skillOrigin = "purchase";
            var sourceLegend = skill.sourceLegend;

            var index = this.findWithAttr(this.character.skills.items, "id", skill.id);

            var adjustedRank = this.character.skills.items[index].ranks + amount;

            var xpSpent = 0;

            if (this.selectedRace === "") {
                this.illegalLogic = "Please select a race.";
                this.xpAlert = true;
                return false;
            }

            if (this.selectedCareer === "") {
                this.illegalLogic = "Please select a career.";
                this.xpAlert = true;
                return false;
            }

            if (bonus) {                    
                //bonus can not place skills greater than 2 or anything of that nature.
                //this is because that must be done FIRST.
                if (skill.ranks > 0 && skill.source != "racial") {
                    //the player has already invested in the skill, let's refund it.                     
                    this.removeSkillRank(skill,)
                    skillOrigin = "bonus";
                    sourceLegend = skill.isCareer ? "^+" : "+";
                    sourceLegend = skill.isCareer ? "^+" : "+";

                } else if (skill.ranks > 0 && skill.source === "racial") {
                    //I'm nice.
                    this.illegalLogic = "Hey so you already have " + skill.name + " as a racial, here's 5 xp.";
                    this.xpAlert = true;
                    this.bonusXp += 5;
                    return false;
                } 

                skillOrigin = "bonus";

            } else {
                if (adjustedRank > 2) {
                    this.illegalLogic = "Can't increase skills past two in character creation.";
                    this.xpAlert = true;
                    return false;                    
            
                } else if (skill.isRacial && skill.canBeFreebee) {
                    //the skill is a racial one and was chosen...
                    skillOrigin = "racial choice";
                    sourceLegend = skill.isCareer ? "^R" : "R";
                    
                    //turn off the other skills that are racial, recolor at the end function. 
                    for(var s = 0; s < this.character.skills.items.length; s++) {
                        
                        if (skill.source === "racial possibility" && skill.id != this.character.skills.items[s].id) {
                            //if this is a racial choice and was not chosen, turn it off!
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : "";
                        }
                    }

                } else if (this.character.skills.freebees > 0 && adjustedRank === 1) {
                    //free skill!
                    skillOrigin = "racial freebee";
                    this.character.skills.items[index].isRacial = true;
                    this.character.skills.freebees = this.character.skills.freebees - 1;
                    sourceLegend = skill.isCareer ? "^R" : "R";

                } else if (this.character.skills.noncareerfreebees > 0 && skill.isCareer === false && adjustedRank === 1) {
                    //free skill!
                    skillOrigin = "racial non-career freebee";
                    this.character.skills.items[index].isRacial = true;
                    this.character.skills.noncareerfreebees  = this.character.skills.noncareerfreebees - 1;
                    sourceLegend = "R";

                } else if (skill.isCareer && this.character.skills.firstFour > 0 && adjustedRank === 1) {
                    //its a career skill and can be purchased for free.
                    skillOrigin = "first four";
                    this.character.skills.firstFour = this.character.skills.firstFour - 1;
                    sourceLegend = "^^+";

                } else if (skill.isCareer) {
                    //usual cost.
                    skillOrigin = "purchase";
                    xpSpent = adjustedRank * 5;

                } else {
                    skillOrigin = "purchase";
                    xpSpent = (adjustedRank * 5) + 5;            
                }
            } // end of if (bonus) 

            //Purchase and Log
            if(this.spendXP(xpSpent, "skill")) {

                //make and push the log, to help with refunding and resets later.
                var log = {
                    id: skill.id,
                    skill: skill.name,
                    xp: xpSpent,
                    previousRank: skill.ranks,
                    newRank: adjustedRank,
                    previousSource: skill.source,
                    source: skillOrigin,
                    isCareer: skill.isCareer,
                    isRacial: skill.isRacial,
                    sourceLegend: sourceLegend
                };
                
                this.character.skills.transactionLog.push(log);

                //record changes.
                this.character.skills.items[index].ranks = adjustedRank;
                this.character.skills.items[index].source = skillOrigin;
                this.character.skills.items[index].sourceLegend = sourceLegend;
                
                this.addItemAbility(skill, "Skill");                   

            } else {
                this.illegalLogic = "Didn't have the XP for this.";
                this.xpAlert = true;
                return false;
            }
            
            return true;
        },
        removeSkillRank: function(skill, amount, bonus=false) {
            //not within the adjustSkill because of refunding of bonuses. 
            //turn off alert.
            this.xpAlert = false;

            var s = this.findWithAttr(this.character.skills.items, "id", skill.id);

            var adjustedRank = this.character.skills.items[s].ranks + amount;

            var xpSpent = 0;        

            if (skill.source === "bonus" && bonus === false) {
                this.illegalLogic = "Can't take away from a bonus skill.";
                this.xpAlert = true;
                return false;
            }
            
            if (skill.source === "racial") {
                this.illegalLogic = "Can't take away from a default racial skill.";
                this.xpAlert = true;
                return false;
            }

            if (skill.source === "racial choice") {
                this.assignRacialSkills();
                xpSpent = 0;
            }

            if (adjustedRank < 0) return false;

            if (skill.isCareer === true && skill.source === "purchase") {
                //refund career skill.
                xpSpent = (skill.ranks * 5) * amount;
                
            } else if (skill.isCareer === false && skill.source === "racial non-career freebee") {
                //this was generated as a racial man!
		        this.character.skills.noncareerfreebees = this.character.skills.noncareerfreebees + 1;  
                skill.sourceLegend = "";              

            } else if (skill.source === "racial freebee") {
                //this was a free skill.
		        this.character.skills.freebees = this.character.skills.freebees + 1;                

            } else if (skill.source === "purchase") {
                //Wasn't a career, wasn't a racial bonus or bonus.
                xpSpent = ((skill.ranks * 5) + 5) * amount;
            } // end if skill check.

            //keep an arary of indexes where the skill was purchased.
            var logArray = []; 
            for (var l = 0; l < this.character.skills.transactionLog.length; l++) {
                //look at the transaction history
                if (this.character.skills.transactionLog[l].id === skill.id) {
                    //skill matches
                    if (skill.ranks === this.character.skills.transactionLog[l].newRank) {                                                                                                                                  
                        
                        if (this.character.skills.transactionLog[l].source === "first four") {
                            this.character.skills.firstFour = this.character.skills.firstFour + 1;
                            skill.sourceLegend = "^";
                        }

                        if (this.character.skills.transactionLog[l].source === "racial non-career freebee") {
                            skill.sourceLegend = "";
                        }

                        if (this.character.skills.transactionLog[l].source === "racial freebee") {
                            skill.sourceLegend = skill.isCareer ? "^" : "";
                        }
                        //
                        //racial freebee
                        //update skill's origin and source accordingly...
                        skill.source = this.character.skills.transactionLog[l].previousSource;

                        logArray.push(l);
                    } 
                } 
            }

            if(this.spendXP(xpSpent, "skill")) {

                this.character.skills.items[s].ranks = adjustedRank;   
                this.character.skills.items[s].source = skill.source;
                this.character.skills.items[s].sourceLegend = skill.sourceLegend;                
                
                //remove skill ranking.
                for(var z = 0; z < logArray.length; z++) this.character.skills.transactionLog.splice(logArray[z],1);

                //if there are actions assoicated with the skill, get em out of here.
                this.removeItemAbility(skill, "skill");
            }           

            return true;     
        },
        spendXP: function (amount, category) {
            
            var oldXP = this.character.xp.total;

            var newValue = 0;

            newValue = oldXP - amount;

            if (newValue < 0) return false;            

            this.character.xp.totalSpent += amount;

            this.character.xp.total = newValue;       

            return true;
        },       
        assignDerivedCharacteristics: function () {
            /*Derived       
                0    { name: "Current Encumbrance", value: 0 },    
                1    { name: "Encumbrance Capacity", value: 0 },
                2    { name: "Melee Defense", value: 0 },
                3    { name: "Ranged Defense", value: 0 },
                4    { name: "Soak", value: 0 },
                5    { name: "Strain Threshold", value: 0 },
                6    { name: "Wounds Threshold", value: 0 }
            */
            
            /* at times, items or talents give bonuses to characteristics. Apply them here. */
            this.character.stats.characteristics[0].value += this.character.stats.bonusAgility;
            this.character.stats.characteristics[1].value += this.character.stats.bonusBrawn;
            this.character.stats.characteristics[2].value += this.character.stats.bonusCunning;
            this.character.stats.characteristics[3].value += this.character.stats.bonusIntellect;
            this.character.stats.characteristics[4].value += this.character.stats.bonusPresence;
            this.character.stats.characteristics[5].value += this.character.stats.bonusWillpower;

            this.character.stats.derivedCharacteristics[0].value = 0;

            this.character.stats.derivedCharacteristics[1].value = this.character.stats.derivedstartingCharacteristics[1].value + this.character.stats.characteristics[1].value;

            this.character.stats.derivedCharacteristics[2].value = this.character.stats.derivedstartingCharacteristics[2].value;
            this.character.stats.derivedCharacteristics[2].value += this.character.stats.bonusMeleeDefense;

            this.character.stats.derivedCharacteristics[3].value = this.character.stats.derivedstartingCharacteristics[3].value;
            this.character.stats.derivedCharacteristics[3].value += this.character.stats.bonusRangedDefense;
            
            this.character.stats.derivedCharacteristics[4].value = this.character.stats.derivedstartingCharacteristics[4].value + this.character.stats.characteristics[1].value;
            this.character.stats.derivedCharacteristics[4].value += this.character.stats.bonusSoak;

            this.character.stats.derivedCharacteristics[5].value = this.character.stats.derivedstartingCharacteristics[5].value + this.character.stats.characteristics[5].value;
            this.character.stats.derivedCharacteristics[5].value += this.character.stats.bonusStrain;

            this.character.stats.derivedCharacteristics[6].value = this.character.stats.derivedstartingCharacteristics[6].value + this.character.stats.characteristics[1].value;
            this.character.stats.derivedCharacteristics[6].value += this.character.stats.bonusWounds;
                    
            for(var i = 0; i < this.character.equipment.inventory.items.length; i++) {

                var inv = this.character.equipment.inventory.items[i];
                var usedEncum = 0;
                
                inv.isWorn ? usedEncum = inv.wornEncumbrance : usedEncum = inv.encumbrance;

                this.character.stats.derivedCharacteristics[0].value = this.character.stats.derivedCharacteristics[0].value + usedEncum;
            }   
            return true;                                            
        },
        cleanSkills: function (clearRacial = false, clearBonus = false) {
            
            var xpSpent = 0;
            var shouldRemove = true;
            var spliceIndices = [];
            var logs = this.character.skills.transactionLog;
            var max = this.character.skills.transactionLog.length - 1;

            //clear out skills.
            for(var x = max; x >= 0; x--) {

                var log = logs[x];
                
                var skillIndex = this.findWithAttr(this.character.skills.items, "id", log.id);

                if (log.source === 'bonus' && clearBonus === false) shouldRemove = false;
                if (log.source === 'racial choice' && clearRacial === false) shouldRemove = false;
                
                if (shouldRemove && skillIndex >= 0) {

                    logs[x].shouldRemove = true;

                    this.character.skills.items[skillIndex].ranks = log.previousRank;
                    this.character.skills.items[skillIndex].source = log.previousSource;

                    if (log.source === 'first four') {
                        this.character.skills.firstFour += 1;
                    }

                    this.character.xp.total += log.xp;
                    this.character.xp.totalSpent -= log.xp;

                    spliceIndices.push(x);

                    //remove abilities
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", log.id);
                                        
                    if (abilityIndexes.length > 0) {
                    
                        for(var j = 0; j < abilityIndexes.length; j++) {        
                    
                            var ability = this.abilityData[abilityIndexes[j]];       
                    
                            var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);   
                                                                               

                            if (this.character.skills.items[skillIndex].ranks === 0) {
                                this.character.abilities.splice(abilityIndex, 1);
                                this.abilityTableRows = this.character.abilities.length;                            
                            }
                        }                    

                    }
                }
            }

            for(var z = 0; z < spliceIndices.length; z++) {
                this.character.skills.transactionLog.splice(spliceIndices[z], 1);
            }                   

            return true;
        },
        cleanTalents: function (clearRacial = false, clearBonus = false) {
            
            var xpSpent = 0;
            var shouldRemove = true;
            var spliceIndices = [];
            var logs = this.character.talents.transactionLog;
            var max = this.character.talents.transactionLog.length - 1;

            for(var x = max; x >= 0; x--) {

                var log = logs[x];
                
                var talentIndex = this.findWithAttr(this.character.talents.items, "id", log.id);

                if (log.source === 'bonus' && clearBonus === false) shouldRemove = false;
                if (log.source === 'racial choice' && clearRacial === false) shouldRemove = false;
                
                if (shouldRemove && talentIndex >= 0) {

                    logs[x].shouldRemove = true;

                    this.character.talents.items[talentIndex].ranks = log.priorRank;
                    this.character.talents.items[talentIndex].source = log.source;
                    this.character.talents.items[talentIndex].tierDisplay = "Tier: " + log.priorTier;
                    this.character.talents.items[talentIndex].tier = log.priorTier;                       

                    this.character.xp.total += log.xp;
                    this.character.xp.totalSpent -= log.xp;

                    spliceIndices.push(x);

                    //remove abilities
                    var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", log.id);
                                        
                    if (abilityIndexes.length > 0) {
                    
                        for(var j = 0; j < abilityIndexes.length; j++) {        
                    
                            var ability = this.abilityData[abilityIndexes[j]];       
                    
                            var abilityIndex = this.findWithAttr(this.character.abilities, "source", ability.source);   
                                                                               

                            if (this.character.talents.items[talentIndex].ranks === 0) {
                                this.character.abilities.splice(abilityIndex, 1);
                                this.abilityTableRows = this.character.abilities.length;                            
                            }
                        }                    

                    }
                }
            }

            for(var z = 0; z < spliceIndices.length; z++) {
                this.character.talents.transactionLog.splice(spliceIndices[z], 1);
            }

            this.setTalentTieringLimits();
            return true;
        },
        assignRacialSkills: function () {

            if (!this.cleanSkills(true, true)) return false;

            //racial index
            var ri = this.findWithAttr(this.raceData, "id", this.selectedRace);
            
            for(var s = 0; s < this.character.skills.items.length; s++) {                

                switch(this.raceData[ri].id) {
                    case "R1":
                        
                        if (["Knowledge: Mortality", "Knowledge: Natural","Knowledge: Paranormal","Knowledge: Systems"].indexOf(this.character.skills.items[s].name) >=0) {
                                                             
                            this.character.skills.items[s].isRacial = true;
                            this.character.skills.items[s].canBeFreebee = true;
                            this.character.skills.items[s].source = "racial possibility";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "?R"
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R2":

                        if (this.character.skills.items[s].name === "Perception") {                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;    
                            this.character.skills.items[s].source = "racial";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: "racial",
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);                          
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                            
                        }
                        break;

                    case "R3":
                        
                        if (["Gunnery", "Mechanics", "Operating", "Skulduggery", "Streetwise", "Survival"].indexOf(this.character.skills.items[s].name) >=0) {
                                                             
                            this.character.skills.items[s].isRacial = true;      
                            this.character.skills.items[s].canBeFreebee = true;                                            
                            this.character.skills.items[s].source = "racial possibility";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "?R"
                            
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                            
                        }    
                        break;

                    case "R4":

                        if (this.character.skills.items[s].name === "Brawl") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial"; 
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }                        
                        break;

                    case "R5":

                        if (this.character.skills.items[s].name === "Perception") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial"; 
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R6":

                        if (this.character.skills.items[s].name === "Resilience") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial"; 
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R7":

                        if (this.character.skills.items[s].name === "Coercion") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial"; 
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R8":

                        if (this.character.skills.items[s].name === "Discipline") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial"; 
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R9":

                        if (this.character.skills.items[s].name === "Coercion") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial"; 
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R11":        
                        this.character.skills.freebees = 2;       
                        break;

                    case "R12":
                        
                        if (["Athletics", "Coordination", "Resilience"].indexOf(this.character.skills.items[s].name) >=0) {
                                                             
                            this.character.skills.items[s].isRacial = true;      
                            this.character.skills.items[s].canBeFreebee = true;                                            
                            this.character.skills.items[s].source = "racial possibility"; 
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "?R"
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }    
                        break;
                        
                    case "R14":
                        this.character.skills.firstFour = 6;
                        break;

                    case "R15":

                        if (this.character.skills.items[s].name === "Knowledge") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial";  
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R16":
                        this.character.skills.noncareerfreebees = 2;
                        break;

                    case "R17":

                        if (this.character.skills.items[s].name === "Athletics") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial";    
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R18":

                        if (this.character.skills.items[s].name === "Knowledge") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial";    
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;

                    case "R19":

                        if (this.character.skills.items[s].name === "Cool") {
                            
                            this.character.skills.items[s].ranks = 1;                                   
                            this.character.skills.items[s].isRacial = true;                            
                            this.character.skills.items[s].isFreebee = true;                                                 
                            this.character.skills.items[s].source = "racial";  
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^R" : "R"

                            var log = {
                                id: this.character.skills.items[s].id,
                                skill: this.character.skills.items[s].name,
                                xp: 0,
                                previousRank: this.character.skills.items[s].ranks,
                                newRank: this.character.skills.items[s].ranks,
                                previousSource: "out-of-the-box",
                                source: this.character.skills.items[s].source,
                                isCareer: this.character.skills.items[s].isCareer,
                                sourceLegend: this.character.skills.items[s].sourceLegend
                            };
                
                            this.character.skills.transactionLog.push(log);
                        } else {
                            this.character.skills.items[s].isRacial = false;
                            this.character.skills.items[s].canBeFreebee = false;
                            this.character.skills.items[s].source = "out-of-the-box";
                            this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isCareer ? "^" : ""
                        }
                        break;
                }
                
            }

            return true;
        },
        assignRacialCharacteristics: function () {
            for(var i = 0; i < this.raceData.length; i++) {
                if(this.raceData[i].id === this.selectedRace) {
                                       
                    this.character.stats.startingCharacteristics = this.raceData[i].characteristics;

                    this.character.stats.characteristics = this.raceData[i].characteristics;
                    
                    this.character.stats.derivedstartingCharacteristics = this.raceData[i].derivedCharacteristics;

                    this.character.xp.total = this.raceData[i].startingXP;
                    this.character.xp.starting = this.raceData[i].startingXP;

                    this.character.xp.totalSpent = 0;                    
                }
            }  
            return true;              
        }, 
        grantCareerBoost: function () {
            
            this.clearoutBonus();
            
            var roll = Math.floor(Math.random() * 20) + 1;            
            var index = 0;
            this.rolledCareer = true;

            var gear = [];
            var talent = [];
            var weapon = [];
            var armor = [];
            var skill = [];
            
            switch(this.selectedCareer) {
                case "TEST": 
                    index = this.findWithAttr(this.character.equipment.gear.items, "id", "G12");
                    gear = this.character.equipment.gear.items[index];
                    this.adjustGearInventory(gear, 1, true);     
                    
                    index = this.findWithAttr(this.character.talents.items, "id", "T58");
                    talent = this.character.talents.items[index];
                    this.adjustTalentTiering(talent, 1, true);

                    index = this.findWithAttr(this.character.equipment.armor.items, "id", "A6");
                    armor = this.character.equipment.armor.items[index];
                    this.adjustArmorInventory(armor, 1, true);

                    index = this.findWithAttr(this.character.skills.items, "id", "S62");
                    skill = this.character.skills.items[index];
                    this.adjustSkillRank(skill, 1, true);
                                            
                    break;
                    
                case "Arcanist":
                    switch(roll) {
                        case 1:
                        case 2: 
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G12");
                            gear = this.character.equipment.gear.items[index];
                            this.character.bonusGiven = gear.name + "(1)";
                            this.adjustGearInventory(gear, 1, true);                            
                            break;
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            index = this.findWithAttr(this.character.talents.items, "id", "T58");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);       
                            this.character.bonusGiven = talent.name + "(1)";                     
                            break;
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            index = this.findWithAttr(this.character.talents.items, "id", "T6");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            this.character.bonusGiven = talent.name + "(1)";                         
                            break;
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T23");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);      
                            this.character.bonusGiven = talent.name + "(1)";                      
                            break;
                        case 13:
                        case 14:
                            index = this.findWithAttr(this.character.talents.items, "id", "T39");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);      
                            this.character.bonusGiven = talent.name + "(1)";                      
                            break;
                        case 15:
                        case 16:                            
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G10");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);        
                            this.character.bonusGiven = gear.name + "(1)";                    
                            break;
                        case 17:
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G23");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);    
                            this.character.bonusGiven = gear.name + "(1)";                        
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G15");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);    
                            this.character.bonusGiven = gear.name + "(1)";                        
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
                            this.character.bonusGiven = gear.name + "(1)";
                            break;
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                            this.character.equipment.money += 150;
                            this.character.bonusGiven = "+150 Money";
                            break;
                        case 11:
                        case 12:
                        case 13:
                            index = this.findWithAttr(this.character.talents.items, "id", "T45");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T14");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T10");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A6");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            this.character.bonusGiven = armor.name + "(1)";
                            break;
                    }     
                    break;              
                case "Druid":
                    switch(roll) {
                        case 1:
                        case 2: 
                        case 3:
                        case 4:
                            index = this.findWithAttr(this.character.talents.items, "id", "T60");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            index = this.findWithAttr(this.character.talents.items, "id", "T52");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T59");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 13:                            
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T23");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 16:
                        case 17:
                            index = this.findWithAttr(this.character.talents.items, "id", "T2");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T52");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A5");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            this.character.bonusGiven = armor.name + "(1)";
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
                            this.character.bonusGiven = armor.name + "(1)";
                            break;
                        case 6:
                        case 7:
                            index = this.findWithAttr(this.character.talents.items, "id", "T34");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 8:
                        case 9:
                        case 10:
                            index = this.findWithAttr(this.character.talents.items, "id", "T15");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 11:
                        case 12:
                        case 13:  
                            index = this.findWithAttr(this.character.talents.items, "id", "T13");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";   
                            break;                    
                        case 14:
                        case 15:
                        case 16:
                            index = this.findWithAttr(this.character.talents.items, "id", "T36");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";                                                        
                            break;
                        case 17:
                        case 18:
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T7");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.skills.items, "id", "S62");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            this.character.bonusGiven = skill.name + "(1)";
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
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W40");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";
                            break;
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A3");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            this.character.bonusGiven = armor.name + "(1)";
                            break;
                        case 13:                                     
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W14");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);  
                            this.character.bonusGiven = weapon.name + "(1)";         
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W22");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);  
                            this.character.bonusGiven = this.character.bonusGiven + " and " + weapon.name + "(1)";
                            break;
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W38");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";   
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W33");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";   
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
                            for(var g = 1; g <= 5; g++) {
                                this.adjustGearInventory(gear, 1, true);
                            }
                            this.character.bonusGiven = gear.name + "(5)";   
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G12");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = gear.name + "(1)"; 
                            break;
                        case 10:
                        case 11:
                            index = this.findWithAttr(this.character.talents.items, "id", "T45");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 12:
                        case 13:   
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W10");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true); 
                            break;                                   
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W24");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true); 
                            break; 
                        case 16:
                        case 17:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W34");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            break;
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W21");
							weapon = this.character.equipment.weapons.items[index];
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
                            this.adjustGearInventory(gear, 1, true);                            
                            break;
                        case 7:
                        case 8:
                        case 9:                            
                        case 10:
                            index = this.findWithAttr(this.character.talents.items, "id", "T33");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;
                        case 11:
                        case 12:
                        case 13:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T47");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true); 
                            this.character.bonusGiven = talent.name + "(1)";
                            break;                                
                        case 14:
                        case 15: 
                        case 16:
                        case 17:
                            index = this.findWithAttr(this.character.talents.items, "id", "T17");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true); 
                            this.character.bonusGiven = talent.name + "(1)";
                            break;  
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W8");
                            weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W25");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";
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
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W16");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W22");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = this.character.bonusGiven + " and " + weapon.name + "(1)";
                            break;
                        case 6:
                        case 7:
                        case 8:
                        case 9: 
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W10");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true); 
                            this.character.bonusGiven = weapon.name + "(1)"   
                            break;                        
                        case 10:
                        case 11:
                        case 12:
                        case 13:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T13");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;                               
                        case 14:
                        case 15: 
                        case 16:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A1");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            this.character.bonusGiven = armor.name + "(1)"
                            break;
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T63");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"  
                            break;         
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W25");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)"  
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
                            this.character.bonusGiven = skill.name + "(1)"  
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            index = this.findWithAttr(this.character.talents.items, "id", "T61");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"  
                            break;
                        case 9:                          
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T48");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"  
                            break;
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T23");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"  
                            break; 
                        case 16:
                        case 17: 
                        case 18:         
                        case 19:
                            this.character.xp.careerBoost = 5;
                            this.character.xp.total = this.character.xp.total + 5;  
                            this.character.bonusGiven = "+5 Xp";
                            break;
                        case 20:
                            this.character.xp.careerBoost = 10;
                            this.character.xp.total = this.character.xp.total + 10;  
                            this.character.bonusGiven = "+10 Xp";
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
                            for(var g = 1; g <= 5; g++) {
                                this.adjustGearInventory(gear, 1, true);
                            }
                            this.character.bonusGiven = gear.name + "(5)"
                            break;
                        case 7:
                        case 8:
                        case 9:    
                            index = this.findWithAttr(this.character.talents.items, "id", "T9");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"    
                            break;                    
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W29");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)"
                            break;
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T24");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            this.character.bonusGiven = talent.name + "(1)"
                            break;
                        case 16:
                        case 17: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T27");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"
                            break;
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T52");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"
                            break;     
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W25");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)"
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
                            index = this.findWithAttr(this.character.talents.items, "id", "T41");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            this.character.bonusGiven = talent.name + "(1)"  
                            break;   
                        case 7:
                        case 8:
                        case 9:        
                            index = this.findWithAttr(this.character.talents.items, "id", "T63");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);    
                            this.character.bonusGiven = talent.name + "(1)"
                            break;            
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W5");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)"
                            break;
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W22");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)"
                            break;
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T37");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)"
                            break;
                        case 16:
                        case 17: 
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W6");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)"
                            break;
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T40");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);   
                            this.character.bonusGiven = talent.name + "(1)"
                            break; 
                        case 20:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W11");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)"
                            break;
                    }
                    break;    
                case "Refugee":
                    switch(roll) {
                        case 1:
                        case 2: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T64");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true); 
                            this.character.bonusGiven = talent.name + "(1)";   
                            break; 
                        case 3:
                        case 4:
                            index = this.findWithAttr(this.character.talents.items, "id", "T23");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break; 
                        case 5:
                        case 6:    
                            index = this.findWithAttr(this.character.skills.items, "id", "S37");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            this.character.bonusGiven = skill.name + "(1)";
                            break;
                        case 7:
                        case 8: 
                            this.character.xp.careerBoost = 5;
                            this.character.xp.total = this.character.xp.total + 5;  
                            this.character.bonusGiven = "+5 Xp";
                            break;
                        case 9:               
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G11");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = gear.name + "(1)";
                            break;
                        case 13:                                  
                        case 14:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G5");
                            gear = this.character.equipment.gear.items[index];
                            for(var g = 1; g <= 5; g++) {
                                this.adjustGearInventory(gear, 1, true);
                            }
                            this.character.bonusGiven = gear.name + "(1)";
                            break;
                        case 15:
                        case 16:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A2");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            this.character.bonusGiven = armor.name + "(1)";
                            break;
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W26");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";
                            break;
                        case 20:
                            this.character.xp.careerBoost = 10;
                            this.character.xp.total = this.character.xp.total + 10;  
                            this.character.bonusGiven = "+10 Xp";                        
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
                            this.character.bonusGiven = skill.name + "(1)";
                            break;
                        case 5:
                        case 6:    
                        case 7:
                            index = this.findWithAttr(this.character.talents.items, "id", "T7");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            this.character.bonusGiven = talent.name + "(1)";    
                            break; 
                        case 8: 
                        case 9:               
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T59");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            this.character.bonusGiven = talent.name + "(1)";    
                            break; 
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.talents.items, "id", "T60");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);     
                            this.character.bonusGiven = talent.name + "(1)"; 
                            break; 
                        case 16:
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.talents.items, "id", "T19");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);  
                            this.character.bonusGiven = talent.name + "(1)";    
                            break; 
                        case 20:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G16");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = gear.name + "(1)";  
                            break;
                    }
                    break;     
                case "Storm Trooper":
                    switch(roll) {
                        case 1:
                        case 2:  
                        case 3:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W34");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";   
                            break;
                        case 4:
                        case 5:
                        case 6: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T24");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";     
                            break;    
                        case 7:
                        case 8: 
                        case 9:   
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W13");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";
                            break;
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W22");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = this.character.bonusGiven  + " and " + talent.name + "(1)";
                            break;            
                        case 10:
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T46");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";   
                            break; 
                        case 13:                                  
                        case 14:
                        case 15:
                            index = this.findWithAttr(this.character.equipment.weapons.items, "id", "W28");
							weapon = this.character.equipment.weapons.items[index];
                            this.adjustWeaponInventory(weapon, 1, true);
                            this.character.bonusGiven = weapon.name + "(1)";
                            break; 
                        case 16:
                        case 17: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T47");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break; 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.skills.items, "id", "S29");
                            skill = this.character.skills.items[index];
                            this.adjustSkillRank(skill, 1, true);
                            this.character.bonusGiven = skill.name + "(1)";
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A4");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            this.character.bonusGiven = armor.name + "(1)";  
                            break;
                    }
                    break;      
                case "Warlock":
                    switch(roll) {
                        case 1:
                        case 2:  
                        case 3:
                            index = this.findWithAttr(this.character.talents.items, "id", "T36");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";  
                            break;  
                        case 4:
                        case 5:
                            index = this.findWithAttr(this.character.talents.items, "id", "T2");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";      
                            break;  
                        case 6:  
                        case 7:
                            index = this.findWithAttr(this.character.talents.items, "id", "T30");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";    
                            break;    
                        case 8: 
                        case 9:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T1");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";  
                            break;              
                        case 10:
                        case 11:
                        case 12:
                        case 13: 
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G10");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = gear.name + "(1)";
                            break;                                 
                        case 14:
                        case 15:
                        case 16:
                            index = this.findWithAttr(this.character.talents.items, "id", "T37");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true); 
                            this.character.bonusGiven = talent.name + "(1)";   
                            break;  
                        case 17: 
                        case 18:         
                        case 19:
                            index = this.findWithAttr(this.character.equipment.armor.items, "id", "A5");
							armor = this.character.equipment.armor.items[index];
                            this.adjustArmorInventory(armor, 1, true);
                            this.character.bonusGiven = armor.name + "(1)";
                            break;
                        case 20:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G18");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = gear.name + "(1)";
                            break;  
                    }
                    break;      
                case "Worker":
                    switch(roll) {
                        case 1:
                        case 2:  
                            this.character.xp.careerBoost = 5;
                            this.character.xp.total = this.character.xp.total + 5;
                            this.character.bonusGiven = "+5 Xp";
                            break;
                        case 3:
                        case 4:
                        case 5:   
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G1");
                            gear = this.character.equipment.gear.items[index];
                            for(var g = 1; g <= 2; g++) {
                                this.adjustGearInventory(gear, 1, true);
                            }
                            this.character.bonusGiven = gear.name + "(2)";
                            
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G2");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = this.character.bonusGiven + " and " + gear.name + "(1)";

                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G3");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = this.character.bonusGiven + " and " + gear.name + "(1)";
                            break;                          
                        case 6: 
                        case 7:                            
                        case 8: 
                            index = this.findWithAttr(this.character.talents.items, "id", "T54");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;  
                        case 9:   
                        case 10:
                            index = this.findWithAttr(this.character.equipment.gear.items, "id", "G18");
                            gear = this.character.equipment.gear.items[index];
                            this.adjustGearInventory(gear, 1, true);
                            this.character.bonusGiven = gear.name + "(1)";
                            break;  
                        case 11:
                        case 12:
                            index = this.findWithAttr(this.character.talents.items, "id", "T64");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;  
                        case 13:                              
                        case 14:
                            index = this.findWithAttr(this.character.talents.items, "id", "T27");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;  
                        case 15:
                        case 16:
                        case 17: 
                        case 18:   
                            index = this.findWithAttr(this.character.talents.items, "id", "T32");
							talent = this.character.talents.items[index];
                            this.adjustTalentTiering(talent, 1, true);
                            this.character.bonusGiven = talent.name + "(1)";
                            break;        
                        case 19:
                        case 20:
                            this.character.xp.careerBoost = 10;
                            this.character.xp.total = this.character.xp.total + 10;
                            this.character.bonusGiven = "+10 Xp";
                            break;
                    }
                    break;                                                                          
            }

            return true;
        },    
        assignCareerSkills: function () {
                                    
            //this.cleanSkills(false, false);

            for(var i = 0; i < this.careerData.length; i++) {
                
                if(this.careerData[i].name === this.selectedCareer) {
                    this.character.skills.career = this.careerData[i].careerSkills;
                }        
            }

            for(var s = 0; s < this.character.skills.items.length; s++) {
                //marks as career
                if(this.character.skills.career.indexOf(this.character.skills.items[s].name) >= 0){
                    this.character.skills.items[s].isCareer = true;
                    this.character.skills.items[s].sourceLegend = this.character.skills.items[s].isRacial ? "^R" : "^"
                }        
            }    
            return true;                   
        },
        castSelectableRaces: function () {

            this.sheet.selectableRaces = [];              

            this.sheet.selectableRaces.push('');

            for (var i = 0; i < this.raceData.length; i ++){
                
                var n = this.raceData[i].genre.search(this.selectedGenre);
                
                if (n >= 0) {
                    var r = {
                        value: this.raceData[i].id,
                        text: this.raceData[i].name
                    }

                    this.sheet.selectableRaces.push(r);
                }            
            };

            this.sheet.selectableRaces = this.sheet.selectableRaces.sort();

            return true;
        },
        castSelectableCareers: function () {

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
            return true;
        },
        castActiveSkills: function () {
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
                        source: "out-of-the-box",
                        abilityId: "",
                        sourceLegend: " "      
                    };          
                                    
                    skillList.push(s);
                }                
            }
            
            this.character.skills.items = skillList;
            this.skillTableRows = skillList.length;
            return true;
        },
        castTalents: function () {

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
                            originalTier: this.talentData[x].tier,
                            tier: this.talentData[x].tier,                                                                        
                            ranked: this.talentData[x].isRanked,
                            description: this.talentData[x].alteredText,
                            sourcing: this.talentData[x].sourcing,
                            tags: this.talentData[x].tags, 
                            sourceLegend: " ",    
                                
                            originalTier: this.talentData[x].originalTier,
                            source: "out-of-the-box",             
                            ranks: 0
                        };

                        talentList.push(t);
                                        
                    }
                }
            }
            
            var tList = talentList.slice(0);
            
            tList.sort(function (a, b) {
                var xTier = a.tier;
                var yTier = b.tier;
                var xName = a.name;
                var yName = b.name;                
                return (xTier < yTier) ? -1 : (xTier > yTier) ? 1 : ( (xName < yName) ? -1 : (yName > xName) ? 1 : 0);            
            })

            this.character.talents.items = tList;
                            
            this.talentTableRows = this.character.talents.items.length;

            this.setTalentTieringLimits();
            return true;
        },
        addRacialAbilities: function () {
                               
            ///if there are any abilities, slap them in!
            var abilityIndexes = this.getAllIndexesWithAttr(this.abilityData, "id", this.selectedRace);
            
            for(var x = 0; x < abilityIndexes.length; x++) {        
                    
                var ability = this.abilityData[abilityIndexes[x]];      

                var index = this.findWithAttr(this.character.abilities, "source", ability.source);    

                if (index <= 0) {
                    this.character.abilities.push(ability);
                    this.abilityTableRows = this.character.abilities.length;
                }                                        
            }
            return true;
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
                var r = {
                    value: this.raceData[i].id,
                    text: this.raceData[i].name
                }
                
                this.sheet.selectableRaces.push(r);
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
                    source: "out-of-the-box",
                    sourceLegend: " "         
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
                        originalTier: this.talentData[x].tier,
                        tier: this.talentData[x].tier,                                                                        
                        ranked: this.talentData[x].isRanked,
                        description: this.talentData[x].alteredText,
                        sourcing: this.talentData[x].sourcing,
                        tags: this.talentData[x].tags,
                        sourceLegend: " ",
 
                        originalTier: this.talentData[x].originalTier,
                        source: "out-of-the-box",             
                        ranks: 0
                    };

                    talentList.push(t);
                }
            }
        }

        var tList = talentList.slice(0);
        
        tList.sort(function (a, b) {
            var xHeader = a.tierDisplay;
            var yHeader = b.tierDisplay;
            var xName = a.name;
            var yName = b.name;                
            return (xHeader < yHeader) ? -1 : (xHeader > yHeader) ? 1 : ( (xName < yName) ? -1 : (yName > xName) ? 1 : 0);            
        })
        
        this.character.talents.items = tList;

        this.talentTableRows = this.character.talents.items.length;

        this.setTalentTieringLimits();

        const armorList = [];

        for(var i = 0; i < this.armorData.length; i++) {
            var armor = this.armorData[i];
            armor.quantity = 0;
            armor.qualityText = "";        
            armor.hasSpecials = true;       
            armor.hasQualities = true;    
            armor.itemType = "armor";
            armor.source = " ";

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
            weapon.source = " ";

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
            gear.source = " ";

            if(this.gearData[i].specialAbilities === "undefined") {
            } else {
                gear.hasSpecials = true;
            }

            gearList.push(gear);
        }

        this.character.equipment.gear.items = gearList;   

        this.gearShopTableRows = gearList.length;     
    }    
}
</script>