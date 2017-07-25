import ApplicationModel = require('./app');
import Logs = require('../entities/logs');

/**
 * Class for modifying logs in the database
 */
class Log extends ApplicationModel {

    constructor(connection: any) {
        super(new Logs('logs', connection), 'logs');
    }

    /**
     * Sets a logbook to status= inactive
     * @param id
     * @param callback
     */
    public destroy(id: number, callback: any) {
        return this.mainEntity.destroy(id, callback);
    }

    /**
     * Inserts a row into the log table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params: any, callback: any) {
        return this.mainEntity.insert(params, callback);

    }

    public update(params: any, callback: any) {
        return this.mainEntity.update(params, callback);
    }

    public all(page: any, searchParams: any, callback: any) {
        let params: any = searchParams;
        delete params.page;

        if (params === undefined || params === {}) {
            this.mainEntity.all(page, callback);
        }else {
            this.mainEntity.search(page, params, callback);
        }
    }

    public getById(id: number, callback: any) {
        return this.mainEntity.get(id, callback);
    }

}

export = Log;
