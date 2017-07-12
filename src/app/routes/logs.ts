import LogModel = require('../models/log');
import ApplicationRouter = require('./app');

class LogsRouter extends ApplicationRouter{
    constructor(connection : any, authentication : any){
        super("/logs/", new LogModel(connection), authentication);

        let that = this;

        /**
         *  GET /logs/
         *
         *  GET method for retrieving a collection of Log instances,
         *  based on multi-parameter query specifying patterns for tag
         *  and logbook details to match against
         */
        that.router.get('/', function(req : any, res : any) {

        });

        /**
         * GET /logs/:logId
         *
         * GET method for retrieving an instance of a Log identified by an id
         *
         */
        that.router.get('/:logId', function(req : any, res : any){
            that.model.getById(req.params.logId, function(err : any, elem : any){
                res.set('Content-Type', 'text/xml');
            });
        });


        /**
         * POST /logs/
         *
         * POST method for creating a log instance.
         *
         * @param data Logs data
         */
        that.router.post('/', function(req : any, res : any){

        });

        /**
         * POST /logs/:logId
         *
         * POST method for merging logbooks and tags for the log identified by
         * the payload into an existing log.
         *
         * @param logId id of the log to add to.
         * @param data Logs data
         */
        that.router.post('/:logId', function(req : any, res : any){

        });

        /**
         * POST /logs/:import
         *
         * POST method for importing multiple log instances, create
         * time and user persisted.
         *
         * @param data
         * @param data Logs data
         */
        that.router.post('/:import', function(req : any, res : any){

        });

        /**
         * PUT /logs/:logId
         *
         * PUT method for editing a log instance identified by the payload. The
         * complete set of logbooks/tags for the log must be given, which will
         * replace the existing set of logoboks/tags.
         *
         * @param logId
         * @param data
         */
        that.router.put('/:logId', function(req : any, res : any){

        });

        /**
         * DELETE /logs/:logId
         *
         * DELETE method for deleting a log instance identified by
         * parameter id
         *
         * @param logId log to remove
         */
        that.router.delete('/:logId', function(req : any, res : any){

        });

    }
}

export = LogsRouter;