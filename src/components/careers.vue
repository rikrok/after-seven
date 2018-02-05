<template>
    <div class="p-3 mx-3 text-left bg-light">
        <h1> <strong> After Seven Careers </strong> </h1>
        <p> 
            Your character once served a mighty empire. Perhaps they were a merchant, mechanic, spy, infantry 
            or a minor officer. They were loyal, idealist and naïve. Your character served your empire well. They carried out 
            and executed orders that are morally questionable at a daily rate.
        </p>
        <p>
            Be it through betrayl, loss, fate or awakening your character is now an outlaw. They are labeled as traitors and 
            unwelcomed in every civilized place in North America.
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