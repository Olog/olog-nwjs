"use strict";
const NG = require("nodegit");
/**
 * Class for writing/reading data from the git repo
 */
class StorageDir {
    /**
     * Constructor
     * @param configs Configurations imported on application start
     */
    constructor(configs) {
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
        this.fetchAll();
        //get index for add/commits
        this._repo.refreshIndex().then(function (indexResult) {
            this._index = indexResult;
        });
    }
    /**
     * Returns the author and commiter
     * @param author_email
     * @param author_name
     * @param callback
     * @returns {any}
     */
    sign(author_email, author_name) {
        return NG.Signature.now(author_name, author_email);
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
     * commit files to a remote
     */
    commit(action, msg, author, eventTime, tags) {
        //get index for add/commits
        this._repo.refreshIndex()
            .then(function (indexResult) {
            this._index = indexResult;
        })
            .then(function () {
            return action;
        })
            .then(function () {
            //write the files to the index
            return this._index.write();
        })
            .then(function () {
            return this._index.writeTree();
        })
            .then(function (oidResult) {
            this._oid = oidResult;
            return NG.Reference.nameToId(this._repo, "HEAD");
        })
            .then(function (head) {
            return this._repo.getCommit(head);
            //return the comit to push to master
        })
            .then(function (parent) {
            let commit_author = this.sign(author.email, author.name);
            return this._repo.createCommit("HEAD", commit_author, commit_author, msg, this._oid, [parent]);
        })
            .done(function (commitId) {
            //commit finished
            console.log("New Commit:", commitId);
            return commitId;
        });
    }
    /**
     * Pushes any changes that have been committed to the remote repository
     */
    pushToRepo() {
        return this._remote.push(["refs/heads/master:refs/heads/master"], {
            callbacks: {
                credentials: function (url, userName, password) {
                    this.auth(userName, password);
                }
            }
        });
    }
    /**
     * Remove file from the repository
     * @param filepath The path to the file to remove
     * @returns {number}
     */
    remove(filepath) {
        return this._index.removeByPath(filepath);
    }
    /**
     * Adds the changes made in the repository
     * @param filepath If only adding a single file
     * @returns {number}
     */
    add(filepath) {
        return this._index.addByPath(filepath || this._pathName);
    }
    /**
     * Handle authentication through git/gitlab
     */
    static auth(username, pass) {
        return NG.Cred.userpassPlaintextNew(username, pass);
    }
    fetchAll() {
        return this._repo.fetch("origin", {
            callbacks: {
                credentials: function (url, userName, password) {
                    this.auth(userName, password);
                }
            }
        });
    }
}
module.exports = StorageDir;
