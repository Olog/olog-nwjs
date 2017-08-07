import ApplicationEntity = require('./app');

/**
 * Properties Table
 * id,
 * name,
 * state = enum['Active', 'Inactive']
 */
class Properties extends ApplicationEntity {

    constructor(tablename: string, connection: any) {
        super(tablename, connection);
    }

    private getPropertyData() {
        return this.fileManager.importJSON(this.filePath + '/templates/properties.json').properties;
    }
    /**
     * Returns all rows of properties
     * @param page
     * @param callback
     * @returns {IQuery}
     */
    public all(page: any, callback: any) {
        return callback(this.getPropertyData());
    }

    /**
     * Selects a property by ID
     * @param id
     * @param callback
     * @returns {IQuery}
     */
    public getById(id: number, callback: any) {
//
    }

    /**
     * Selects a property by Name
     * @param name
     * @param callback
     * @returns {IQuery}
     */
    public getByName(name: string, callback: any) {
        let properties = this.getPropertyData();

        let result = properties.filter(function( obj: any ) {
            return obj.name === name;
        });

        return result;
    }

    /**
     * Updates a tag with the given ID
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(id: number, params: any, callback: any) {

    }

    /**
     * Inserts a row into the logbook table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params: any, callback: any) {
        let propertyData: any = this.getPropertyData();
        let newProperty = {
            name: params.name,
            attributes: params.attributes, // array of attribute objects
        };

        if (propertyData === undefined) {
            propertyData = [];
        }
        propertyData.push(newProperty);

        this.fileManager.writeJSON({property: propertyData},
            this.filePath + '/templates/',
            'properties',
        );

        // commit and push the results
        return callback(newProperty);
    }

    /**
     * Deletes a row from the table by name
     * @param name
     * @param callback
     * @returns {IQuery}
     */
    public destroy(name: string, callback: any) {
        let propertyData: any = this.getPropertyData();
        let oldProperty: any = {};

        propertyData = propertyData.filter(function( obj: any) {
            if (obj.name === name) {
                oldProperty = obj;
            }
            return obj.name !== name;
        });

        this.fileManager.writeJSON({properties: propertyData},
        this.filePath + '/properties/',
        'properties',
        );
        return callback(oldProperty);
    };

}

export = Properties;
