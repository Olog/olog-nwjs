import ApplicationModel = require('./app');
import Logs = require('../entities/logs');

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
class Log extends ApplicationModel{

    constructor(connection : any){
        super(new Logs('logs', connection), 'logs');
    }

    /**
     * Sets a logbook to status= inactive
     * @param id
     * @param callback
     */
    public destroy(id : number, callback : any){
        return this.mainEntity.destroy(id, callback);
    }

}

export = Log;