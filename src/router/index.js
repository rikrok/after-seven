import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import pcGen from '@/components/pcGen'

import Alchemy from '@/components/alchemy'
import Augur from '@/components/augurSpell'
import Careers from '@/components/careerCatalog'
import Enchanting from '@/components/enchantingSpell'
import Items from '@/components/itemCatalog'
import Races from '@/components/racialCatalog'
import Schools from '@/components/schools'
import SpellAdjustments from '@/components/spellAdjustments'
import SpellJam from '@/components/spellJamSpell'
import Talents from '@/components/talents'
import Transmogrify from '@/components/transmogrifySpell'

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
        { path: '/transmogrify', component: Transmogrify }
    ]
})