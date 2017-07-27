/**
 *  Interface with the gitlab api
 */

import https = require('https');


class GitLab {

    private _options: any = {
        host: 'https://gitlab.example.com/api/v4',
        port: 80,
        path: '',
        method: '',
    };
    private _key: string = '';

    private _groupname: string = '';

    constructor(key, groupname) {
        this._key = key;
        this._groupname = groupname;
    }

    public groupDetails(callback) {
        return https.request(this.options('/groups/' + this._groupname, 'GET'), callback);
    }

    public projectDetails(project, callback) {
        return https.request(
            this.options('/groups/' + this._groupname + '/projects', 'GET'),
            callback,
        );
    }

    public newProject(projectname, callback) {
        return https.request(
            this.options(   '/projects?namespace='  +
                            this._groupname         +
                            '&name='                +
                            projectname,
                'POST'),
            callback,
        );
    }

    public deleteProject(projectname, callback) {

    }

    public login() {

    }

    public checkPermissions() {

    }

    public newProject() {

    }

    /**
     * Sets the path and method for a request
     * @param path
     * @param method
     * @returns {any}
     */
    private options(path, method): any {
        this._options.path = path;
        this._options.method = method;
        this._options.headers = {
          'PRIVATE-TOKEN': this._key,
        };
        return this._options;
    }

}