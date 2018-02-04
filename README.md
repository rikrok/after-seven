# after-seven-rpg

> Website to display fluff, generators and tables for the Genesys based rpg: After Seven.

Uses Vue.js, bootstrap, bootstrap-vue and a passion for making a generator.

## Known Bugs
- The Burly talent seems to be withdrawing endurance twice per removal of the talent, or unequipping a weapon.
- The Burly talent doesn't seem to be reducing an item's cumbersome rating. 
- After installing cybernetics, strain is not calculated accordingly.
- The steampunk armor, Amplimotive Armor, does not include its bonuses correctly. 
- Riot Armor does not give its Riot Shield item properly. 
- While in custom mode, After Seven careers are throwing errors when selecting them, nothing is happening - but is complaining that things don't exist like they should.
- Character name seems to be broken.
- random roll faction screwy a bit.
- abilities are not being added through weapons, gear, or armor. Most likely have to redo the ability.json file. 

## Checks before Deployment
- every function returns a true / false.
- trim dat space.

## Incoming Features 
- print page
- ~~item generator~~    20180203
- ~~racial generator~~  20180202
- ~~talent generator~~  20180202
- ~~career generator~~  20180203
- import career json
- import races json
- ~~import items json~~ 20180203
- import talents json

## Near Future Features
- hard point install page
- skill generator
- import skills json

## Wants
- bad guy generator
- Re-engineer pcGen to be friendlier and less troublesome to develop against.
- Race to give non skill bonuses, but bonus 'first four' careers, non careers or any skill.
- Removal of data JSONs to NoSQL based data retrieval storage.
- User community.
- World peace.
- 15 Miliion Dollars.