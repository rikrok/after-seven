<template>
    <div class="col-xs-1 p-3">
        <b-jumbotron class="text-left">
            <template slot="header"> After Seven Character Generator </template>
            <template slot="lead">
                A javascript based application to better help manage and track the Character Creation process.           
            </template>

            <hr class="my-3">
            <p> This is meant to be for-fun use. All character creation logic and content is owned by Fantasy Flight Games <b-link href="https://www.fantasyflightgames.com/en/products/genesys/products/genesys-core-rulebook/">(BUY THEIR BOOK) </b-link>. </p>    
            <h4 class="text-primary"> Features </h4>
            <p class="text-left">
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
            </p>
            <small class="text-left text-mute">
                Note: Many talents were taken from <b-link href="http://lmgtfy.com/?q=genesys+talent+expanded"> "Genesys Talents Expanded" </b-link> </br>                
                Note 2: Only After Seven rules are programed. All other settings, alternative rules or genres are not yet in the game.    
            </small>
            <hr>
            <h4 class="text-primary"> To Do </h4>
            <ul>
                <li> Export as JSON </li>
                <li> Specific talents that adjust stats (IE, Grit) </li>
                <li> Add Genre Races </li>
                <li> Add Genre Items </li>
                <li> Add Alternative Rule Skills </li>
                <li> Add Genre Talents </li>           
            </ul>

            <p class="text-muted sm mt-4"> - Christopher W. Lewis (contact me at [contact at bitaugur dot com]) </p>

        </b-jumbotron>
    </div>
</template>

<script>
export default {
    name: "home"
}
</script>
