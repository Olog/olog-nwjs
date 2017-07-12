/*
 * Central Authentication Service (CAS) support library
 */
import CASClient = require('cas.js');

let cas = {
    create : <any> null,
    validate : <any>  null,
    client : <any>  null
};

cas.create = function (options : any) {
    cas.client =(new (<any> CASClient(options)));
    return cas.client;
};

cas.validate = function (ticket : any, cb : any) {
    if (!cas.client) {
        return console.error('CAS client not created: try calling create()');
    }
    return cas.client.validate(ticket, cb);
};

export = cas;