import ApplicationEntity = require('./app');

/**
 * Class for modifying logs in the database
 */
class Tags extends ApplicationEntity {

    constructor(tablename: string, connection: any) {
        super(tablename, connection);
    }

    private getTagData() {
        return this.fileManager.importJSON(this.filePath + '/tags.json').tags;
    }
    /**
     * Read the JSON file containing all tags
     * @param page
     * @param callback
     */
    public all(page: any, callback: any) {
        return callback(this.getTagData());
    }

    /**
     * Adds a tag to the list of tags
     * @param params
     * @param callback
     */
    public insert(params: any, callback: any) {
        let tagData: any = this.getTagData;
        let newTag =   {
            name: params.name,
            owner: params.owner
        };
        tagData.push(newTag);

        this.fileManager.writeJSON({tags: tagData},
            this.filePath,
            'tags',
        );

        // push and commit the results

        return callback(newTag);
    }

    public getByName(tagname: string, callback: any) {
        let tagData = this.getTagData;
        let tagData: any = this.getTagData;
        return callback();
    }

    public update(id: number, params: any, callback: any) {

    }

    public updateByName(tagName: string, params: any, callback: any) {

    }

    public destroybyName(tagname: string, callback: any) {

    }

}

export = Tags;
