/*
 * Authenication support library
 * from: https://github.com/dongliu/runcheck
 */


/*
 * Stub implementation that denies all requests
 */
function ensureAuthenticated(req : any, res : any, next : any) {
    return res.status(401).send('not authenticated');
}

function sessionLocals(req : any, res : any, next : any) {
    res.locals.session = req.session;
    next();
}

/*
 * Check that current user session contains the specified role
 */
function verifyRole(role : any) {
    return function (req : any, res : any, next : any) {
        if (req.session.roles) {
            if (req.session.roles[role]) {
                return next();
            } else {
                return res.status(403).send('You are not authorized to access this resource. ');
            }
        } else {
            console.warn('Cannot find the user\'s role.');
            return res.status(500).send('something wrong for the user\'s session');
        }
    };
}

export {
    ensureAuthenticated,
    sessionLocals,
    verifyRole
}