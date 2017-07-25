import ApplicationEntity = require('./app');

/**
 * Class for modifying logs in the database
 */
class Logs extends ApplicationEntity {

    // number of logs to receive per page.
    private perPage: number = 10;

    /**
     * constructor
     * @param tablename
     * @param connection
     */
    constructor(tablename: string, connection: any) {
        super(tablename, connection);
    }

    public serialize(data: any) {
        return {
            log : {
                level : data.level,
                state : data.state,
                description : data.description,
            },
        };

    }

    /**
     * Search for the entry in the database
     * @param page
     * @param callback
     */
    public all(page: any, callback: any) {
        return this.search(page, {}, callback);
    }

    public search(page: any, searchParams: any, callback: any) {
        if (searchParams === undefined) {
            searchParams = {};
        }
        return this.conn.search(searchParams);
    }

    /**
     * returns a log given the id
     * @param id
     * @param callback
     * @returns {IQuery|any}
     */
    public getById(id: number, callback: any) {

    }

    /**
     * Inserts a log
     * @param params
     * @param callback
     * @returns {IQuery|any}
     */
    public insert(params: any, callback: any) {
        let temp: any = this.serialize(params);

        let date = this.dateCreated(params.createdAt);
        // filepath to insert by: /logs/year
        this.fileManager.writeFile(temp,
            this.filePath + '/logs/' +
            date.year   +   '/' +
            date.month  +   '/' +
            date.day,
            date.timestamp,
        );

        // commit
        return temp;
    }


    /**
     * updates a log entry
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery|any}
     */
    public update(id: number, params: any, callback: any) {

    }

    /**
     * Destroys a log given the id
     * @param id
     * @param callback
     * @returns {IQuery|any}
     */
    public destroy(id: number, callback: any) {

    }
}

export = Logs;
