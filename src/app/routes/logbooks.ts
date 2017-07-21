import LogbookModel = require('../models/logbook');
import ApplicationRouter = require('./app');

class LogbooksRouter extends ApplicationRouter{

    constructor(connection : any, authentication : any){
        super("/logbooks/", new LogbookModel(connection), authentication);

        let that = this;


        /**
         *  GET /logbooks/
         *
         *  GET method to return a list of all the logbooks present in the table
         */
        that.router.get('/', function(req : any, res : any) {
            that.model.all( null, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * GET /logbooks/:logbookName
         *
         * GET method for retrieving the logbook with the parameter logbookName and
         * its logs
         *
         * @param logbookName
         */
        that.router.get('/:logbookName', that.auth(), function(req : any, res : any){
            that.model.get(req.params.logbookName, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * POST /logbooks/
         *
         * POST method for creating a logbook.
         *
         * @param data
         * {
         *  id : integer,
         *  name : string,
         *  owner : string,
         *  state : string
         * }
         */
        that.router.post('/',  that.auth(),function(req : any, res : any){
            that.model.insert( req.body, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * POST /logbooks/:logbookName
         *
         * POST method for setting the tag identified by logbookName to all
         * the logs in the data
         *
         * @param logbookName
         * @param data
         * {
         *  logs: [
         *          {
         *              id: integer
         *          }
         *      ]
         * }
         */
        that.router.post('/:logbookName',  that.auth(),function(req : any, res : any){
            that.model.setToLogs(req.params.logbookName, req.body, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });



        /**
         * PUT /logbooks/:logbookName
         *
         * PUT method to update a logbook with the given name
         *
         * @param logbookName
         * @param data
         * {
         *      name : string,
         *      owner : string,
         *      state : string
         * }
         */
        that.router.put('/:logbookName', that.auth(), function(req : any, res : any){
            that.model.update(req.params.logbookName, req.body, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * PUT /logbooks/:logbookName/:logId
         *
         * PUT method for updating the given log with logId for the logbook
         *
         * @param logbookName
         * @param logId
         * @param data (ignored)
         */
        that.router.post('/:logbookName/:logId',  that.auth(),function(req : any, res : any){
            that.model.setToLogs( req.params.logbookName, {logs: [{id: req.params.logId}]}, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * DELETE /logbooks/:logbookName
         *
         * DELETE method for deleting all logbooks identified by the given name
         * from all the logs
         *
         * @param logbookName
         */
        that.router.delete('/:logbookName',  that.auth(),function(req : any, res : any){
            that.model.destroyByName(req.params.logbookName, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * DELETE /logbooks/:logbookName/:logId
         *
         * DELETE method for deleting the given logbook from the given log
         *
         * @param logbookName
         * @param logId
         */
        that.router.delete('/:logbookName/:logId',  that.auth(),function(req : any, res : any){
            that.model.destroyByLog(req.params.logId, req.params.logbookName, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });
    }


}

export = LogbooksRouter;