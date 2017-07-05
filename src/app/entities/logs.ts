import ApplicationEntity = require('./app');

/**
 * Class for modifying logs in the database
 * Log Attributes:
 *      id,
 *      owner,
 *      description
 *      modified,
 *      source,
 *      state,
 *      level,
 *      entry_id,
 *      version,
 */
class Logs extends ApplicationEntity{

    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }

    public all(page : any, callback : any){

    }

    public getById(id : number, callback : any){
        return this.conn.query(
            "SELECT * FROM " + this.tableName + " WHERE id=?",
            [id],
            callback);
    }

    public update(id : number, params : any, callback : any){

    }

    public insert(params : any, callback : any){
        return this.conn.query(
            "INSERT INTO "+ this.tableName +
            "(owner, description, modified, source, state, level, entry_id, version)" +
            " values(?,?,?,?,?,?)",
            [
                params.modified,
                params.source,
                params.owner,
                params.description,
                params.state,
                params.level,
                params.entry_id,
                params.version
            ],
            callback);
    }

    public destroy(id : number, callback : any){
        return this.conn.query(
            "DELETE FROM " + this.tableName + " WHERE id=?",
            [id],
            callback);
    }
}

export = Logs;