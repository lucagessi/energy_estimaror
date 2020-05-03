type consumption = number;

export interface serializable{
    //serialize : string;
    //deserialize(data : string) : void;
}

export interface ILoad extends serializable{
    consumption : number;
}

export interface ILoadContainer extends ILoad{
    add(newLoad : ILoad) : void;
    remove(target : ILoad) : void;
}

export interface IStateMachineLoadState{
    _load     : ILoad;
    _duration : number; 
}

export interface IStateMachineLoad extends ILoad{
    addState   (state : IStateMachineLoadState) : void;
    removeState(state : IStateMachineLoadState) : void;
}

// Used for serialization
export interface ILoadStruct{
    name                : string;
    configurations      : ILoadConfigStruct[];   
}

export interface ILoadConfigStruct{
    key                 : string;
    consumption         : number;
}

export interface ILoadConfig{
    key         : string;
    consumption : number;
}

export class PhysicalLoad{

    private _configurations      : ILoadConfig[];
    private _name                : string;
    constructor() {
        this._configurations = [];
        this._name = "unknown";
    }

    get configurations(): ILoadConfig[] {
        return this._configurations;
    }

    get name(): string {
        return this._name;
    }

    set name(newname : string) {
        this._name = newname;
    }

    getConfiguration(key : string): ILoadConfig {
        var config : ILoadConfig = {key:"unknown",consumption:0};

        this._configurations.forEach((actual) => {
            if (key == actual.key){
                config = actual;
            }
        });
        return config;
    }

    set configurations(configurations: ILoadConfig[]) {
        this._configurations = configurations;
    }

    removeConfiguration(key: string): boolean {
        var success : boolean = false;
        this._configurations.forEach( (config,index) => {
            if (config.key == key){
                console.log(this);
                this._configurations.splice(index,1);
                success = true;
            }
        });
        return success;
    }

    addConfiguration(config: ILoadConfig): boolean {
        var exists : boolean = false;
        this._configurations.forEach(function (this : ConfigurableLoad,actual,index) {
            if (config.key == actual.key ){
                exists = true;
            }
        });
        if (exists){
            return false;
        }else{
            this.configurations.push( 
                {key:config.key,consumption:config.consumption} 
            );
            return true;
        }
    }

    get serialize() : ILoadStruct{
        var data : ILoadStruct = {
            name           : this._name,
            configurations : []
        };
        this._configurations.forEach(function (this : ConfigurableLoad,actual,index) {
            data.configurations.push(actual);
        });
        return data;
    }

}

export class ConfigurableLoad implements ILoad{

    private _load                : {} | PhysicalLoad;
    private _key                 : string;
    constructor(load ?: PhysicalLoad, key ?: string) {
        if( load !== undefined){
            this._load = load;
        }else{
            this._load = {};
        }
        if( key !== undefined){
            this._key = key;
        }else{
            this._key = "";
        }
    }
    set load(load : PhysicalLoad){
        this._load = load;
    }

    get consumption() : number{
        if (this._load instanceof PhysicalLoad){
            return this._load.getConfiguration(this._key).consumption
        }else{
            return 0
        }
    }

    setConfiguration(key: string): void {
        this._key = key;
    }
}

export class BasicLoadContainer implements ILoadContainer{

    private _loads : ILoad[];

    constructor() {
        this._loads = [];
    }

    get consumption(){
        var total : number = 0
        this._loads.forEach(element => {
            total += element.consumption
        });
        return total
    }

    add(newLoad : ILoad) : void{
        if (newLoad != this){
            this._loads.push(newLoad)
        }else{
            console.error("BasicLoadContainer: Avoid adding self to group call")
        }
    }

    remove(target : ILoad) : void{
        this._loads.splice(this._loads.indexOf(target),1)
    }

}

export class StateMachineLoad implements IStateMachineLoad{

    private _states : IStateMachineLoadState[];
    private _period : number;
    constructor() {
        this._states = [];
        this._period = 0;
    }

    addState   (state : IStateMachineLoadState) : void{
        this._states.push(state);
        this._period += state._duration;
    }

    removeState(state ?: IStateMachineLoadState, index ?: number, load ?: ILoad) : void{
        if ( index !== undefined){
            console.log("Type of state to remove is number")
            if( index>=0 && index < this._states.length ){
                this._period -= this._states[index]._duration
                this._states.splice(index,1)
            }
        }
        if ( state !== undefined){
            this._states.forEach((element,index) => {
                if ((element._load == state._load) && (element._duration == state._duration)){
                    this._states.splice(index,1)
                    this._period -= state._duration;
                }
            })
        }
        if( load !== undefined ){
            this._states.forEach((element,index) => {
                if ((element._load == load)){
                    this._period -= element._duration;
                    this._states.splice(index,1)
                }
            })            
        }
    }
    get consumption() : number{
        var total : number = 0;
        this._states.forEach((element,index) => {
            total += element._load.consumption * element._duration / this._period 
        })
        return total;
    }

}
