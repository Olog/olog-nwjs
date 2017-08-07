import ApplicationModel = require('./app');
import Properties = require('../entities/properties');

/**
 * Class for modifying logs in the database
 * Properties Attributes:
 *      id,
 *      name,
 *      state='Active',
 * Attributes:
 *      id,
 *      property_id,
 *      name,
 *      state='Active'
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

    /**
     * Insert a property with attributes into the database
     * @param name The Property Name itself
     * @param params Attribute objects to add
     * @param callback
     */
    public insert(name : string, params : any, callback : any){
        let returnAll : any = {};
        this.mainEntity.insert({name : name}, function(err : any, elem : any){
            if(err){
                return err;
            }else{
                returnAll['property'] = elem;
                returnAll['property']['attributes'] = [];
                //add the attributes
                let id = elem.id;
                for (let attr of params.attributes){
                    this._attributesEntity.insert(
                        {
                            name : attr.name,
                            property_id : id
                        },
                        function(err : any, elem : any){
                            if(err){
                                return err;
                            }else{
                                returnAll['property']['attributes'].push(elem);
                            }
                        }
                    )
                }
            }
        });
        return callback(null, returnAll);

    }

    public destroy(name : string, callback : any){
        return this.mainEntity.destroy(name, callback);
    }
}

export = Property;