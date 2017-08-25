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

    /**
     * Formats the data into json for saving
     * @param data {
     *  uuid: string
     *  level: string
     *  state: string,
     *  description: string
     *  tags: array fo tag names (strings),
     * }
     */
    public serialize(data: any) {
        return {
            log : {
                id: data.id,
                level : data.level,
                state : data.state,
                description : data.description,
                tags: data.tags,
            },
        };

    }

    /**
     * Search for the entry in the database
     * @param page
     * @param callback
     */
    public all(page: any, callback: any) {
        // find parent directory, search rest of folders
        return this.search(page, {}, callback);
    }


    /**
     * Searches for a specific logbook given parameters
     * @param page
     * @param searchParams
     * @param callback
     * @returns {any}
     */
    public search(page: any, searchParams: any, callback: any) {
        if (searchParams === undefined) {
            searchParams = {};
        }
        return callback(null, this.conn.search(searchParams));
    }

    /**
     * returns a log given the id
     * @param id
     * @param callback
     * @returns {IQuery|any}
     */
    public getById(id: number, callback: any) {
        // return using git search
    }

    /**
     * Inserts a log
     * @param params
     * @param callback
     * @returns {IQuery|any}
     */
    public insert(params: any, callback: any) {
        if (params.id === undefined) {
            params.id = this.genId;
        }
        let temp: any = this.serialize(params);

        let date = this.dateCreated(params.createdAt);
        // filepath to insert by: /logs/year

        let logPath = this.filePath + '/' +
            params.logbook + '/logs/' +
            date.year   +   '/' +
            date.month  +   '/' +
            date.day    +   '/' +
            params.createdAt;

        this.fileManager.writeJSON(temp,
            logPath,
            date.timestamp,
        );

        // save the files to the correct folder location
        // commits and pushes to repo master branch
        this.conn.commit(
            {
                auditTime: params.createdAt,
                eventTime: params.eventTime,
            },
            null,
            'Log Entry Added',
            {
                name: this.user.name,
                email: this.user.email,
            },
        );

        return callback(null, temp);
    }


    /**
     * updates a log entry
     * @param id
     * @param params
     * @param callback
     * @returns {IQuery|any}
     */
    public update(id: number, params: any, callback: any) {
        // Find the log by id using git search

    }

    /**
     * Destroys a log given the id
     * @param createdAt
     * @param logbook
     * @param callback
     * @returns {IQuery|any}
     */
    public destroy(createdAt: number, logbook: string, callback: any) {
        let date = this.dateCreated(createdAt);
        // filepath to insert by: /logs/year

        let logPath = this.filePath + '/' +
                logbook + '/logs/' +
                date.year   +   '/' +
                date.month  +   '/' +
                date.day    +   '/' +
                createdAt;

        let temp: any = this.fileManager.importJSON(logPath);

        this.fileManager.removeFile(
            logPath,
            function (err: any) {
                // handle file delete action
                if (err) {console.log(err); }
            },
        );

        // commits and pushes to repo master branch
        this.conn.commit(
            {
                auditTime: null,
                eventTime: null,
            },
            true, // git remove cmd
            'Log Entry Added',
            {
                name: this.user.name,
                email: this.user.email,
            },
        );

        return temp;
    }
}

export = Logs;
