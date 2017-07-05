/*
 * LDAP support library
 */
import ldapjs = require('ldapjs');

let ldap = {
    client: <any> null,
    create: <any> null,
    search: <any> null
};


function create(options : any) {
    ldap.client = ldapjs.createClient(options);
    return ldap.client;
}

ldap.create = create;


function search(base : any, opts : any, raw : any, cb : any) {
    if (!ldap.client) {
        console.error('LDAP client not created, try calling create()');
        cb(new Error('LDAP client not created'));
        return;
    }
    ldap.client.search(base, opts, function (err : any, result : any) {
        if (err) {
            console.log(JSON.stringify(err));
            return cb(err);
        }
        let items : any = [];
        result.on('searchEntry', function (entry : any) {
            if (raw) {
                items.push(entry.raw);
            } else {
                items.push(entry.object);
            }
        });
        result.on('error', function (e : any) {
            console.log(JSON.stringify(e));
            return cb(e);
        });
        result.on('end', function (r : any) {
            if (r.status !== 0) {
                let e = 'non-zero status from LDAP search: ' + result.status;
                console.log(JSON.stringify(e));
                return cb(e);
            }
            switch (items.length) {
                case 0:
                    return cb(null, []);
                default:
                    return cb(null, items);
            }
        });
    });
}

ldap.search = search;

export = ldap;