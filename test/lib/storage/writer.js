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
     * Opens and reads from a file with the given path
     * @param filepath Path to the file to open (with extensions)
     */
    importJSON(filepath) {
        let fileVal = fs.readFileSync(filepath);
        return JSON.parse(fileVal.toString());
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
                let statType = fs.statSync(dirPath + "/" + file);
                //determine if folder or file
                if (statType.isDirectory()) {
                    //folder
                    res.push(file);
                }
                else {
                    //file
                    if (!folders)
                        res.push(file);
                }
            });
            callback(res);
        });
    }
}
module.exports = Writer;
