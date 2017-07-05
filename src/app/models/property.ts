import ApplicationModel = require('./app');
import Properties = require('../entities/properties');

/**
 * Class for modifying logs in the database
 * Properties Attributes:
 *      id,
 *      name,
 *      enum='Active',
 * Attributes:
 *      id,
 *      property_id,
 *      name,
 *      state='Active'
 */
class Property extends ApplicationModel{


    /**
     * Property Constructor
     */
    constructor(connection : any){
        super(new Properties('properties', connection), 'properties');
    }

    public all(page: any, logId: number, callback : any){
        return this.mainEntity.all(page,callback);

    }

    public getById(id: number, callback : any){
        return this.mainEntity.getById(id,callback);

    }

    public update(id: number, params : any, callback : any){

    }

    public insert(params : any, callback : any){

    }

}

export = Property;