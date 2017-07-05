
class ApplicationModel {
    private _tableName : any = null;

    private _conn : any = null;

    /**
     * constructor
     * @param tablename Name of Table
     * @param connection DB
     */
    constructor(tablename : string, connection : any){
        this._tableName = tablename;
        this._conn = connection;
    }


    get tableName(): any {
        return this._tableName;
    }

    set tableName(value: any) {
        this._tableName = value;
    }

    get conn(): any {
        return this._conn;
    }

}

export = ApplicationModel;