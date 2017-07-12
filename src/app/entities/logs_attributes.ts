import ApplicationEntity = require('./app');

/**
 * Logs Attributes Table
 * id,
 * log_id,
 * attribute_id,
 * value
 * grouping_num
 */
class LogsAttributes extends ApplicationEntity{

    constructor(tablename : string, connection : any){
        super(tablename, connection);
    }

    public destroy(id : number, callback : any){
        return this.conn.query(
            "DELETE FROM " + this.tableName + " WHERE id=?",
            [id],
            callback);
    }

}

export = LogsAttributes;