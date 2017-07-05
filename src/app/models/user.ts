import ApplicationModel = require('./app');

/**
 * Class for managing Accounts/ Logins
 * Attributes:
 *      id,
 *      name,
 *
 */
class User extends ApplicationModel{

    private _id : any = null;

    constructor(params : any){

        //database is a different link for this class
        super(null, "user");
        this._id = params.id;
    }

    public all(page : any, callback : any){
        return this.mainEntity.all(page,callback);
    }
}

export = User;