import fs = require('fs');

/**
 * Handles opening/saving JSON files to and from the git repository
 */
class Writer{

    //number of spaces the JSON will be indented on each line
    private _filespaceCount : number = 4;

    constructor(){

    }

    public writeJSON(data : any, filename : any){
        fs.writeFile(filename + '.json', JSON.stringify(data, null, this._filespaceCount));
    }

    public importJSON() {

        fs.readFile('file.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("Asynchronous read: " + data.toString());
        });
    }
}

export = Writer;