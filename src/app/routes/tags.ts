import TagModel = require('../models/tag');
import ApplicationRouter = require('./app');

class TagsRouter extends ApplicationRouter {

    constructor(connection : any) {
        super("/tags/", new TagModel(connection));

        let that = this;

        /**
         *  GET /tags/
         *
         *  GET method to return a list of all the tags present in the table
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
         * GET /tags/:tagName
         *
         * GET method for retrieving the tag with the parameter tagName
         *
         * @param tagName
         */
        that.router.get('/:tagName', function(req : any, res : any){
            that.model.get(req.params.tagName, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * POST /tags/
         *
         * POST method for creating a tag.
         *
         * @param data
         */
        that.router.post('/', function(req : any, res : any){
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
         * POST /tags/:tagName
         *
         * POST method for setting the tag identified by tagName to all
         * the logs in the data
         *
         * @param tagName
         * @param data
         */
        that.router.post('/:tagName', function(req : any, res : any){
            that.model.setToLogs(req.params.tagName, req.body, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * PUT /tags/:tagName
         *
         * PUT method to update a tag with the given name
         *
         * @param tagName
         * @param data
         */
        that.router.put('/:tagName', function(req : any, res : any){
            that.model.update(req.params.tagName, req.body, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * PUT /tags/:tagName/:logId
         *
         * PUT method for updating the given log with logId for the tag
         *
         * @param tagName
         * @param logId
         * @param data (ignored)
         */
        that.router.post('/:tagName', function(req : any, res : any){
            that.model.update( req.body, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * DELETE /tags/:tagName
         *
         * DELETE method for deleting all tags identified by the given name
         * from all the logs
         *
         * @param tagName
         */
        that.router.delete('/:tagName', function(req : any, res : any){
            that.model.destroybyName(req.params.tagName, function(err : any, elem : any){
                res.set('Content-Type', 'text/json');
                if(err){
                    res.send(that.model.setJSON(err));
                }else{
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * DELETE /tags/:tagName/:logId
         *
         * DELETE method for deleting the given tag from the given log
         *
         * @param tagName
         * @param logId
         */
        that.router.delete('/:tagName/:logId', function(req : any, res : any){
            that.model.destroybyLog(req.params.tagName, function(err : any, elem : any){
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

export = TagsRouter;


