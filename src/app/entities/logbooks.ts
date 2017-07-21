import ApplicationEntity = require('./app');

/**
 * Class for modifying logs in the database
 * Logbook Attributes:
 *      id,
 *      name,
 *      is_tag=0,
 *      owner,
 *      state
 */
class Logbooks extends ApplicationEntity{

    private _is_tag : string = '0';

    constructor(tablename : string, connection : any, is_tag : string){
        super(tablename, connection);
        this._is_tag = is_tag;
    }

    /**
     * Returns all rows of tags
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page : any, callback : any){
        this.fileManager.getDirFiles(this.conn.pathName, true,function(res : any){
            return callback(null, res);
        });
    }

    /**
     * Selects a logbook by ID
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public getById(id : number, callback : any){
        return this.conn.query(
            "SELECT id,name,owner,state FROM " + this.tableName + " WHERE is_tag=" + this._is_tag+" AND id=?",
            [id],
            callback);
    }

    /**
     * Selects a logbook by name
     * @param tagname
     * @param callback
     * @returns {IQuery}
     */
    public getByName(tagname : string, callback : any){
        return this.conn.query(
            "SELECT id,name,owner,state FROM " + this.tableName + " WHERE is_tag=" + this._is_tag+" AND name=?",
            [tagname],
            callback);
    }

    /**
     * Updates a tag with the given ID
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(id : number, params : any, callback : any){
        return this.conn.query(
            "UPDATE "+ this.tableName +
            " set name=?, owner=?, state=? WHERE id=? AND is_tag=?" +
            [
                params.name,
                params.owner,
                (params.state || 'Active'),
                id,
                this._is_tag
            ],
            callback);
    }
    /**
     * Updates a tag with the given ID
     * @param tagName
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public updateByName(tagName : string, params : any, callback : any){
        return this.conn.query(
            "UPDATE "+ this.tableName +
            " set name=?, owner=?, state=? WHERE name=? AND is_tag=?" +
            [
                params.name,
                params.owner,
                (params.state || 'Active'),
                tagName,
                this._is_tag
            ],
            callback);
    }

    /**
     * Inserts a row into the logbook table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params : any, callback : any){
        return this.conn.query(
            "INSERT INTO "+ this.tableName +
            "(name, owner, state, is_tag)" +
            " values(?,?,?,?)",
            [
                params.name,
                params.owner,
                (params.state || 'Active'),
                this._is_tag
            ],
            callback);
    }

    /**
     * Deletes a row from the table
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public destroy(id : number, callback : any){
        return this.conn.query(
            "DELETE FROM " + this.tableName + " WHERE is_tag=" + this._is_tag + " AND id=?",
            [id],
            callback);
    }

    /**
     * Deletes a row from the table
     * @param tagname
     * @param callback
     * @returns {IQuery}
     */
    public destroybyName(tagname : string, callback : any){
        return this.conn.query(
            "UPDATE " + this.tableName + " SET state=? WHERE is_tag=" + this._is_tag + " AND name=?",
            [
                'Inactive',
                tagname
            ],
            callback);
    }

}

export = Logbooks;