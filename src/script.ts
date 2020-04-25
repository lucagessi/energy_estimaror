
console.log("Dentro Typescript!");

alert("Dentro Typescript!");

var uC : Load = new Load();

var lc1 : LoadConfig = new LoadConfig("Prova", 0.2457);

console.log(lc1);

uC.addConfiguration(
    new LoadConfig("RUN", 35.888)
);

uC.addConfiguration(
    new LoadConfig("SLEEP", 0.2457)
);

uC.addConfiguration(
    new LoadConfig("Deep sleep", 0.0001)
);

console.log(uC);