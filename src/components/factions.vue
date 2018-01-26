<template>
    <div class="p-3 mx-3 text-left bg-light">
        <b-container>

            <b-row>
                <b-col> <h1> <strong> The Six Factions </strong> </h1> 
                <p> 
                    Powerful governments that have risen through terrible bloodshed are warring amongst themselves in an all-out intense effort to control all of North America. 
                    Life for the “common Joe” person is service to their government through military, industrial, or agricultural slavery towards this purpose. 
                </p>
                <p>                    
                    Broadly speaking, here's how they're structured. Feel free to click on the link, which will open to a wiki page explaining the structure, 
                    source or ideological type further.
                </p>
                <hr>
                <b-table responsive="sm" small dark stripped bordered head-variant="light" :items="someData" :fields="fields">                    
                    <template slot="structure" slot-scope="data"> <b-link class="text-muted" target="_blank" v-bind:href="data.item.power_structure_href"> {{ data.item.power_structure }} </b-link> </template>
                    <template slot="source" slot-scope="data"> <b-link class="text-muted"  target="_blank" v-bind:href="data.item.power_source_href"> {{ data.item.power_source }} </b-link> </template>
                    <template slot="ideology" slot-scope="data"> <b-link class="text-muted"  target="_blank" v-bind:href="data.item.power_ideology_href"> {{ data.item.power_ideology }} </b-link> </template>
                </b-table>
                </b-col>
            </b-row>

            <b-row><b-col><p>
                The follow are broad explanations of what the major governments are and what they're about. Details will be fleshed out later in books and other content. 
            </p> </b-col> </b-row>
            
                <b-row> <b-col>
                    <b-card 
                        header="<h3>Confederation of Canada</h3>" 
                        sub-title=" <em><p>The freaks thought they could annihilate us. We burned them alive. 
                                    The brutes thought they were stronger than us. They lie dead in the frozen craters they called home. 
                                    We will protect our sons and daughters. We will restore order to this world.</em></p>
                                    <p>- Red Councilmember Steven Gemini</p>"                                                
                        footer-border-variant="danger"
                        bg-variant="dark" 
                        text-variant="light"> 
                        <p> 
                            The less populous Canadian cities that remained went on to form the Confederation of Canada, a brutal nationalistic and xenophobic fascist republic 
                            with multi-layered areas of jurisdiction. They are very much against Elf-kind, magic, and most things industrial.
                        </p>
                        <p>
                            Yet, while magic is strictly outlawed, they embrace shamanism and druidism to satisfy magical needs as a means to an end. The culture sees 
                            primal magic as a natural state, and thus allowed. While they shun industrialism, the Confederate military is a formidable one. Clever series of traps, bottleneck forts, 
                            and secret police ensure that their territory is secure while clandestine operations wound invasion attempts. 
                            
                        </p>
                        <p> Their foreign policy is that if you are not a confederate or confederate property, you are a threat that needs to be neutralized.  
                        </p>                                         
                        <div slot="footer" class="text-muted"> Confederation, Stratocracy, Totalitarianism </div>
                    </b-card> 
                    <p> </p>
                    <b-card 
                        header="<h3>Holy American Empire</h3>" 
                        sub-title=" <em><p>Know that my prayers are not ornate beads or simple thoughts. No. This gun is my cross and the bullets that fly out of it are my prayers. 
                                    Continue your duty and someday you will be praying with me. We’ll be together, spreading the Lord’s words into the flesh of those that need to hear them.</em></p>
                                    <p>- War Cleric Alexander The Pure </p>"                                                
                        footer-border-variant="warning"
                        bg-variant="dark" 
                        text-variant="light"> 
                        <p> 
                            A once well meaning movement became an twisted and deranged empire dependant of slave labor seemingly overnight. It is a theocratic empire that has a 
                            hierarchy very deep and complex. Those that are in the political system have grand titles, such as Arch Paladin or Magus, and are very over-the-top 
                            expressing their faith. Their political system is one of games and madness, playing and toying with innocent lives. Their temples are quite massive and 
                            very decorative, but non-religious buildings are nothing more than tin roofed shacks. 
                        </p>
                        <p>
                            They control their population through force, religious propaganda, holy magical rituals and providing a money-less economic system for citizens to 
                            acquire the basic requirements of life: everything is free. The catch being is that the quality of an item is terrible. Bread is stale, milk is sour 
                            and everything is either overcooked or undercooked. This is not true for those that serve the Empire. Those that serve get access to a better quality
                            of life.                             
                        </p>
                        <p> 
                            The Empire seeks to free the holy city of Salt Lake while defending its southern territory from the New American Republic.   
                        </p>                                         
                        <div slot="footer" class="text-muted"> Devolution, Theocracy, Socialism </div>
                    </b-card> 
                    <p> </p>
                    <b-card 
                        header="<h3>Imperium of the North</h3>" 
                        sub-title=" <em><p>
                                    So what that J'tun is hiding? We smash. We kill. We take. We are the same as before. We are strong with or without J'tun. Strong without J’tun because
                                     J’tun’s gift to us is strength that is forever. J'tun gave us strength to last. Are we not strong enough? If not, then we deserve to be taken from.
                                    </em></p>
                                    <p>- Grand Lord Oolmar Jawbone </p>"                                                
                        footer-border-variant="info"
                        bg-variant="dark" 
                        text-variant="light"> 
                        <p> 
                            A system of tribes and clans govern the icey shores of North America, the frozen forests of Alaska, the mysterious caves of Yukon, the small in-land coves of Greenland, 
                            and the volcanic remains of Iceland. This is known as the Imperium, for they all share the same customs and loose alliances with each other. The culture came out of a 
                            powerful ice giant, known as the Avatar J’tun, teaching Protohumans the ways of magic, governance, alchemy and sciences - structuring the Imperial Clan culture system. 
                        </p>
                        <p>The Imperial Clan structure is a hierarchical system.  Each clan belongs to another clan that is stronger than itself. Clans are given a chance to challenge their political status every month by either a political debate, conquest, quest or combat. The weakest clans are regarded as barely citizens of the Imperium while the strongest clans are to govern, command tribute and tax as they see fit. There is no real political or military offices of the Imperium. Each geographical region has their own borders, which are just called hunting lands. Within these lands, there could be several 
                            clans bidding to be the Grand Lord clan.                      
                        </p>
                        <p> 
                            In time of war or need, these clans will immediately cease grudges to band together into a larger clan to attack, raid or defend. They do not farm, they only take from the weak. 
                            Farming is for weaker creatures and slaves.
                        </p>                                         
                        <div slot="footer" class="text-muted"> Chiefdom, Kraterocracy, Tribalism </div>
                    </b-card> 
                    <p> </p>
                    <b-card 
                        header="<h3>Kingdom of Quebec</h3>" 
                        sub-title=" <em><p>
                                    We won these lands, not out of ambition but because of divine right! We freed many of our brothers and sisters from bondage. It is not enough though. It will never be enough until all Elf-kind rule the savage apes. We must continue to free the natural rulers of the land, and oppress the evil Humans and their Protohuman brutish cousins.
                                    </em></p>
                                    <p>- King Titus II: The New Anglo King victory speech in Augustus </p>"                                                                        
                        footer-border-variant="secondary"
                        bg-variant="dark" 
                        text-variant="light"> 
                        <p> 
                            An Elf-kind nation ruled by a complex economic and feudalist system pledging to the royal Elf-kind bloodline.This bloodline rules all within its realm and requires its subjects to this bloodline do so with honor, dignity and duty. 
                        </p>
                        <p>
                           However, if you are not an Elf-kind - you are subjected to a different set of standards. The Kingdom treats Humans and Protohumans as barbaric creatures, fit for only for slavery. Protohumans are sent to death camps to live their lives doing intense and dangerous work for the Crown, but are treated as if a Protohuman was incapable of sentient intellect or profound thought. Attitude towards humans are based around the idea that all humans are evil and are incapable of redemption. Murder, torture, bizarre experiments, cruel treatment of humans are all socially acceptable while in the kingdom.
                        </p>
                        <p> 
                             It is a sort of cultural belief that it is the Elf-kind right to rule all other races. This is the crown’s divine duty to achieve this goal. Citizens largely support this sentiment. This leads to a great national pride and faith in the Elven crown. As such, lots of the economy is based on the idea of conquest, enslaving people, and participating to the slave trade. Although, peasantry will say that conquering cities is in fact a liberation of a city. To them, slavery is aligning races to the natural order. 
                        </p>                                         
                        <div slot="footer" class="text-muted"> Unitary, Despotism, Legalist </div>
                    </b-card> 
                    <p> </p>
                    <b-card 
                        header="<h3>The New American Republic</h3>" 
                        sub-title=" <em><p>
                                    Brothers. Sisters. Cousins. We are at the verge of something wonderful. We are so close to unifying all of mortalkind to an age of glory and peace. We MUST continue to secure the lands that rightfully belong to US. Our constitution and way of life must be shared and practiced by all in the name of prosperity and righteousness!
                                    </em></p>
                                    <p>- Gregory Skycaster on his 15th inauguration address </p>"                                                
                        
                        footer-border-variant="primary"
                        bg-variant="dark" 
                        text-variant="light"> 
                        <p> 
                            Unlike the classical United States, the New American Republic focuses on dominance and suppression rather than freedom. It is not a republic, but an autocratic empire with a focus on dark alchemy and dark arts. As such, the New American Republic has the most advanced military and the most capable industry but a terrifying and eerie presence about their elite. A combination of damnable magic intertwined with machines or structures that unexplainably operate.
                        </p>
                        <p>
                            The landscape of the Republic is serenely eerie, devoid of life. This is because all citizens are within cities - serving the industrial military complex in one way or another in blood factories. These factories run on blood and souls spit out nightmarish machines that have souls trapped in them. These poor souls are usually prisoners of war or slaves, but can be from citizens themselves. Some citizens offer up their spirits in a way to provide for their family or join the Republic’s military, industry or judicial branches for civil service.
                        </p>
                        <p> 
                            Each major city in the Republic has a massive wall of bones, corpses, metal and wires to keep citizens in the walls. The New American Republic war machine has yet to be stopped.
                        </p>                                         
                        <div slot="footer" class="text-muted"> Empire, Mage Dictatorship, Dictatorship </div>
                    </b-card> 
                    <p> </p>
                    <b-card 
                        header="<h3>Western States Commonwealth</h3>" 
                        sub-title=" <em><p>
                                    You ask what of our classes, I will tell you young prince. Shamans from the deserts have their beliefs and magic, the Knights from the walled cities have their military might and ingenuity, and we Druids are blessed by the forever vengeful screams in our minds from The Living Tree. However, what do the peasants and slaves have? Peasants have loyalty and labor. Slaves only have labor. A peasant without loyalty is a slave in the making.
                                    </em></p>
                                    <p>- Druid Heartwood to Young Prince DeMarcus IV </p>"                                                
                        
                        footer-border-variant="success"
                        bg-variant="dark" 
                        text-variant="light"> 
                        <p> 
                            A wonderfully diverse feudalistic empire that is rich in its complexities and layered in political conspiracies. Seven bloodlines, two of which are Elf-kind, hold absolute power in every facet in the empire. These bloodlines compete and make political moves for total power while sharing economic and military resources. 
                        </p>
                        <p>
                            In the commonwealth, a person’s status allows access to better housing and opportunities. Status is gained by recognition by a Bloodline Prince, unquestionable loyalty to a Bloodline, or by being in a state-appointed position. These state appointed positions are Druid of the Living Tree, Shaman, Infantry Commander, Lord Merchant, Bloodline Administrator. All folk in the Commonwealth pledge a lifelong pledge to a particular Bloodline that can spill over to the next two generations. However, the Bloodline can trade this pledge among other Bloodlines for price. Slaves do not pledge and can be owned by anyone.
                        </p>
                        <p> 
                            The Commonwealth is a very superstitious place, as its magic is very ritual based. Technologically speaking, the Commonwealth is average. However, the Commonwealth is a very rich empire - outright buying treaties and alliances rather than engage in military conflicts. That is not to say that the Commonwealth is weak, they have some of the mightiest war engines in the lands bolstered by lethal unconventional magical warfare. 
                        </p>                                         
                        <div slot="footer" class="text-muted"> Hegemony, Aristocracy, Absolute </div>
                    </b-card> 




                </b-col> </b-row>    
        </b-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            fields : [
                { key: "name", label: "Name" },
                "structure",
                "source",
                "ideology"                
            ],
            someData: [
                {   name: "Confederacy of Canada", 
                    power_structure: "Confederation", power_structure_href: "https://en.wikipedia.org/wiki/Confederation",  
                    power_source: "Stratocracy", power_source_href: "https://en.wikipedia.org/wiki/Stratocracy", 
                    power_ideology: "Totalitarianism", power_ideology_href: "https://en.wikipedia.org/wiki/Totalitarianism"  
                },

                {   name: "Holy American Empire ", 
                    power_structure: "Devolution", power_structure_href: "https://en.wikipedia.org/wiki/Devolution",  
                    power_source: "Theocracy", power_source_href: "https://en.wikipedia.org/wiki/Theocracy", 
                    power_ideology: "Socialism", power_ideology_href: "https://en.wikipedia.org/wiki/Socialism"
                },

                {   name: "Imperium of the North", 
                    power_structure: "Chiefdom", power_structure_href: "https://en.wikipedia.org/wiki/Chiefdom",  
                    power_source: "Kraterocracy", power_source_href: "https://en.wikipedia.org/wiki/Might_makes_right", 
                    power_ideology: "Tribalism", power_ideology_href: "https://en.wikipedia.org/wiki/Tribalism"  
                },

                {   name: "Kingdom of Quebec", 
                    power_structure: "Unitary", power_structure_href: "https://en.wikipedia.org/wiki/Unitary_state",  
                    power_source: "Despotism", power_source_href: "https://en.wikipedia.org/wiki/Despotism", 
                    power_ideology: "Legalist", power_ideology_href: "https://en.wikipedia.org/wiki/Socialism"  
                },

                {   name: "New American Republic", 
                    power_structure: "Empire", power_structure_href: "https://en.wikipedia.org/wiki/Empire",  
                    power_source: "Mage Dictatorship", power_source_href: "https://en.wikipedia.org/wiki/Military_dictatorship", 
                    power_ideology: "Dictatorship", power_ideology_href: "https://en.wikipedia.org/wiki/Dictatorship"  
                },

                {   name: "Western State Commonwealth", 
                    power_structure: "Hegemony", power_structure_href: "https://en.wikipedia.org/wiki/Hegemony", 
                    power_source: "Aristocracy", power_source_href: "https://en.wikipedia.org/wiki/Aristocracy",
                    power_ideology: "Absolute", power_ideology_href: "https://en.wikipedia.org/wiki/Absolute_monarchy "  
                },
            ]
        }    
    }, 
    created () {       
        this.catalogType = this.id;

        console.log(this.catalogType);

        switch(this.catalogType) {
            case "race": 

                this.someData = require('../data/race.json');                
                
                var someList = [];                

                for(var i = 0; i < this.someData.length; i++){
                                        
                    var t = [];                    
                    t.name = this.someData[i].name;
                    t.header = "After Seven Race";
                    t.description = this.someData[i].description;
                    
                    t.arraySlot1 = this.someData[i].characteristics;
                    t.arraySlot2 = this.someData[i].racialSkills;
                    t.arraySlot3 = this.someData[i].racialAbilities;                    

                    this.arraySlot1Flag = true;
                    this.arraySlot2Flag = true;
                    this.arraySlot3Flag = true;
                    
                    this.arraySlot1Label = "Starting Characteristics";
                    this.arraySlot2Label = "Racial Skills";
                    this.arraySlot3Label = "Abilities";
                                        
                    t.footer = "Starting XP: " + this.someData[i].startingXP;

                    someList.push(t);                    
                }

                this.items = someList;
                
                break;           
        }                

        switch(this.catalogType) {
            case "talents": 
                this.someData = require('../data/talents.json');                
                
                var someList = [];                

                for(var i = 0; i < this.someData.length; i++){
                                        
                    var t = [];                    
                    t.name = this.someData[i].talentName;
                    t.header = this.someData[i].Tier;
                    t.description = this.someData[i].Text;
                    t.textSlot1 = this.someData[i].Activation;
                    t.textSlot2 = this.someData[i].Ranked;                    
                    t.tags = this.someData[i].tags;
                    t.footer = this.someData[i].Sourcing;

                    someList.push(t);                    
                }

                this.items = someList;

                break;           
        }              
        
    }    
}
</script>
