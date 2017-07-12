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

    //number of logs to receive per page.
    private perPage : number = 10;

    /**
     * constructor
     * @param tablename
     * @param connection
     */
    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }

    /**
     * Search for the entry in the database
     * @param page
     * @param callback
     * @param search
     */
    public all(page : any, callback : any, search : any){

    }

    /**
     * returns a log given the id
     * @param id
     * @param callback
     * @returns {IQuery|any}
     */
    public getById(id : number, callback : any){
        return this.conn.query(
            "SELECT * FROM " + this.tableName + " WHERE id=?",
            [id],
            callback);
    }

    /**
     * Inserts a log
     * @param params
     * @param callback
     * @returns {IQuery|any}
     */
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


    /**
     * updates a log entry
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery|any}
     */
    public update(id : number, params : any, callback : any){
        return this.conn.query(
            "UPDATE "+ this.tableName +
            " SET modified=?, source=?, owner=?, description=?, level=?, version=?" +
            [
                params.modified,
                params.source,
                params.owner,
                params.description,
                params.level,
                params.version
            ],
            callback);
    }

    /**
     * Destroys a log given the id
     * @param id
     * @param callback
     * @returns {IQuery|any}
     */
    public destroy(id : number, callback : any){
        return this.conn.query(
            "UPDATE " + this.tableName + " SET state=? WHERE id=?",
            [
                'Inactive',
                id
            ],
            callback);
    }
}

export = Logs;