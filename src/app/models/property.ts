import ApplicationModel = require('./app');
import Properties = require('../entities/properties');

/**
 * Class for modifying logs in the database
 */
class Property extends ApplicationModel{

    private _attributesEntity : any;
    /**
     * Property Constructor
     */
    constructor(connection : any){
        super(new Properties('properties', connection), 'properties');

    }

    /**
     * Selects all the properties with their attributes
     * @param page
     * @param callback
     */
    public all(page: any, callback : any){
        return this.mainEntity.all(page, callback);

    }

    /**
     * Selects a property by the given ID
     * @param name
     * @param callback
     */
    public get(name: string, callback : any){
        return this.mainEntity.getByName(name, callback);
    }

    public newAttr(propName : string, id: number, params : any, callback : any){

    }

    public update(name: string, params: any, callback: any){
        return this.mainEntity.update(name,params, callback);
    }
    /**
     * Insert a property with attributes into the database
     * @param params Attribute objects to add
     * @param callback
     */
    public insert(params : any, callback : any){
        return this.mainEntity.insert(params, callback);
    };

    public destroy(name : string, callback : any){
        return this.mainEntity.destroy(name, callback);
    }
}

export = Property;