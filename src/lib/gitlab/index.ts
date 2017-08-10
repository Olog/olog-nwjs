/**
 *  Interface with the gitlab api
 */

import https = require('https');


class GitLab {

    private _options: any = {
        host: 'gitlab.com/api/v4',
        port: 80,
        path: '',
        method: '',
    };
    private _key: string = '';

    private _groupname: string = '';

    constructor(key: string, groupname: string) {
        this._key = key;
        this._groupname = groupname;
    }

    public groupDetails(callback: any) {
        return https.request(this.options('/groups/' + this._groupname, 'GET'), callback);
    }

    public projectDetails(projectname: string, callback: any) {
        https.request(
            this.options('/groups/' + this._groupname + '/projects', 'GET'), function(res){
                console.log(res);

                return callback(res);
               //res.on('data', (d) => {
               //    let result = JSON.parse(d).map(function(a: any) {return a.name === projectname; } );
               //    return callback(result);
               //});

            },
        );
    }

    public newProject(projectname: string, callback: any) {
        return https.request(
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
