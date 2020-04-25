class Load {

    private configurations      : LoadConfig[];
    private key                 : string;
    private isSet               : boolean;
    constructor() {
        this.configurations = [];
        this.key = "";
        this.isSet = false;
    }

    getConfigurations(): LoadConfig[] {
        return this.configurations;
    }

    getConfiguration(key : string): LoadConfig {
        var config : LoadConfig = new LoadConfig(
            "unknown",0
        );
        this.configurations.forEach(function (this : Load,actual) {
            if (key == actual.getKey()){
                config = actual;
            }
        });
        return config;
    }

    setConfigurations(configurations: LoadConfig[]): void {
        this.configurations = configurations;
    }
    setConfiguration(key: string): boolean {
        var exists : boolean = false;
        this.configurations.forEach(function (this : Load,actual,index) {
            if (key == actual.getKey()){
                exists = true;
            }
        });
        if ( exists )
        {
            this.key   = key;
            this.isSet = true;
            return true;
        }else{
            return false;
        }
    }
    removeConfiguration(key: string): boolean {
        var success : boolean = false;
        this.configurations.forEach(function (this : Load,config,index) {
            if (config.getKey () == key){
                delete this.configurations[index]; 
                success = true;
            }
        });
        return success;
    }
    addConfiguration(config: LoadConfig): boolean {
        var exists : boolean = false;
        this.configurations.forEach(function (this : Load,actual,index) {
            if (config.getKey () == actual.getKey()){
                exists = true;
            }
        });
        if (exists){
            return false;
        }else{
            this.configurations.push( 
                new LoadConfig(config.getKey(),config.getConsumption())
            );
            return true;
        }
    }
}

class LoadConfig {

    private key         : string;
    private consumption : number;

    constructor(
    key         : string,
    consumption :  number
    ) {
    this.key = key;
    this.consumption = consumption;
    }

    getKey(): string {
        return this.key;
    }

    getConsumption(): number {
    return this.consumption;
    }

    setKey(key : string): void {
        this.key = key;
    }

    setConsumption(consumption : number): void {
        this.consumption = consumption;
    }
}