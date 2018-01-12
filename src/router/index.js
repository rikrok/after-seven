import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import pcGen from '@/components/pcGen'
import Races from '@/components/racialCatalog'
import Talents from '@/components/talentCatalog'
import Alchemy from '@/components/alchemy'
import Schools from '@/components/schools'
import SpellAdjustments from '@/components/spellAdjustments'

Vue.use(Router)

export default new Router({
    routes: [
        { path: "/", component: Home },
        { path: '/pcGen', component: pcGen },
        { path: '/races', component: Races },
        { path: '/talents', component: Talents },
        { path: '/alchemy', component: Alchemy },
        { path: '/schools', component: Schools },
        { path: '/spelladjustments', component: SpellAdjustments }
    ]
})