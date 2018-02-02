<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h1> <strong> After Seven Careers </strong> </h1>
        <p> 
            Your character once served a mighty empire. Perhaps they were a merchant, mechanic, spy, infantry 
            or a minor officer. You were loyal, idealist and naïve. You served your empire well. You carried out 
            and executed orders that are morally questionable at a daily rate.
        </p>
        <p>
            One of three things MOST LIKELY happened to your character: 
            <ol> 
                <li>
                    An event that opened your eyes on how twisted and nightmarish your empire is. This caused you to flee,
                    but your once masters wanted your continued loyalty and service until your death. You barely escaped 
                    with your life and have a bounty on your head.
                </li>
                <li>
                    You were sold to another empire, as a slave, and it was made clear that you were betrayed by those that you 
                    once called friends and the system that you served. You escaped with your life, but are 
                    wanted dead or alive. 
                </li>
                <li>
                    You escaped a life of misery in one of the remaining cities, but are a fugitive on the run from slavers. 
                </li>
            </ol>
        </p>

        <b-card-group columns> 
            <div v-for="(career, index) in items" :key="index">
                <b-card
                    v-bind:title="career.name"
                    v-bind:subTitle = "career.tags"
                    bg-variant="dark" 
                    text-variant="light"
                    >
                    <p> {{ career.description }} </p>
                    <p> <strong> Career Skills </strong> </p>
                    <div class="ml-3" v-for="(skill, index) in career.careerSkills" :key="index"> {{ skill }}  </div>
                </b-card>
            </div>            
        </b-card-group>            
    </div>
</template>

<script>
export default {
    data () {
        return {
            items : []
        }
    }, 
    created () {
        var c = require('../data/careers.json');

        for(var x = 0; x < c.length; x++) {

            if (c[x].alternativeRules === "After Seven") {
                this.items.push(c[x]);
            }
        }
    }
}
</script>