import NG = require("nodegit");
import fs = require("fs");
import W = require('./entity');

/**
 * Class for writing/reading data from the git repo
 */
class StorageDir {

    //performs write/read operations from the git repo
    private _writer : any = new W;

    //name of folder containing the repository remote
    private _folderName : string = 'ologDir';

    //Configurations for git
    private _pathName : string = '';
    private _remoteURL : string = '';
    private _remoteName : string = 'origin';

    //Repository object
    private _repo : any;

    //Remote object
    private _remote : any;

    /**
     * Constructor
     * @param configs Configurations imported on application start
     */
    constructor(configs : any){

        //create a folder for the contents from the given path
        this._pathName = configs.repo_conf.local_path;
        this._remoteURL = configs.repo_conf.url;

        if(configs.repo_conf.remote_name !== undefined){
            this._remoteName = configs.repo_conf.remote_name;
        }

        //initialize a repository if it does not exist
        this.initialize(function(event : any){
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
    private sign(author_email : any, author_name : any, callback : any){
        return callback(
            NG.Signature.now(author_name, author_email),
            NG.Signature.now(author_name, author_email)
        );
    }

    /**
     * Initialize the repository and remote
     * @param callback
     */
    private initialize(callback : any){
        NG.Repository.init(this._pathName, false).then(function( repository : any) {


            console.log("Repo init : "+repository);

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
    public add(filepath : string, elems : any){

    }

    /**
     * commit files to a remote
     */
    public commit(author: any, eventTime : string, tags : any){

    }

    /**
     * Remove file from git
     */
    public remove(){

    }

    /**
     * Handle authentication through git/gitlab
     */
    public authenticate(){

    }

    public fetchAll(){
        return NG.Fetch.initOptions(opts, 0);
    }

}

export = StorageDir;
