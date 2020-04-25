# energy_estimator

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Tutorial from:
https://www.cseyda.de/2019/04/21/how-to-start-an-electron-vue-typescript-project/
.Nota che se ci dovessero essere problemi per lanciare l'applicazione con npm run serve devi 
togliere i valori dentro tsconfig.json:
```
....
  "types": [
      "webpack-env"
    ],
....
```
e scrivere  
```
....
  "types": [],
....
```
Inoltre come specificato nel link usa npm run electron:serve per lanciare electron. Per 
creare l'applicativo finale non so.