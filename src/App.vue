<template >
  <div id="app">
    <b-navbar fixed="top" toggleable="sm" type="dark" variant="dark">
            <b-navbar-brand to="/"> After Seven Character Generator </b-navbar-brand>
            <b-navbar-nav>

                <b-nav-item target="_new" href="https://www.fantasyflightgames.com/en/products/genesys/products/genesys-core-rulebook/"> Get Genesys </b-nav-item>
                
                <b-nav-item-dropdown class="pr-3" id="dropGenerators" href="#" text="Generators" right>
                       <b-dropdown-item to="/gen/pc"> Player Character </b-dropdown-item>
                       <b-dropdown-item to="/gen/racial"> Races </b-dropdown-item>
                       <b-dropdown-item to="/gen/talent"> Talents </b-dropdown-item>
                       <b-dropdown-item to="/gen/item"> Items </b-dropdown-item>
                       <b-dropdown-item to="/gen/careers"> Careers </b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown id="dropDownCatalogs" href="#" text="Catalogs" right>
                       <b-dropdown-item to="/catalog/items"> Items </b-dropdown-item>
                       <b-dropdown-item to="/catalog/races"> Races </b-dropdown-item>
                       <b-dropdown-item to="/catalog/talents"> Talents </b-dropdown-item>       
                </b-nav-item-dropdown>

                <b-nav-item-dropdown id="dropDownFluff" href="#" text="Fluff" right>
                       <b-dropdown-item to="/about"> About </b-dropdown-item>
                       <b-dropdown-item to="/catalog/careers"> Careers </b-dropdown-item>
                       <b-dropdown-item to="/fluff/apocalypses"> The Seven Apocalypses </b-dropdown-item>
                       <b-dropdown-item to="/fluff/antagonists"> Antagonists </b-dropdown-item> 
                       <b-dropdown-item to="/fluff/avatars"> Avatars </b-dropdown-item> 
                       <b-dropdown-item to="/fluff/factions"> Factions </b-dropdown-item>
                       <b-dropdown-item to="/fluff/protagonists"> Protagonists </b-dropdown-item>
                       <b-dropdown-item to="/fluff/wherearetheynow"> Where Are They Now..? </b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown id="dropDownMagic" href="#" text="Alchemy and Magic" right>
                       <b-dropdown-item to="/alchemy"> Alchemy </b-dropdown-item>
                       <b-dropdown-item to="/schools"> Schools of Magic </b-dropdown-item>
                       <b-dropdown-item to="/spelladjustments"> Spell Effect Changes </b-dropdown-item>
                       <b-dropdown-item to="/augur"> New Spell: Augur </b-dropdown-item> 
                       <b-dropdown-item to="/enchanting"> New Spell: Enchant </b-dropdown-item>   
                       <b-dropdown-item to="/transmogrify"> New Spell: Transmogrify </b-dropdown-item>     
                       <b-dropdown-item to="/spelljam"> New Spell: Spell Jam </b-dropdown-item>
                </b-nav-item-dropdown>
                
                <b-nav-item target="_new" href="https://docs.google.com/forms/d/e/1FAIpQLSddb8NUEBrb1d9iboiG4__y_Q62gFF3OrAtc5PjeysOilpe_g/viewform?usp=sf_link"> Report a bug </b-nav-item>
                
                <b-nav-item-dropdown id="dropDownMagic" text="Support" right>
                       <b-dropdown-item href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QWSQXQVGFJA4A" target="_new">  PayPal 
                            <!--form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                              <input type="hidden" name="cmd" value="_s-xclick">
                              <input type="hidden" name="hosted_button_id" value="QWSQXQVGFJA4A">
                              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                            </form-->
                        </b-dropdown-item>
                       <b-dropdown-item to="/support/Amazon"> Amazon Books </b-dropdown-item>                       
                </b-nav-item-dropdown>
                

            </b-navbar-nav>
        </b-navbar>
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
