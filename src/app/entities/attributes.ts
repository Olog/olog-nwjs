import ApplicationEntity = require('./app');

/**
 * Attributes Class:
 * id,
 * property_id,
 * name,
 * state = enum['Active', 'Inactive']
 */
class Attributes extends ApplicationEntity{

    private _property_id : any;

    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }

    public all(property_id : any, callback : any){
        this._property_id = property_id;
    }
    

    public getById(id : number, callback : any){

    }

    public getByName(name : string, callback : any){

    }


    public update(id : number, params : any, callback : any){

    }


    public insert(params : any, callback : any){

    }


    public destroy(id : number, callback : any){
        return callback();
    }

    public destroyByName(name : string, callback : any){

    }
}

export = Attributes;