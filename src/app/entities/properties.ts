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
        let properties = this.getPropertyData();
        let old: any = {};
        properties = properties.filter(function( obj: any ) {
            if (obj.id === id) {
                old = obj;
            }
            return obj.id !== id;
        });
        return callback(null, old);
    }

    /**
     * Selects a property by Name
     * @param name
     * @param callback
     * @returns {IQuery}
     */
    public getByName(name: string, callback: any) {
        let properties = this.getPropertyData();
        let old: any = {};
        properties = properties.filter(function( obj: any ) {
            if (obj.name === name) {
                old = obj;
            }
            return obj.name !== name;
        });
        return callback(null, old);
    }

    /**
     * Updates a property with the given name
     * @param name
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public update(name: string, params: any, callback: any) {
        let properties = this.getPropertyData();
        let old: any = {};
        properties = properties.filter(function( obj: any ) {
            if (obj.name === name) {
                obj.name = params.name;
                obj.attributes = params.attributes;
                old = obj;
            }
            return true;
        });

        this.fileManager.writeJSON({properties: properties},
            this.filePath + '/templates/',
            'properties',
        );
        return callback(null, old);
    }

    /**
     * Inserts a row into the property table
     * @param params
     * @param callback
     * @returns {IQuery}
     */
    public insert(params: any, callback: any) {
        let propertyData: any = this.getPropertyData();
        let newProperty = {
            id: this.genId,
            name: params.name,
            attributes: params.attributes, // array of attribute objects
        };

        if (propertyData === undefined) {
            propertyData = [];
        }

        propertyData.push(newProperty);

        this.fileManager.writeJSON({properties: propertyData},
            this.filePath + '/templates/',
            'properties',
        );

        // commit and push the results
        return callback(null, newProperty);
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
        this.filePath + '/templates/',
        'properties',
        );
        return callback(null, oldProperty);
    };

}

export = Properties;
