import mysql = require('mysql');

class ApplicationModel {

    private _mainEntity : any;
    private _nameWrapper : string = " ";

    constructor(entity : any, name : string){
        this._mainEntity = entity;
        this._nameWrapper = name;
    }


    get mainEntity(): any {
        return this._mainEntity;
    }

    /**
     * Formats the JSON response
     * @param elems JSON object
     */
    public setJSON(elems : any){
        return {
            [this._nameWrapper] : elems
        };
    }

    /**
     * Checks if the entry for this object is correct
     * @param data Data given
     * @param req Array of the required fields
     */
    public checkValid(data : any, req : any){

    }

    /**
     * Validates the user has access for a given operation
     * @param data
     */
    public validateUser(data : any){

    }

    /**
     * Validates the owner of this object is the given user in the data
     * @param data
     */
    public validateOwner(data : any){

    }
}

export = ApplicationModel;