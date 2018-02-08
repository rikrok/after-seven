import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'

import careerGen from '@/components/careerGen'
import itemGen from '@/components/itemGen'
import pcGen from '@/components/pcGen'
import racialGen from '@/components/racialGen'
import talentGen from '@/components/talentGen'

//fluff
import About from '@/components/about'
import Alchemy from '@/components/alchemy'
import Antagonists from '@/components/antagonists'
import Apocalypses from '@/components/apocalypses'
import Augur from '@/components/augurSpell'
import Avatars from '@/components/avatars'
import Careers from '@/components/careers'
import Enchanting from '@/components/enchantingSpell'
import Factions from '@/components/factions'
import Items from '@/components/items'
import Protagonists from '@/components/protagonists'
import Races from '@/components/races'
import Schools from '@/components/schools'
import SpellAdjustments from '@/components/spellAdjustments'
import SpellJam from '@/components/spellJamSpell'
import Talents from '@/components/talents'
import Transmogrify from '@/components/transmogrifySpell'
import Wherearetheynow from '@/components/wherearetheynow'

import Amazon from '@/components/amazon'


Vue.use(Router)

export default new Router({
    routes: [
        { path: "/", component: Home },        
        { path: '/about', component: About },

        { path: '/alchemy', component: Alchemy },
        { path: '/augur', component: Augur },
        { path: '/enchanting', component: Enchanting },
        { path: '/schools', component: Schools },
        { path: '/spelladjustments', component: SpellAdjustments },
        { path: '/spelljam', component: SpellJam },
        { path: '/transmogrify', component: Transmogrify },
        
        { path: '/gen/item', component: itemGen },
        { path: '/gen/pc', component: pcGen },
        { path: '/gen/racial', component: racialGen },
        { path: '/gen/talent', component: talentGen },
        { path: '/gen/careers', component: careerGen },
                        
        { path: '/catalog/careers', component: Careers },        
        { path: '/catalog/items', component: Items },
        { path: '/catalog/races', component: Races },
        { path: '/catalog/talents', component: Talents },
                 
        { path: '/fluff/antagonists', component: Antagonists },
        { path: '/fluff/apocalypses', component: Apocalypses }, 
        { path: '/fluff/avatars', component: Avatars },
        { path: '/fluff/factions', component: Factions },
        { path: '/fluff/protagonists', component: Protagonists },
        { path: '/fluff/wherearetheynow', component: Wherearetheynow },

        { path: '/support/Amazon', component: Amazon }

    ]
})