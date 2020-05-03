console.log('Inside test.ts');

import {ConfigurableLoad, BasicLoadContainer} from './load';

var uC  : ConfigurableLoad = new ConfigurableLoad();
var led : ConfigurableLoad = new ConfigurableLoad();
var group : BasicLoadContainer = new BasicLoadContainer();

uC.addConfiguration({ consumption:1.2, key:"On"} )
uC.addConfiguration({ consumption:0.001, key:"Off"} )

led.addConfiguration({ consumption:10, key:"On"} )
led.addConfiguration({ consumption:0.001, key:"Off"} )
group.addLoad(led)
group.addLoad(uC)
group.addLoad(group)

console.log(uC.serialize)

console.log("uC consumption: "+uC.consumption)
console.log("Setting uC config: On..")
uC.setConfiguration ("On")
led.setConfiguration("On")
console.log("uC consumption: "+uC.consumption)
console.log("led consumption: "+led.consumption)

console.log("group consumption: "+group.consumption)
