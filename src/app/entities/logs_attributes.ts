import ApplicationEntity = require('./app');

class LogsAttributes extends ApplicationEntity{

    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }
}

export = LogsAttributes;