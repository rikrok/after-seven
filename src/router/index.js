import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import pcGen from '@/components/pcGen'
import racialGen from '@/components/racialGen'
import talentGen from '@/components/talentGen'
import itemGen from '@/components/itemGen'
import careerGen from '@/components/careerGen'

//fluff
import Alchemy from '@/components/alchemy'
import Augur from '@/components/augurSpell'
import Careers from '@/components/careers'
import Enchanting from '@/components/enchantingSpell'
import Items from '@/components/items'
import Races from '@/components/races'
import Schools from '@/components/schools'
import SpellAdjustments from '@/components/spellAdjustments'
import SpellJam from '@/components/spellJamSpell'
import Talents from '@/components/talents'
import Transmogrify from '@/components/transmogrifySpell'
import Factions from '@/components/factions'
import Wherearetheynow from '@/components/wherearetheynow'
import Avatars from '@/components/avatars'



Vue.use(Router)

export default new Router({
    routes: [
        { path: "/", component: Home },
        { path: '/pcGen', component: pcGen },
        { path: '/alchemy', component: Alchemy },
        { path: '/augur', component: Augur },
        { path: '/careers', component: Careers },
        { path: '/enchanting', component: Enchanting },
        { path: '/items', component: Items },
        { path: '/races', component: Races },
        { path: '/schools', component: Schools },
        { path: '/spelladjustments', component: SpellAdjustments },
        { path: '/spelljam', component: SpellJam },
        { path: '/talents', component: Talents },
        { path: '/transmogrify', component: Transmogrify },
        { path: '/factions', component: Factions },
        { path: '/wherearetheynow', component: Wherearetheynow },
        { path: '/avatars', component: Avatars },
        { path: '/racialGen', component: racialGen },
        { path: '/talentGen', component: talentGen },
        { path: '/itemGen', component: itemGen },
        { path: '/careerGen', component: careerGen }
    ]
})