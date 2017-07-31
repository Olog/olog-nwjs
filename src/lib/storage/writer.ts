import fs = require('fs');
import mkdirp = require('mkdirp');

/**
 * Handles opening/saving JSON files to and from the git repository
 */
class Writer {

    // number of spaces the JSON will be indented on each line
    private _filespaceCount : number = 4;

    /**
     * constructor
     */
    constructor(){}

    /**
     * Removes a file from the given path
     * @param filepath
     * @param callback
     */
    public removeFile(filepath : string, callback : any){
        return callback(fs.unlinkSync(filepath));
    }

    /**
     * Saves the JSON data to a file
     * @param data JSON data to write to the file.
     * @param filepath String containing path to hold the file.
     * @param filename Name fo the file (no extensions)
     */
    public writeJSON(data : any, filepath : string, filename : string){
        mkdirp(filepath, function (err) {
            if (err) return false;
        });
        fs.writeFileSync(filepath + '/' + filename + '.json', JSON.stringify(data, null, this._filespaceCount));
        return true;
    }

    /**
     * Opens and reads from a file with the given path
     * @param filepath Path to the file to open (with extensions)
     */
    public importJSON(filepath: string) : any{

        fs.readFile(filepath, function (err, data) {
            if (err) {
                return console.error(err);
            }

            return JSON.parse(data.toString());
        });
    }

    /**
     * Reads the directory given, returns all files or folders in directory
     * @param dirPath
     * @param callback
     * @param folders If result should give folder names or file names
     */
    public getDirFiles(dirPath : string, folders : boolean = true, callback : any){
        if (folders === undefined){
            folders = true;
        }

        fs.readdir(dirPath, function(err : any, files : any) {
            let res : any = [];
            files.forEach(function(file : any){
                let statType : any = fs.statSync(dirPath + "/" + file);
                    //determine if folder or file
                    if(statType.isDirectory()){
                        //folder
                        res.push(file);
                    }else{
                        //file
                        if(!folders)
                            res.push(file);
                    }
            });
            callback(res);
        });

    }

}

export = Writer;
