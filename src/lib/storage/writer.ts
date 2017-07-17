import fs = require('fs');

/**
 * Handles opening/saving JSON files to and from the git repository
 */
class Writer{

    //number of spaces the JSON will be indented on each line
    private _filespaceCount : number = 4;

    /**
     * constructor
     */
    constructor(){ }

    /**
     * Removes a file from the given path
     * @param filepath
     * @param callback
     */
    public removeFile(filepath : string, callback : any){
        return callback(fs.unlink(filepath));
    }

    /**
     * Saves the JSON data to a file
     * @param data JSON data to write to the file.
     * @param filename Name of the file(no extensions)
     */
    public writeJSON(data : any, filename : any){
        fs.writeFile(filename + '.json', JSON.stringify(data, null, this._filespaceCount));
    }

    /**
     * Opens and reads from a file with the given path
     * @param filepath Path to the file to open (with extensions)
     */
    public importJSON(filepath : string) {

        fs.readFile(filepath, function (err, data) {
            if (err) {
                return console.error(err);
            }

            return data;
        });
    }

}

export = Writer;