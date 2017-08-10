"use strict";
/** Authentication through gitlab */
class Auth {
    /**
     * Constructor
     * @param configs
     */
    constructor(configs) {
    }
    /**
     * Checks user's credentials
     * @param res
     * @param header
     */
    ensureAuthenticated(res, header) {
        // header = req.headers['authorization'];
        if (!header) {
            // No Authentication header was parred
            // sending 401
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        }
        else {
            // authentication given
            let tmp = header.split(' ');
            let buf = new Buffer(tmp[1], 'base64');
            let plainAuth = buf.toString(); // read to string
            // plain_auth = username:password
            let credentials = plainAuth.split(':');
            // check credentials with gitlab
        }
    }
}
module.exports = Auth;
