import ApplicationEntity = require('./app');

class Entries extends ApplicationEntity{

    /**
     * constructor
     * @param tablename
     * @param connection
     */
    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }

    /**
     * Search all the log entries
     * @param page
     * @param callback
     */
    public all(page : any, callback : any){

    }

    public getById(id : number, callback : any){
        return this.conn.query(
            "SELECT * FROM " + this.tableName + " WHERE id=?",
            [id],
            callback);

    }

    public insert(params : any, callback : any){

    }

    public update(id : number, params : any, callback : any){

    }

    /**
     * Destroys a log entry given the id
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

export = Entries;