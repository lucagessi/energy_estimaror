console.log('Inside test.ts');

import {ConfigurableLoad, BasicLoadContainer,PhysicalLoad, ILoad} from './load';

var uC  : PhysicalLoad = new PhysicalLoad();
var rf_module  : PhysicalLoad = new PhysicalLoad();
var led : PhysicalLoad = new PhysicalLoad();

var stm32 :  ConfigurableLoad = new ConfigurableLoad();
var redLed:  ConfigurableLoad = new ConfigurableLoad();
var blueLed: ConfigurableLoad = new ConfigurableLoad();
var Ble:     ConfigurableLoad = new ConfigurableLoad();

var group : BasicLoadContainer = new BasicLoadContainer();
var pnt : ILoad;

uC.addConfiguration({ consumption:1.2, key:"On"} )
uC.addConfiguration({ consumption:0.001, key:"Off"} )
led.addConfiguration({ consumption:10, key:"On"} )
led.addConfiguration({ consumption:0.001, key:"Off"} )
rf_module.addConfiguration({ consumption:5.6, key:"TX/RX"} )
rf_module.addConfiguration({ consumption:0.010, key:"Sleep"} )

stm32.load = uC;
redLed.load = led;
blueLed.load = led;
Ble.load = rf_module;

group.add(stm32)
group.add(redLed)
group.add(blueLed)
group.add(Ble)

console.log(uC.serialize)

console.log("Group consumption: "+group.consumption)
console.log("Setting configurations...")

Ble.setConfiguration("TX/RX")
stm32.setConfiguration ("On")
redLed.setConfiguration("On")
blueLed.setConfiguration('On')

console.log("uC consumption: "+stm32.consumption)
console.log("led consumption: "+redLed.consumption)

console.log("group consumption: "+group.consumption)
pnt = group;
console.log(pnt instanceof ConfigurableLoad)
console.log(pnt instanceof BasicLoadContainer)