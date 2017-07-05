import ApplicationEntity = require('./app');
import Attributes = require('./attributes');

class Properties extends ApplicationEntity{
    private _Attributes : any = new Attributes('attributes', this.conn);

    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }

    /**
     * Returns all rows of tags
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page : any, callback : any){
        return this.conn.query(
            "SELECT\
        p.*,\
            row_to_json(e.*) as attribute  \
        FROM "+ this.tableName+" p\
        INNER JOIN "+ this._Attributes.tableName+" e USING(property_id)",
            callback);
    }

    /**
     * Selects a logbook by ID
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public getById(id : number, callback : any){
        return this.conn.query(
            "SELECT\
        p.*,\
            row_to_json(e.*) as attribute  \
        FROM "+ this.tableName+" p WHERE id=? \
        INNER JOIN "+ this._Attributes.tableName+" e USING(property_id)",
            [id],
            callback);
    }

    /**
     * Updates a tag with the given ID
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(id : number, params : any, callback : any){

    }

    /**
     * Inserts a row into the logbook table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params : any, callback : any){

    }
    /**
     * Deletes a row from the table
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public destroy(id : number, callback : any){

    };
}

export = Properties;