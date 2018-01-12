<template >
  <div id="app">
    <b-navbar fixed="top" toggleable="sm" type="dark" variant="dark">
            <b-navbar-brand to="/"> After Seven Character Generator </b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item to="/pcGen"> Generator </b-nav-item>                

                <b-nav-item-dropdown id="dropDownCatalogs" href="#" text="Catalogs" right>
                       <b-dropdown-item> Careers </b-dropdown-item>
                       <b-dropdown-item> Items </b-dropdown-item>
                       <b-dropdown-item to="/races"> Races </b-dropdown-item>
                       <b-dropdown-item to="/talents"> Talents </b-dropdown-item>  
                       <b-dropdown-item> Altered Skills </b-dropdown-item>          
                </b-nav-item-dropdown>

                <b-nav-item-dropdown id="dropDownFluff" href="#" text="Fluff" right>
                       <b-dropdown-item> About </b-dropdown-item>
                       <b-dropdown-item> Avatars </b-dropdown-item>
                       <b-dropdown-item> Events </b-dropdown-item>
                       <b-dropdown-item> Factions </b-dropdown-item>
                       <b-dropdown-item> Where Are They Now..? </b-dropdown-item>                    
                </b-nav-item-dropdown>

                <b-nav-item-dropdown id="dropDownMagic" href="#" text="Alchemy and Magic" right>
                       <b-dropdown-item to="/alchemy"> Alchemy </b-dropdown-item>
                       <b-dropdown-item to="/schools"> Schools of Magic </b-dropdown-item>
                       <b-dropdown-item to="/spelladjustments"> Spell Effect Changes </b-dropdown-item>
                       <b-dropdown-item> New Spell: Augur </b-dropdown-item>                       
                       <b-dropdown-item> New Spell: Enchant </b-dropdown-item>   
                       <b-dropdown-item> New Spell: Transmogrify </b-dropdown-item>     
                       <b-dropdown-item> New Spell: Spell Jam </b-dropdown-item>                      
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
