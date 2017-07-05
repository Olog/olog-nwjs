import ApplicationEntity = require('./app');

class BitemporalLogs extends ApplicationEntity{

    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }
}

export = BitemporalLogs;