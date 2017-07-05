import ApplicationEntity = require('./app');

class Entries extends ApplicationEntity{

    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }
}

export = Entries;