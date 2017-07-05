import ApplicationEntity = require('./app');

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
            "(name, state)" +
            " values(?,?)",
            [
                params.name,
                params.state,
            ],
            callback);
    }


    public destroy(id : number, callback : any){
        return this.conn.query(
            "DELETE FROM " + this.tableName + " id=?",
            [id],
            callback);
    }
}

export = Attributes;