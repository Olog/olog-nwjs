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


}

export = Log;