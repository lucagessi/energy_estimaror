<template>
  <v-container>
    <v-row class="text-center">
      <h1>{{ msg }}</h1>
      <div>
        This will be an increbile, versitile application for battery life estimation! Be positive and go on!.
      </div>
    </v-row>
    <LoadView ></LoadView>
    <v-row class="text-right">
      <v-col cols="6">
        <v-file-input show-size label="Load data" v-model="inputfile"></v-file-input>        
      </v-col>
      <v-col cols="6">
        <v-btn color="primary" v-on:click="openFile()">
          Load
        </v-btn>
        <v-btn color="primary" v-on:click="saveFile()">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoadView  from './Load.vue';

@Component({
  components: {
    LoadView,
  },
})


export default class Laboratory extends Vue {
  @Prop() private msg     !: string;
  private counter : number = 0;

  @Prop()
  private inputfile !: File;

  incrementCounter() : void{
    this.counter++;
  }
  get theCouter() : number{
    return this.counter;
  }

  saveFile(): void {
    const data = "Value: "+Math.random()
    const fs = require('fs');
    console.log("Save file with text: "+data)
    try { fs.writeFileSync('./load.dt', data, 'utf-8'); }
    catch(e) { alert('Failed to save the file !'); }
  }
  openFile(): void {
    console.log("Openfile method")
    console.log("File "+this.inputfile.name)
    console.log("File "+this.inputfile)
    var reader = new FileReader();
      
    // Use the javascript reader object to load the contents
    // of the file in the v-model prop
    reader.readAsText(this.inputfile);
    reader.onload = () => {
      console.log(reader.result);
    }
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
