import http = require('http');

/**
 *  Interface with the GitLab API
 */
class GitLab {

    // configuration options for requests
    private _options: any = {
        host: 'gitlab.com/api/v4',
        port: 80,
        path: '',
        method: 'GET',
    };

    // Gitlab repository key credential
    private _key: string = '';

    // name of group with the data
    private _groupname: string = '';

    /**
     * constructor
     * @param key
     * @param groupname
     */
    constructor(key: string, groupname: string) {
        this._key = key;
        this._groupname = groupname;
    }

    /**
     * returns all projects in a group and details about the group
     * @param callback
     * @returns {ClientRequest}
     */
    public groupDetails(callback: any) {
        return http.request(this.options('/groups/' + this._groupname, 'GET'), callback);
    }

    /**
     * Return details a project witha  given name
     * @param projectname
     * @param callback
     */
    public projectDetails(projectname: string, callback: any) {
        http.request(
            this.options('/groups/' + this._groupname + '/projects', 'GET'), function(res){

                return callback(res);
               //res.on('data', (d) => {
               //    let result = JSON.parse(d).map(function(a: any) {return a.name === projectname; } );
               //    return callback(result);
               //});

            },
        );
    }

    /**
     * Assign a project to a group
     * @param projectname
     * @param callback
     * @returns {ClientRequest}
     */
    public newProject(projectname: string, callback: any) {
        return http.request(
            this.options(   '/projects?namespace='  +
                            this._groupname         +
                            '&name='                +
                            projectname,
                'POST'),
            callback,
        );
    }

    /**
     * Sets the path and method for a request
     * @param path
     * @param method
     * @returns {any}
     */
    private options(path: string, method: string): any {
        this._options.path = path;
        this._options.method = method;
        this._options.headers = {
          'PRIVATE-TOKEN': this._key,
        };
        return this._options;
    }

}


export = GitLab;
