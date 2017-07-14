"use strict";
const fs = require("fs");
/**
 * Handles opening/saving JSON files to and from the git repository
 */
class Writer {
    constructor() {
        //number of spaces the JSON will be indented on each line
        this._filespaceCount = 4;
    }
    writeJSON(data, filename) {
        fs.writeFile(filename + '.json', JSON.stringify(data, null, this._filespaceCount));
    }
    importJSON() {
        fs.readFile('file.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Asynchronous read: " + data.toString());
        });
    }
}
module.exports = Writer;
