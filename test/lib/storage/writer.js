"use strict";
const fs = require("fs");
const mkdirp = require("mkdirp");
/**
 * Handles opening/saving JSON files to and from the git repository
 */
class Writer {
    /**
     * constructor
     */
    constructor() {
        // folders to ignore as logbooks/ repos
        this._ignore = [
            '.git',
            'templates'
        ];
        // number of spaces JSON will be indented on each line
        this._filespaceCount = 4;
    }
    /**
     * Removes a file from the given path
     * @param filepath
     * @param callback
     */
    removeFile(filepath, callback) {
        return callback(fs.unlinkSync(filepath));
    }
    /**
     * Saves the JSON data to a file
     * @param data JSON data to write to the file.
     * @param filepath String containing path to hold the file.
     * @param filename Name fo the file (no extensions)
     */
    writeJSON(data, filepath, filename) {
        mkdirp(filepath, function (err) {
            if (err)
                return false;
        });
        fs.writeFileSync(filepath + '/' + filename + '.json', JSON.stringify(data, null, this._filespaceCount));
        return true;
    }
    /**
     * Creates a folder at the given path with the given name
     * @param foldername
     * @param filepath
     */
    writeFolder(foldername, filepath) {
        mkdirp(filepath + '/foldername', function (err) {
            if (err)
                return false;
        });
        return true;
    }
    /**
     * remove a folder by name + path
     * @param foldername
     * @param filepath
     */
    removeFolder(foldername, filepath) {
    }
    /**
     * rename a folder given its name + path
     * @param foldername
     * @param newfoldername
     * @param filepath
     */
    renameFolder(foldername, newfoldername, filepath) {
        fs.rename(filepath + foldername, filepath + newfoldername, function (err) {
            if (err)
                return false;
        });
        return true;
    }
    /**
     * Opens and reads from a file with the given path
     * @param filepath Path to the file to open (with extensions)
     */
    importJSON(filepath) {
        try {
            let fileVal = fs.readFileSync(filepath);
            return JSON.parse(fileVal.toString());
        }
        catch (e) {
            return null;
        }
    }
    /**
     * Reads the directory given, returns all files or folders in directory
     * @param dirPath
     * @param callback
     * @param folders If result should give folder names or file names
     */
    getDirFiles(dirPath, folders = true, callback) {
        if (folders === undefined) {
            folders = true;
        }
        fs.readdir(dirPath, function (err, files) {
            let res = [];
            files.forEach(function (file) {
                let statType = fs.statSync(dirPath + '/' + file);
                // determine if folder or file
                if (statType.isDirectory()) {
                    // folder
                    res.push(file);
                }
                else {
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
    getDirFilesSync(dir) {
        let files = [];
        try {
            files = fs.readdirSync(dir);
        }
        catch (e) {
            files = [];
        }
        let ff = [];
        let fd = [];
        let that = this;
        files.forEach(function (file) {
            let statType = fs.statSync(dir + '/' + file);
            if (!that._ignore.includes(file)) {
                if (statType.isDirectory()) {
                    ff.push(file);
                }
                else {
                    fd.push(file);
                }
            }
        });
        return {
            folders: ff,
            files: fd,
        };
    }
    /**
     * returns all logs saved
     * @param dir
     * @param terms
     * @returns {any|Array}
     */
    searchDirFiles(dir, terms) {
        let logbooks = this.getDirFilesSync(dir);
        let logs = [];
        let dirPath = dir + '/';
        let that = this;
        logbooks.folders.forEach(function (logbook) {
            // loop through each year for each month then day & log
            let years = that.getDirFilesSync(dirPath + logbook + '/logs/');
            years.folders.forEach(function (year) {
                let months = that.getDirFilesSync(dirPath + logbook + '/logs/' + year);
                months.folders.forEach(function (month) {
                    let days = that.getDirFilesSync(dirPath + logbook + '/logs/' + year + '/' + month);
                    days.folders.forEach(function (day) {
                        let logdates = that.getDirFilesSync(dirPath + logbook + '/logs/' + year + '/' + month + '/' + day);
                        logdates.folders.forEach(function (logdate) {
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
module.exports = Writer;
