/*
 * Authentication and authorization support using CAS and LDAP
 */
import url = require('url');

import casClient = require('./cas-client');
import ldapClient = require('./ldap-client');


import User = require('../../models/user');

function cn(s : any) {
    let first = s.split(',', 1)[0];
    return first.substr(3).toLowerCase();
}

function filterGroup(a : any) {
    let output = [];
    let i;
    let group;
    for (i = 0; i < a.length; i += 1) {
        group = cn(a[i]);
        if (group.indexOf('lab.frib') === 0) {
            output.push(group);
        }
    }
    return output;
}

function redirect(req : any, res : any) {
    if (req.session.landing && req.session.landing !== '/login') {
        return res.redirect(req.session.landing);
    } else {
        // has a ticket but not landed before
        return res.redirect('/');
    }
}

function ensureAuthenticated(options : any) {
    let ad = options.ldap;
    let auth = options.auth;
    function doEnsureAuthentication(req : any, res : any, next : any) {

        let ticketUrl = url.parse(req.originalUrl, true);
        if (req.session && req.session.userid) {
            // logged in already
            if (req.query.ticket) {
                // remove the ticket query param
                delete ticketUrl.query.ticket;
                return res.redirect(301, url.format({
                    pathname: ticketUrl.pathname,
                    query: ticketUrl.query
                }));
            }
            next();
        } else if (req.query.ticket) {
            // just kicked back by CAS
            // validate the ticket
            casClient.validate(req.query.ticket, function (err : any, casresponse : any, result : any) {
                if (err) {
                    console.error(err);
                    return res.status(401).send(err.message);
                }
                if (result.validated) {
                    let userid = result.username;
                    // set userid in session
                    req.session.userid = userid;
                    let searchFilter = ad.searchFilter.replace('_id', userid);
                    let opts = {
                        filter: searchFilter,
                        attributes: ad.memberAttributes,
                        scope: 'sub'
                    };

                    // query ad about other attribute
                    ldapClient.search(ad.searchBase, opts, false, function (err : any, result : any) {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('something wrong with ad');
                        }
                        if (result.length === 0) {
                            console.warn('cannot find ' + userid);
                            return res.status(500).send(userid + ' is not found!');
                        }
                        if (result.length > 1) {
                            return res.status(500).send(userid + ' is not unique!');
                        }

                        // set username and member of in session
                        req.session.username = result[0].displayName;
                        req.session.memberOf = filterGroup(result[0].memberOf);

                        // load other info from db

                    });
                } else {
                    console.error('CAS reject this ticket');
                    return res.redirect(req.proxied ? auth.login_proxied_service : auth.login_service);
                }
            });
        } else {
            // if this is ajax call, then send 401 without redirect
            if (req.xhr) {
                // TODO: might need to properly set the WWW-Authenticate header
                res.set('WWW-Authenticate', 'CAS realm="' + auth.service + '"');
                return res.status(401).send('xhr cannot be authenticated');
            } else {
                // set the landing, the first unauthenticated url
                req.session.landing = req.originalUrl;
                return res.redirect(auth.cas + '/login?service=' + encodeURIComponent(auth.login_service));
            }
        }
    };
    return doEnsureAuthentication;
};


export {
    ensureAuthenticated
};