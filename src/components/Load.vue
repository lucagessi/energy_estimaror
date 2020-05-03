<template> 
    <v-row class="text-center">
      <v-col cols="12">
        <h5> LoadViewEditor </h5>
        <v-text-field v-model=load.name></v-text-field>
        <p>Il nome di questo carico è: {{load.name}}</p>
        <v-row class="text-right">
          <v-col cols="6" v-for="config of configurations" v-bind:key="config.key">
            <span>
              <strong>Key:</strong> {{config.key}} 
              <strong>Consumption:</strong> {{config.consumption}} [mA]
            </span>
            <v-btn v-on:click="removeConfiguration(config.key)" class="mx-2" fab dark small color="primary">
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <p>
          <v-text-field v-model=newkey>Input vuetify</v-text-field>
          <v-text-field type="number" width="100" v-model=newconsumpion>0</v-text-field>
          <v-btn  v-on:click="addConfiguration()">Add configuration</v-btn>
          <v-btn v-on:click="test()">Test</v-btn>
        </p>
      </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ConfigurableLoad, LoadConfig } from './../typescript/load';

@Component
export default class LoadView extends Vue {
  @Prop() 
  private msg !: string;
  @Prop() 
  private load : ConfigurableLoad = new ConfigurableLoad();
  @Prop() 
  private newkey        : string = "New config name";
  @Prop() 
  private newconsumpion : number = 0;

  get configurations() : LoadConfig[]{
    return this.load.configurations;
  }

  test() : void{
    console.log("Test serialize Load Object");
    console.log(typeof this.load.serialize);
    console.log(JSON.stringify( this.load.serialize) );
  }
  addConfiguration() : void{
    this.load.addConfiguration(new LoadConfig(
      this.newkey,
      this.newconsumpion
    ))
  }
  removeConfiguration(key : string) : void{
    console.log("Calling load.removeConfiguration("+key+")");
    this.load.removeConfiguration(key);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}  
</style>
