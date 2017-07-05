import ApplicationModel = require('./app');
import Tags = require('../entities/logbooks');
import LogsLogbooks = require('../entities/logs_logbooks');

/**
 * Class for modifying logs in the database
 * Tag Attributes:
 *      id,
 *      name,
 *      is_tag=1,
 *      owner,
 *      state
 */
class Tag extends ApplicationModel{

    private _log_tags : any;

    constructor(connection : any){
        super(new Tags('logbooks', connection, '1'), 'tags');
        this._log_tags = new LogsLogbooks('logs_logbooks', connection);
    }


    /**
     * Returns all rows of tags
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page : any, callback : any){
        return this.mainEntity.all(page,callback);
    }

    /**
     * Selects a tag by ID
     * @param name
     * @param callback
     * @returns {IQuery}
     */
    public get(name : string, callback : any){
        return this.mainEntity.getByName(name, callback);
    }

    /**
     * Updates a tag with the given ID
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(id : number, params : any, callback : any){
        return this.mainEntity.update(id, params, callback);

    }

    /**
     * Inserts a row into the tag table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params : any, callback : any){
        return this.mainEntity.insert(params, callback);
    }

    /**
     * Inserts a row into the logs_logbooks
     * @param tagName
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public setToLogs(tagName : string, params : any, callback : any){
            //
    }

    /**
     * Deletes a row from the table
     * @param tag_id
     * @param callback
     * @returns {IQuery}
     */
    public destroy(tag_id : number, callback : any){
        return this.mainEntity.destroybyLogbook(tag_id, callback);
    }

    /**
     * Deletes records of tags from a log
     * @param log_id
     * @param tag_id
     * @param callback
     */
    public destroybyLog(log_id : any, tag_id : any, callback : any){
        return this.mainEntity.destroybyLog(log_id, tag_id, callback);
    }

    public checkValid(data : any){

    }

    public validateUser(data : any){

    }

    public validateOwner(data : any){

    }
}

export = Tag;