import PropertyModel = require('../models/property');
import ApplicationRouter = require('./app');

class PropertiesRouter extends ApplicationRouter {

    constructor(connection: any, authentication: any) {
        super('/properties/', new PropertyModel(connection), authentication);

        let that = this;

        /**
         *  GET /properties/
         *
         *  GET method for retrieving all the properties in the database
         */
        that.router.get('/', function(req: any, res: any) {
            that.model.all(null, function(err: any, elem: any){
                res.set('Content-Type', 'text/json');
                if (err) {
                    res.send(that.model.setJSON(err));
                }else {
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * GET /properties/:propName
         *
         * GET method for retrieving a list of attributes for the given property
         *
         * @param  propName
         */
        that.router.get('/:propName', function(req: any, res: any){
            that.model.get(req.params.propName, function(err: any, elem: any){
                res.set('Content-Type', 'text/json');
                if (err) {
                    res.send(that.model.setJSON(elem));
                }else {
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * POST /properties
         *
         * POST method for adding a new property with attributes
         *
         * @param propName
         * @param data
         * {
         *      attributes : [
         *          {
         *              name : string,
         *              state : active
         *          },
         *          ...
         *      ]
         * }
         */
        that.router.post('/', function(req: any, res: any){
            that.model.insert(req.body, function(err: any, elem: any){
                res.set('Content-Type', 'text/json');
                if (err) {
                    res.send(that.model.setJSON(elem));
                }else {
                    res.send(that.model.setJSON(elem));
                }
            });

        });


        /**
         * PUT /properties/:propName
         *
         * PUT method for adding a new property attribute
         *
         * @param propName
         * @param logId
         * @param data
         */
        that.router.put('/:propName', function(req: any, res: any){
            that.model.newAttr(req.params.propName, req.body, function(err: any, elem: any){
                res.set('Content-Type', 'text/json');
                if (err) {
                    res.send(that.model.setJSON(elem));
                }else {
                    res.send(that.model.setJSON(elem));
                }
            });
        });

        /**
         * DELETE /properties/:propName
         *
         * DELETE method for removing a property
         *
         * @param propName
         */
        that.router.delete('/:propName', function(req: any, res: any){
            that.model.destroy(req.params.propName, function(err: any, elem: any){
                res.set('Content-Type', 'text/json');
                if (err) {
                    res.send(that.model.setJSON(elem));
                }else {
                    res.send(that.model.setJSON(elem));
                }
            });
        });

    }
}

export = PropertiesRouter;
