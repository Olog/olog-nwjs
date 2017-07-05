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
}

export = ApplicationModel;