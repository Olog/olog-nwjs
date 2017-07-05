import ApplicationModel = require('./app');
import Logbooks = require('../entities/logbooks');

/**
 * Class for modifying logs in the database
 * Logbook Attributes:
 *      id,
 *      name,
 *      is_tag=0,
 *      owner,
 *      state
 */
class Logbook extends ApplicationModel{

    constructor(connection : any){
        super(new Logbooks('logbooks', connection, '0'), 'logbooks');
    }


    /**
     * Returns all rows of logbooks
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page : any, callback : any){
        return this.mainEntity.all(page,callback);
    }

    /**
     * Selects a logbook by ID
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public getById(id : number, callback : any){
        return this.mainEntity.getById(id,callback);

    }

    /**
     * Updates a logbook with the given ID
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(id : number, params : any, callback : any){
        return this.mainEntity.update(id, params, callback);

    }

    /**
     * Inserts a row into the logbook table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params : any, callback : any){
        return this.mainEntity.insert(params, callback);

    }
    /**
     * Deletes a row from the table
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public destroy(id : number, callback : any){
        return this.mainEntity.destroy(id, callback);

    }

}

export = Logbook;