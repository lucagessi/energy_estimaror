console.log('Inside test.ts');

import {ConfigurableLoad, BasicLoadContainer,PhysicalLoad, ILoad} from './load';

var uC  : PhysicalLoad = new PhysicalLoad();
var led : PhysicalLoad = new PhysicalLoad();

var stm32 : ConfigurableLoad = new ConfigurableLoad();
var redLed: ConfigurableLoad = new ConfigurableLoad();

var group : BasicLoadContainer = new BasicLoadContainer();
var pnt : ILoad;

stm32.load = uC;
redLed.load = led;

uC.addConfiguration({ consumption:1.2, key:"On"} )
uC.addConfiguration({ consumption:0.001, key:"Off"} )

led.addConfiguration({ consumption:10, key:"On"} )
led.addConfiguration({ consumption:0.001, key:"Off"} )

group.add(stm32)
group.add(redLed)
group.remove(stm32)

console.log(uC.serialize)

console.log("uC consumption: "+stm32.consumption)
console.log("Setting uC config: On..")
stm32.setConfiguration ("On")
redLed.setConfiguration("On")
console.log("uC consumption: "+stm32.consumption)
console.log("led consumption: "+redLed.consumption)

console.log("group consumption: "+group.consumption)
pnt = group;
console.log(pnt instanceof ConfigurableLoad)
console.log(pnt instanceof BasicLoadContainer)