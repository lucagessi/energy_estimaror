export interface ILoad{
    consumption : number;
}

export interface ILoadContainer extends ILoad{
    addLoad(newLoad : ILoad) : void;
    removeLoad(target : ILoad) : void;
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
    key                 : string;
    name                : string;
    isSet               : boolean;
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

export class ConfigurableLoad implements ILoad{

    private _configurations      : ILoadConfig[];
    private _configuration      !: ILoadConfig;
    private _key                 : string;
    private _name                : string;
    private _isSet               : boolean;
    constructor() {
        this._configurations = [];
        this._key = "";
        this._isSet = false;
        this._name = "unknown";
    }

    get configurations(): ILoadConfig[] {
        return this._configurations;
    }

    get consumption() : number{
        var value = 0
        if (this._isSet){
            value = this.getConfiguration(this._key).consumption
        }
        return value
    }

    get name(): string {
        return this._name;
    }

    set name(newname : string) {
        this._name = newname;
    }

    getConfiguration(key : string): ILoadConfig {
        var config : ILoadConfig = {key:"unknown",consumption:0};

        this._configurations.forEach(function (this : ConfigurableLoad,actual) {
            if (key == actual.key){
                config = actual;
            }
        });
        return config;
    }

    set configurations(configurations: ILoadConfig[]) {
        this._configurations = configurations;
    }

    setConfiguration(key: string): boolean {
        this._configurations.forEach(function (this : ConfigurableLoad,actual,index) {
            if (key == actual.key){
                this._configuration = this._configurations[index];
                this._key   = key;
                this._isSet = true;
                return true;
            }
        });
        return false;
    }
    removeConfiguration(key: string): boolean {
        var success : boolean = false;
        this._configurations.forEach( (config,index) => {
            if (config.key == key){
                console.log(this);
                this._configurations.splice(index,1);
                if (this._key == key){
                    this._isSet = false;
                    this._key   = "";
                }
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
            isSet          : this._isSet,
            key            : this._key,
            name           : this._name,
            configurations : []
        };
        this._configurations.forEach(function (this : ConfigurableLoad,actual,index) {
            data.configurations.push(actual);
        });
        return data;
    }

}
