import NG = require('nodegit');
import FileManager = require('./writer');
import fs = require('fs');

import {*} as git from 'git-grep';

/**
 * Class for writing/reading data from the git repo
 */
class StorageDir {

    private _fileManager : any = new FileManager();

    // name of folder containing the repository remote
    private _folderName : string = 'ologDir';

    // Configurations for git
    private _pathName : string = '';
    private _remoteURL : string = '';
    private _remoteName : string = 'origin';

    // Repository object
    private _repo : any;

    // Remote object
    private _remote : any;

    private _gitlab : any;

    private _index : any;

    private _oid : any;

    get gitlab(): any {
        return this._gitlab;
    }

    get fileManager(): any {
        return this._fileManager;
    }

    get folderName(): string {
        return this._folderName;
    }

    get pathName(): string {
        return this._pathName;
    }

    get remoteURL(): string {
        return this._remoteURL;
    }

    get remoteName(): string {
        return this._remoteName;
    }

    /**
     * Constructor
     * @param configs Configurations imported on application start
     */
    constructor(configs: any) {

        this._gitlab = configs.gitlabConfigs;

        // create a folder for the contents from the given path
        this._pathName = configs.repo_conf.local_path;
        this._remoteURL = configs.repo_conf.url;

        if (configs.repo_conf.remote_name !== undefined) {
            this._remoteName = configs.repo_conf.remote_name;
        }

        console.log('Initializing Repo...');

        NG.Clone.clone(this.remoteURL, this._pathName).then(function(repository: any) {
            this._repo = repository;
            return repository.fetchAll({
                callbacks: {
                    credentials: function(url: any, userName: any, password: any){
                        return this.auth(userName, password);
                    },
                    certificateCheck: function() {
                        return 1;
                    },
                },
            });
        })
        .then(function() {
            return this._repo.mergeBranches('master', 'origin/master');
        });
    }

    /**
     * Initialize a repository by cloning it from the given URL
     * @param callback
     */
    private initializeClone (callback: any) {
        NG.Clone.clone(this.remoteURL, this._pathName).then(function(repo: any) {
            callback('Respository Cloned', repo);

        });
    }

    /**
     * Initialize the repository and remote
     * @param callback
     */
    private initialize(callback: any) {
        NG.Repository.init(this._pathName + '/.git', false).then(function( repository: any) {
            callback('Respository Cloned', repository );

        });
    }

    /**
     * Handle authentication through git/gitlab
     */
    public static auth(username: any, pass: any) {
        return NG.Cred.userpassPlaintextNew(username, pass);
    }

    /**
     *
     * @param data Data for specific git events like commit/ author timestamps
     * @param actionItem File modifications
     * @param msg Commit Message to Print
     * @param person Author name and email for this commit
     */
    public commit(data: any, actionItem: string, msg: string, person: any) {
        // get index for add/commits
        NG.Repository.open(this._pathName + '/.git')
            .then(function(repoResult){
            this._repo = repoResult;
            return this._repo.refreshIndex();
        })
            .then(function(indexResult: any){
                this._index = indexResult;
            })
            .then(function(){
                if (actionItem !== null) {
                    return this.add();
                } else {
                    return this.remove(this._pathName + '/' + actionItem);
                }
            })
            .then(function(){
                // write the files to the index
                return this._index.write();
            })
            .then(function(){
                return this._index.writeTree();
            })
            .then(function(oidResult: any){
                this._oid = oidResult;
                return NG.Reference.nameToId(this._repo, 'HEAD');
            })
            .then(function(head: any){
                return this._repo.getCommit(head);
                // return the commit to push to master
            })
            .then(function(parent: any){
                let committer = this.sign(person.email, person.name, data.auditTime, -300);
                let author = this.sign(person.email, person.name, data.eventTime, -300);

                return this._repo.createCommit(
                    'HEAD',
                    author,
                    committer,
                    msg,
                    this._oid,
                    [parent],
                );
            })
            .then(function(commitId: any){
                // commit finished
                console.log('New Commit :', commitId);

                return NG.Remote.create(
                    this._repo, this._remoteName, this._remoteURL,
                );
            })
            .then(function(remoteResult){
                this._remote = remoteResult;
                return this._remote.push(
                    ['refs/heads/master:refs/heads/master'],
                    {
                        callbacks: {
                            credentials: function(url: any, userName: any, password: any){
                                this.auth(userName, password);
                            },
                        },
                    },
                );
            });
    }

    /**
     * Pushes any changes that have been committed to the remote repository
     */
    public pushToRepo() {
        NG.Repository.open(this._pathName + '/.git')
            .then(function(repoResult){
                this._repo = repoResult;
                return this._repo.refreshIndex();
        }).then(function(indexStat) {
            return this._remote.push(
                ['refs/heads/master:refs/heads/master'],
                {
                    callbacks: {
                        credentials: function(url: any, userName: any, password: any){
                            this.auth(userName, password);
                        },
                    },
                },
            );
        });

    }

    /**
     * Remove file from the repository
     * @param filepath The path to the file to remove
     * @returns {number}
     */
    public remove(filepath: string) {
        return this._index.removeByPath(filepath);
    }

    /**
     * Adds the changes made in the repository
     * @returns {number}
     */
    public add() {
        return this._index.addByPath(this._pathName);
    }


    public fetchAll() {
        return this._repo.fetch('origin', {
            callbacks: {
                credentials: function(url: any, userName: any, password: any) {
                    this.auth(userName, password);
                },
            },
        });
    }

    private stringSearchParams (searchParams: any) {

        let searchString = '';
        let first: boolean = true;
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

    private convertToFolders (items: any) {
        let newArr = [];
        for (let entry of items) {
            let fileContents = this._fileManager.importJSON(items);
            newArr.push(fileContents);
        }

        return newArr;
    }

    private returnFromSorted(): any {

    }

    public search(term: string): any {
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
    private sign(autherEmail: any, authorName: any, time: any, offset: any) {
        return NG.Signature.create(authorName, autherEmail, time, offset);
    }


}

export = StorageDir;
