import ApplicationEntity = require('./app');

/**
 * Class for modifying logs in the database
 */
class Tags extends ApplicationEntity {

    constructor(tablename: string, connection: any) {
        super(tablename, connection);
    }

    /**
     * Read the JSON file containing all tags
     * @param page
     * @param callback
     */
    public all(page: any, callback: any) {
        return callback(this.fileManager.importJSON(this.filePath + '/tags.json').tags);
    }

    /**
     * Adds a tag to the list of tags
     * @param params
     * @param callback
     */
    public insert(params: any, callback: any) {
        let tagData = this.fileManager.importJSON(this.filePath + '/tags.json').tags;
    }

    public getByName(tagname: string, callback: any) {

    }

    public update(id: number, params: any, callback: any) {

    }

    public updateByName(tagName: string, params: any, callback: any) {

    }

    public destroybyName(tagname: string, callback: any) {

    }

}

export = Tags;
