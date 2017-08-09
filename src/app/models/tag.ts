import ApplicationModel = require('./app');
import Tags = require('../entities/tags');

/**
 * Class for modifying logs in the database
 */
class Tag extends ApplicationModel {


    constructor(connection: any) {
        super(new Tags('tags', connection), 'tags');
    }


    /**
     * Returns all rows of tags
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page: any, callback: any) {
        return this.mainEntity.all(page, callback);
    }

    /**
     * Selects a tag by ID
     * @param name
     * @param callback
     * @returns {IQuery}
     */
    public get(name: string, callback: any) {
        return this.mainEntity.getByName(name, callback);
    }

    /**
     * Updates a tag with the given ID
     * @param tagName
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(tagName: string, params: any, callback: any) {
        return this.mainEntity.update(tagName, params, callback);
    }

    /**
     * Inserts a row into the tag table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params: any, callback: any) {
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
     * @param tagId
     * @param callback
     * @returns {IQuery}
     */
    public destroy(tagId: number, callback: any) {
        return this.mainEntity.destroy(tagId, callback);
    }

}

export = Tag;