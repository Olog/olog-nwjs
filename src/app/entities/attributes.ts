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
        return this.conn.query(
            "SELECT * FROM " + this.tableName + " WHERE property_id=" + this._property_id,
            callback);
    }
    

    public getById(id : number, callback : any){
        return this.conn.query(
            "SELECT * FROM " + this.tableName + " WHERE id=?",
            [id],
            callback);
    }

    public getByName(name : string, callback : any){
        return this.conn.query(
            "SELECT * FROM " + this.tableName + " WHERE name=?",
            [name],
            callback);
    }


    public update(id : number, params : any, callback : any){
        return this.conn.query(
            "UPDATE "+ this.tableName +
            " set name=?, state=? WHERE id=?" +
            [
                params.name,
                params.state,
            ],
            callback);
    }


    public insert(params : any, callback : any){
        return this.conn.query(
            "INSERT INTO "+ this.tableName +
            "(name, state, property_id)" +
            " values(?,?,?)",
            [
                params.name,
                'Active',
                params.property_id
            ],
            callback);
    }


    public destroy(id : number, callback : any){
        return this.conn.query(
            "UPDATE "+ this.tableName +
            " set state=? WHERE id=?" +
            [
                'Inactive',
                id,
            ],
            callback);
    }

    public destroyByName(name : string, callback : any){
        return this.conn.query(
            "UPDATE "+ this.tableName +
            " set state=? WHERE name=?" +
            [
                'Inactive',
                name,
            ],
            callback);
    }
}

export = Attributes;