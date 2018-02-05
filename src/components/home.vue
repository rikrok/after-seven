<template>
    <div class="col-xs-1 p-3">
        <b-jumbotron class="text-left">
            <template slot="header"> After Seven Character Generator </template>
            <template slot="lead">
                A javascript based application to better help manage and track the Character Creation process.           
            </template>

            <hr class="my-3">
            <p> This is meant to be for-fun use for my players to create characters. </br>
            All character creation logic and non custom content is owned by Fantasy Flight Games. Please purchase their book if you have not already. </p>    

            <b-container>
                <b-row>
                    <b-col>
                            <b-card
                                bg-variant="dark"
                                text-variant="light"
                                title= "After Seven Setting Features">
                                    After Seven setting introduces the following: 
                                    <ul>
                                        <li> Alchemy System </li>
                                        <li> Over 100 new Talents </li>
                                        <li> 4 New Spells (Augur, Enchant, Transmogrify, Spell Jam) </li>            
                                        <li> 4 Races (2 New) </li>
                                        <li> 16 Careers </li>
                                        <li> Spell Effect Adjustments </li>
                                        <li> Several new items </li>                        
                                        <li> 4 New Knowledges </li>
                                    </ul>    
                                    <small class="text-left text-mute">
                                        Note: Many talents were taken from <b-link href="http://lmgtfy.com/?q=genesys+talent+expanded"> "Genesys Talents Expanded" </b-link> </br>                                 
                                    </small>
                            </b-card>
                    </b-col>
                    <b-col>
                            <b-card
                                bg-variant="dark"
                                text-variant="light"
                                title= "After Seven Generator Features">
                                Using the generators will let you
                                <ul>
                                    <li> Create your races </li>
                                    <li> Create your careers </li>
                                    <li> Create your items </li>            
                                    <li> Create your talents </li>
                                    <li> Use a robust library of talents </li>
                                    <li> Focus on genre specific races, items, skills and talents </li>
                                </ul>

                                <small class="text-left text-mute">
                                    Note: Many talents were taken from <b-link href="http://lmgtfy.com/?q=genesys+talent+expanded"> "Genesys Talents Expanded" </b-link> </br>                                 
                                </small>

                            </b-card>
                    </b-col>
                    <b-col>
                            <b-card
                                bg-variant="light"
                                text-variant="dark"
                                title= "Upcoming Features">
                                Besides troubleshooting bugs, I would like to add
                                <ul>
                                    <li> Skill Generator </li>
                                    <li> Genre Generator </li>
                                    <li> Adversary Generator </li>                                    
                                    <li> More racial customizations </li>
                                    <li> More talent customizations </li>
                                    <li> More gear customizations, allowing for cybernetics and implementations </li>
                                </ul>

                            </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    name: "home"
}
</script>
