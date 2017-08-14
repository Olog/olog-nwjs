"use strict";
const NG = require("nodegit");
const FileManager = require("./writer");
// import gitGrep = require('git-grep');
/**
 * Class for writing/reading data from the git repo
 */
class StorageDir {
    /**
     * Constructor
     * @param configs Configurations imported on application start
     */
    constructor(configs) {
        // Write/read from files in the repository folder
        this._fileManager = new FileManager();
        // name of folder containing the repository remote
        this._folderName = 'ologDir';
        // Configurations for git
        this._pathName = '';
        // remote url where all commits will be pushed
        this._remoteURL = '';
        // remote name (optional)
        this._remoteName = 'origin';
        this._gitlab = configs.gitlabConfigs;
        // create a folder for the contents from the given path
        this._pathName = configs.repo_conf.local_path;
        this._remoteURL = configs.repo_conf.url;
        if (configs.repo_conf.remote_name !== undefined) {
            this._remoteName = configs.repo_conf.remote_name;
        }
        // clone the repository on initial application startup
        NG.Clone.clone(this.remoteURL, this._pathName).then(function (repository) {
            // set the repo instance
            this._repo = repository;
            // git fetch
            return repository.fetchAll({
                callbacks: {
                    // credentials for pushing changes to the repository are received from the url
                    credentials: function (url, userName, password) {
                        return this.auth(userName, password);
                    },
                    certificateCheck: function () {
                        return 1;
                    },
                },
            });
        })
            .then(function () {
            // update the local changes with the repo
            return this._repo.mergeBranches('master', 'origin/master');
        });
    }
    get gitlab() {
        return this._gitlab;
    }
    get fileManager() {
        return this._fileManager;
    }
    get folderName() {
        return this._folderName;
    }
    get pathName() {
        return this._pathName;
    }
    get remoteURL() {
        return this._remoteURL;
    }
    get remoteName() {
        return this._remoteName;
    }
    /**
     * Initialize a repository by cloning it from the given URL
     * @param callback
     */
    initializeClone(callback) {
        NG.Clone.clone(this.remoteURL, this._pathName).then(function (repo) {
            callback('Respository Cloned', repo);
        });
    }
    /**
     * Initialize the repository and remote
     * @param callback
     */
    initialize(callback) {
        NG.Repository.init(this._pathName + '/.git', false).then(function (repository) {
            callback('Respository Cloned', repository);
        });
    }
    /**
     * Handle authentication through git/gitlab
     */
    static auth(username, pass) {
        return NG.Cred.userpassPlaintextNew(username, pass);
    }
    /**
     * Commit all changes made in the master repository
     * @param data Data for specific git events like commit/ author timestamps
     * @param actionItem File modifications
     * @param msg Commit Message to Print
     * @param person Author name and email for this commit
     */
    commit(data, actionItem, msg, person) {
        // get index for add/commits
        NG.Repository.open(this._pathName + '/.git')
            .then(function (repoResult) {
            // get the updated repository object
            this._repo = repoResult;
            return this._repo.refreshIndex();
        })
            .then(function (indexResult) {
            // get updated index
            this._index = indexResult;
        })
            .then(function () {
            // check if file is added/removed
            if (actionItem !== null) {
                return this.add();
            }
            else {
                return this.remove(this._pathName + '/' + actionItem);
            }
        })
            .then(function () {
            // write the files to the index
            return this._index.write();
        })
            .then(function () {
            return this._index.writeTree();
        })
            .then(function (oidResult) {
            this._oid = oidResult;
            // set changes to head with a commit
            return NG.Reference.nameToId(this._repo, 'HEAD');
        })
            .then(function (head) {
            // return the commit to push to master
            return this._repo.getCommit(head);
        })
            .then(function (parent) {
            // sign the commit with the given credentials/ timestamps
            let committer = this.sign(person.email, person.name, data.auditTime, -300);
            let author = this.sign(person.email, person.name, data.eventTime, -300);
            // return the repository commit created
            return this._repo.createCommit('HEAD', author, committer, msg, this._oid, [parent]);
        })
            .then(function (commitId) {
            // return updated instance of the remote to push changes to
            return NG.Remote.create(this._repo, this._remoteName, this._remoteURL);
        })
            .then(function (remoteResult) {
            this._remote = remoteResult;
            return this._remote.push(
            // push commit to the remote instantly
            ['refs/heads/master:refs/heads/master'], {
                callbacks: {
                    // use credentials from the url
                    credentials: function (url, userName, password) {
                        this.auth(userName, password);
                    },
                },
            });
        });
    }
    /**
     * Pushes any changes that have been committed to the remote repository
     */
    pushToRepo() {
        NG.Repository.open(this._pathName + '/.git')
            .then(function (repoResult) {
            this._repo = repoResult;
            return this._repo.refreshIndex();
        }).then(function (indexStat) {
            return this._remote.push(['refs/heads/master:refs/heads/master'], {
                callbacks: {
                    credentials: function (url, userName, password) {
                        this.auth(userName, password);
                    },
                },
            });
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
     * @returns {number}
     */
    add() {
        return this._index.addByPath(this._pathName);
    }
    /**
     * Fetch changes from the repository
     * @returns {Promise<number>|Promise<Response>|Promise<void>}
     */
    fetchAll() {
        return this._repo.fetch('origin', {
            callbacks: {
                credentials: function (url, userName, password) {
                    this.auth(userName, password);
                },
            },
        });
    }
    stringSearchParams(searchParams) {
        let searchString = '';
        let first = true;
        for (let items of searchParams) {
            // Set the extra params for git-grep
            if (!first) {
                searchString += ' --and -e ';
            }
            // let fileContents = fileManager.importJSON(items);
            // newArr.push(fileContents);
            first = false;
        }
    }
    convertToFolders(items) {
        let newArr = [];
        for (let entry of items) {
            let fileContents = this._fileManager.importJSON(items);
            newArr.push(fileContents);
        }
        return newArr;
    }
    returnFromSorted() {
    }
    search(term) {
        if (term === {}) {
            return this.returnFromSorted();
        }
        /**
         *
         *   gitGrep((this._pathName + '/.git'), {
         *      rev: 'HEAD',
         *      term: term,
         *   })
         *   .on('data', function(data: any) {
         *       return this.convertToFolders(data);
         *   })
         *   .on('error', function(err: any) {
         *       return null;
         *   })
         *   .on('end', function(){
         *       // end
         *   });
         */
    }
    /**
     * Returns the author and commiter
     * @param autherEmail
     * @param authorName
     * @param time
     * @param offset
     * @returns {any}
     */
    sign(autherEmail, authorName, time, offset) {
        return NG.Signature.create(authorName, autherEmail, time, offset);
    }
}
module.exports = StorageDir;
