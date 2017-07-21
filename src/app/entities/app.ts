import FileManager = require('../../lib/storage/writer');

class ApplicationModel {
    private _tableName : any = null;

    private _conn : any = null;

    private _fileManager : any = new FileManager();

    /**
     * constructor
     * @param tablename Name of Table
     * @param connection DB
     */
    constructor(tablename : string, connection : any){
        this._tableName = tablename;
        this._conn = connection;
    }

    /**
     * Converts unix timestamp to Datetime and returns an
     * object of year, mon, day,timestamp
     * @param unixtime
     */
    public dateCreated(unixtime : any) : any {
        let tt : any = new Date(unixtime);
        return {
            year: tt.getFullYear(),
            month: tt.getMonth(),
            day: tt.getDate(),
            timestamp: unixtime
        };
    }

    get fileManager(): any {
        return this._fileManager;
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

    get filePath() : string{
        return this._conn.pathName;
    }

    /**
     * Overwritten by each entity class
     * For custom git file json format
     */
    public serialize(data : any) {
        return {};
    }
}

export = ApplicationModel;