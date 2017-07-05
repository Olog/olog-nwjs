import PropertyModel = require('../models/property');
import ApplicationRouter = require('./app');

class PropertiesRouter extends ApplicationRouter{

    constructor(connection : any){
        super("/properties/", new PropertyModel(connection));

        let that = this;

        /**
         *  GET /properties/
         *
         *  GET method for retrieving all the properties in the database
         */
        that.router.get('/', function(req : any, res : any) {
            //
        });

        /**
         * GET /properties/:propName
         *
         * GET method for retrieving a list of attributes for the given property
         *
         * @param  propName
         */
        that.router.get('/:propName', function(req : any, res : any){

        });

        /**
         * POST /properties/
         *
         * POSt method for adding a new property.
         *
         * @param propName
         * @param data
         */
        that.router.post('/:propName', function(req : any, res : any){
            //
        });


        /**
         * PUT /properties/:propName
         *
         * PUT method for adding a new Property.
         *
         * @param propName
         * @param data
         */
        that.router.put('/:propName', function(req : any, res : any){

        });

        /**
         * PUT /properties/:propName/:logId
         *
         * PUT method for adding a new property attribute to a log
         *
         * @param propName
         * @param logId
         * @param data
         */
        that.router.put('/:propName/:logId', function(req : any, res : any){

        });

        /**
         * DELETE /properties/:propName
         *
         * DELETE method for removing a property
         *
         * @param propName
         */
        that.router.delete('/:propName', function(req : any, res : any){

        });

        /**
         * DELETE /properties/:propName/:logId
         *
         * DELETE method for removing a properties attribute from a log
         *
         * @param propName
         * @param logId
         */
        that.router.delete('/:propName/:logId', function(req : any, res : any){

        });
    }
}

export = PropertiesRouter;