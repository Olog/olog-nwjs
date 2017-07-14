"use strict";
const NG = require("nodegit");
const W = require("./entity");
/**
 * Class for writing/reading data from the git repo
 */
class StorageDir {
    /**
     * Constructor
     * @param configs Configurations imported on application start
     */
    constructor(configs) {
        //performs write/read operations from the git repo
        this._writer = new W;
        //name of folder containing the repository remote
        this._folderName = 'ologDir';
        //Configurations for git
        this._pathName = '';
        this._remoteURL = '';
        this._remoteName = 'origin';
        //create a folder for the contents from the given path
        this._pathName = configs.repo_conf.local_path;
        this._remoteURL = configs.repo_conf.url;
        if (configs.repo_conf.remote_name !== undefined) {
            this._remoteName = configs.repo_conf.remote_name;
        }
        //initialize a repository if it does not exist
        this.initialize(function (event) {
            console.log(event);
        });
    }
    /**
     * Returns the author and commiter
     * @param author_email
     * @param author_name
     * @param callback
     * @returns {any}
     */
    sign(author_email, author_name, callback) {
        return callback(NG.Signature.now(author_name, author_email), NG.Signature.now(author_name, author_email));
    }
    /**
     * Initialize the repository and remote
     * @param callback
     */
    initialize(callback) {
        NG.Repository.init(this._pathName, false).then(function (repository) {
            console.log("Repo init : " + repository);
            // Use repository
            this._repo = repository;
            //create the remote
            this._remote = NG.Remote.create(repository, this._remoteName, this._remoteURL);
            callback("Repository Initialized");
        });
    }
    /**
     * Adds files to git a remote
     */
    add(filepath, elems) {
    }
    /**
     * commit files to a remote
     */
    commit(author, eventTime, tags) {
    }
    /**
     * Remove file from git
     */
    remove() {
    }
    /**
     * Handle authentication through git/gitlab
     */
    authenticate() {
    }
}
module.exports = StorageDir;
