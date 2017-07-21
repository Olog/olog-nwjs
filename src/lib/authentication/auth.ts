/**
 Authentication through gitlab
 */

class Auth{


    /**
     * Constructor
     * @param configs
     */
    constructor(configs : any){

    }

    /**
     * Checks user's credentials
     * @param res
     * @param header
     */
    public ensureAuthenticated(res, header){
        //header = req.headers['authorization'];

        if(!header){
            //No Authentication header was parred

            //sending 401
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

        }
        else{
            //authentication given
            let tmp = header.split(' ');

            let buf = new Buffer(tmp[1], 'base64');
            let plain_auth = buf.toString(); //read to string
            //plain_auth = username:password

            let credentials = plain_auth.split(':');

            //check credentials with gitlab

        }
    }
}

export = Auth;