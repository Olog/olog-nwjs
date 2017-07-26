import ApplicationModel = require('./app');
import Logbooks = require('../entities/logbooks');

/**
 * Class for modifying logs in the database
 */
class Logbook extends ApplicationModel {

    constructor(connection: any) {
        super(new Logbooks('logbooks', connection, '0'), 'logbooks');
    }


    /**
     * Returns all rows of logbooks
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page: any, callback: any) {
        return this.mainEntity.all(page, callback);
    }

    /**
     * Selects a logbook by ID
     * @param name
     * @param callback
     * @returns {IQuery}
     */
    public get(name: number, callback: any) {
        return this.mainEntity.getByName(name, callback);

    }

    /**
     * Updates a logbook with the given ID
     * @param logbookName
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(logbookName: string, params: any, callback: any) {
        return this.mainEntity.updateByName(logbookName, params, callback);
    }

    /**
     * Inserts a row into the logbook table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params: any, callback: any) {
        return this.mainEntity.insert(params, callback);

    }

    /**
     * Inserts a row into the logs_logbooks
     * @param logbookName
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public setToLogs(logbookName: string, params: any, callback: any) {
        // gets the tag/logbook from the logbookName
        let returnAll: any = [];
        this.mainEntity.getByName(logbookName, function(err: any, elem: any){
            if (err) {
                return err;
            }else {
                for (let log of params.logs){
                    // creates log_logbook entries for all the log ids in the data
                    this._logLogbooksEntity.insert(
                        {
                            log_id : log.id,
                            logbook_id : elem.logbook_id,
                        },
                        function(errt: any, elemt: any){
                            if (errt) {
                                return errt;
                            }else {
                                returnAll.push(elemt);
                            }
                        },
                    );
                }

            }
        });
        return callback(null, returnAll);
    }

    /**
     * Deletes a row from the table
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public destroy(id: number, callback: any) {
        return this.mainEntity.destroy(id, callback);

    }

    /**
     * Deletes records of tags from a log
     * @param logId
     * @param logbookName
     * @param callback
     */
    public destroyByLog(logId: any, logbookName: string, callback: any) {
//
    }

    public destroyByName( logbookName: string, callback: any) {
        return this.mainEntity.destroybyName(logbookName, callback);
    }


}

export = Logbook;
