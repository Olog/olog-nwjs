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

    private _logTagsEntity : any;

    constructor(connection : any){
        super(new Tags('logbooks', connection, '1'), 'tags');
        this._logTagsEntity = new LogsLogbooks('logs_logbooks', connection);
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
     * @param tagName
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(tagName : string, params : any, callback : any){
        return this.mainEntity.updateByName(tagName, params, callback);
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
        //gets the tag/logbook from the tagname
        let returnAll : any = [];
        this.mainEntity.getByName(tagName, function(err : any, elem : any){
            if(err){
                return err;
            }else{
                for (let log of params.logs){
                    //creates log_logbook entries for all the log ids in the data
                    this._logTagsEntity.insert(
                        {
                            log_id : log.id,
                            logbook_id : elem.logbook_id
                        },
                        function(err : any, elem : any){
                            if(err){
                                return err;
                            }else{
                                returnAll.push(elem);
                            }
                        }
                    )
                }

            }
        });
        return callback(null, returnAll);
    }

    /**
     * Deletes a row from the table
     * @param tag_id
     * @param callback
     * @returns {IQuery}
     */
    public destroy(tag_id : number, callback : any){
        return this.mainEntity.destroy(tag_id, callback);
    }

    /**
     * Deletes records of tags from a log
     * @param log_id
     * @param tagName
     * @param callback
     */
    public destroyByLog(log_id : any, tagName : string, callback : any){
        return this._logTagsEntity.destroyByLog(log_id, tagName, callback);
    }

    public destroyByName( tagName : string, callback : any){
        return this.mainEntity.destroybyName(tagName, callback);
    }


}

export = Tag;