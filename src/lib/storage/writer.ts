import fs = require('fs');
import mkdirp = require('mkdirp');

/**
 * Handles opening/saving JSON files to and from the git repository
 */
class Writer {

    // folders to ignore as logbooks/ repos
    private _ignore: any = [
        '.git',
        'templates'
    ];

    // number of spaces JSON will be indented on each line
    private _filespaceCount : number = 4;

    /**
     * constructor
     */
    constructor() {}

    /**
     * Removes a file from the given path
     * @param filepath
     * @param callback
     */
    public removeFile(filepath: string, callback: any) {
        return callback(fs.unlinkSync(filepath));
    }

    /**
     * Saves the JSON data to a file
     * @param data JSON data to write to the file.
     * @param filepath String containing path to hold the file.
     * @param filename Name fo the file (no extensions)
     */
    public writeJSON(data: any, filepath: string, filename: string) {
        mkdirp(filepath, function (err) {
            if (err) return false;
        });
        fs.writeFileSync(filepath + '/' + filename + '.json', JSON.stringify(data, null, this._filespaceCount));
        return true;
    }

    /**
     * Creates a folder at the given path with the given name
     * @param foldername
     * @param filepath
     */
    public writeFolder(foldername: string, filepath: string){
        mkdirp(filepath + '/foldername', function (err) {
            if (err) return false;
        });
        return true;
    }

    /**
     * remove a folder by name + path
     * @param foldername
     * @param filepath
     */
    public removeFolder(foldername: string, filepath: string){

    }

    /**
     * rename a folder given its name + path
     * @param foldername
     * @param newfoldername
     * @param filepath
     */
    public renameFolder(foldername: string, newfoldername: string, filepath: string){
        fs.rename(filepath + foldername, filepath + newfoldername, function(err) {
            if ( err ) return false;
        });
        return true;
    }

    /**
     * Opens and reads from a file with the given path
     * @param filepath Path to the file to open (with extensions)
     */
    public importJSON(filepath: string): any {
        try {
            let fileVal: any = fs.readFileSync(filepath);
            return JSON.parse(fileVal.toString());
        } catch (e) {
            return null;
        }
    }

    /**
     * Reads the directory given, returns all files or folders in directory
     * @param dirPath
     * @param callback
     * @param folders If result should give folder names or file names
     */
    public getDirFiles(dirPath: string, folders: boolean = true, callback: any) {
        if (folders === undefined) {
            folders = true;
        }

        fs.readdir(dirPath, function(err: any, files: any) {
            let res: any = [];
            files.forEach(function(file: any){
                let statType: any = fs.statSync(dirPath + '/' + file);
                // determine if folder or file
                if (statType.isDirectory()) {
                    // folder
                    res.push(file);
                } else {
                    // file
                    if (!folders) {
                        res.push(file);
                    }
                }
            });
            callback(res);
        });
    }

    /**
     * returns all the folders and files in a given directory
     * @param dir
     * @returns {any}
     */
    private getDirFilesSync(dir: string) {
        let files: any = [];
        try {
            files = fs.readdirSync(dir);
        } catch (e) {
            files = [];
        }
        let ff: any = [];
        let fd: any = [];
        let that = this;
        files.forEach(function(file: any){
            let statType: any = fs.statSync(dir + '/' + file);
            if (!that._ignore.includes(file)) {
                if (statType.isDirectory()) {
                    ff.push(file);
                } else {
                    fd.push(file);
                }
            }

        });

        return {
            folders : ff,
            files : fd,
        };
    }

    /**
     * returns all logs saved
     * @param dir
     * @param terms
     * @returns {any|Array}
     */
    public searchDirFiles(dir: string, terms: any) {
        let logbooks = this.getDirFilesSync(dir);
        let logs: any = [];
        let dirPath = dir + '/';
        let that = this;
        logbooks.folders.forEach(function(logbook: any){
            // loop through each year for each month then day & log
            let years = that.getDirFilesSync(dirPath + logbook + '/logs/');
            years.folders.forEach(function(year: any) {
                let months = that.getDirFilesSync(dirPath + logbook + '/logs/' + year);
                months.folders.forEach(function(month: any){
                   let days = that.getDirFilesSync(dirPath + logbook + '/logs/' + year + '/' + month );
                   days.folders.forEach(function(day: any){
                       let logdates = that.getDirFilesSync(
                           dirPath + logbook + '/logs/' + year + '/' + month + '/' + day,
                       );
                       logdates.folders.forEach(function(logdate: any){
                           let log = that.importJSON(dirPath + logbook + '/logs/' + year
                               + '/' + month + '/' + day + '/' + logdate + '/' + logdate + '.json');
                           if (log !== null) {
                               logs.push(log);
                           }
                       });

                   });
                });
            });
         });

        return logs;
    }

}

export = Writer;
