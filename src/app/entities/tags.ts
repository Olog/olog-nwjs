import ApplicationEntity = require('./app');

/**
 * Class for modifying logs in the database
 */
class Tags extends ApplicationEntity {

    /**
     * constructor
     * @param tablename
     * @param connection
     */
    constructor(tablename: string, connection: any) {
        super(tablename, connection);
    }

    /**
     * Gets the array of tags from the tag config file
     * @returns {any}
     */
    private getTagData() {
        return this.fileManager.importJSON(this.filePath + '/templates/tags.json').tags;
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
        let tagData: any = this.getTagData();
        let newTag =   {
            id: this.genId,
            name: params.name,
            owner: params.owner,
        };
        if (tagData === undefined) {
            tagData = [];
        }
        tagData.push(newTag);

        this.fileManager.writeJSON({tags: tagData},
            this.filePath + '/templates/',
            'tags',
        );
        // commit and push the results
        return callback(newTag);
    }

    /**
     * returns the tag searched by name
     * @param tagname
     * @param callback
     * @returns {any}
     */
    public getByName(tagname: string, callback: any) {
        let tagData: any = this.getTagData();
        let oldTag: any = {};
        tagData = tagData.filter(function( obj: any ) {
            if (obj.name === tagname) {
                oldTag = obj;
            }
            return obj.name !== tagname;
        });
        return callback(oldTag);
    }

    public update(tagname: number, params: any, callback: any) {
        let tagData: any = this.getTagData();
        let oldTag: any = {};
        tagData = tagData.filter(function( obj: any ) {
            if (obj.name === tagname) {
                obj.name = params.name;
                obj.owner = params.owner;
                oldTag = obj;
            }
            return true;
        });

        this.fileManager.writeJSON({tags: tagData},
            this.filePath + '/templates/',
            'tags',
        );
        return callback(oldTag);
    }

    /**
     * destroys a tag by name, does not remove from the logs
     * @param tagname
     * @param callback
     * @returns {any}
     */
    public destroy(tagname: string, callback: any) {
        let tagData: any = this.getTagData();
        let oldTag: any = {};
        tagData = tagData.filter(function( obj: any ) {
            if (obj.name === tagname) {
                oldTag = obj;
            }
            return obj.name !== tagname;
        });
        this.fileManager.writeJSON({tags: tagData},
            this.filePath + '/templates/',
            'tags',
        );
        return callback(oldTag);
    }

}

export = Tags;
