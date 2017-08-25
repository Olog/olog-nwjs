import User = require('./user');
import uuidv1 = require('uuid/v1');

class ApplicationModel {

    // name for the db table/folder
    private _tableName : any = null;

    // the object holding the data folder
    private _conn : any = null;

    // user object
    private _user : any;

    get user(): any {
        return this._user;
    }

    /**
     * Generates a UUID string based on the current time
     * @returns {any}
     */
    get genId(): any{
        return uuidv1();
    }

    /**
     * constructor
     * @param tablename Name of Table
     * @param connection DB
     */
    constructor(tablename: string, connection: any) {
        this._tableName = tablename;
        this._conn = connection;

        this._user = new User({});
    }

    /**
     * Converts unix timestamp to Datetime and returns an
     * object of year, mon, day,timestamp
     * @param unixtime
     */
    public dateCreated(unixtime: any): any {
        let tt: any = new Date(unixtime * 1000);
        return {
            year: tt.getFullYear(),
            month: tt.getMonth(),
            day: tt.getDate(),
            timestamp: unixtime,
        };
    }

    get fileManager(): any {
        return this.conn.fileManager;
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

    get filePath(): string{
        return this._conn.pathName;
    }

    /**
     * Overwritten by each entity class
     * For custom git file json format
     */
    public serialize(data: any) {
        return {};
    }
}

export = ApplicationModel;
