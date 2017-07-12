import ApplicationEntity = require('./app');

/**
 * Class for modifying logbooks/tags belonging to logs
 * Logbook Attributes:
 *      id,
*       log_id,
*       logbook_id
 */
class LogsLogbooks extends ApplicationEntity {

    constructor(tablename: string, connection: any) {
        super(tablename, connection);
    }


    /**
     * Returns all rows of tags
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page: any, callback: any) {
        return this.conn.query(
            "SELECT * FROM " + this.tableName ,
            callback);
    }

    /**
     * Selects a logbook by ID
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public getById(id: number, callback: any) {
        return this.conn.query(
            "SELECT * FROM " + this.tableName + " WHERE id=?",
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
    public update(id: number, params: any, callback: any) {
        return this.conn.query(
            "UPDATE " + this.tableName +
            " set log_id=?, logbook_id=? WHERE id=?" +
            [
                params.log_id,
                params.logbook_id,
                id
            ],
            callback);
    }

    /**
     * Inserts a row into the logbook table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params: any, callback: any) {
        return this.conn.query(
            "INSERT INTO " + this.tableName +
            "(log_id, logbook_id)" +
            " values(?,?)",
            [
                params.log_id,
                params.logbook_id
            ],
            callback);
    }

    /**
     * Deletes a row from the table
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public destroy(id: number, callback: any) {
        return this.conn.query(
            "DELETE FROM " + this.tableName + " WHERE id=?",
            [id],
            callback);
    }

    /**
     * Deletes a logbooks from a given log
     * @param log_id Log id
     * @param logbookName
     * @param callback
     * @returns {IQuery}
     */
    public destroyByLog(log_id: any, logbookName : string, callback: any) {
        return this.conn.query(
            "DELETE FROM " + this.tableName + " WHERE log_id=? " +
            "AND logbook_id IN " +
            "(SELECT id from logbooks where name=?)",
            [
                log_id,
                logbookName
            ],
            callback);
    }


}

export = LogsLogbooks;