import LogbooksRouter = require('./logbooks');
import LogsRouter = require('./logs');
import PropertiesRouter = require('./properties');
import TagsRouter = require('./tags');

class IndexRouter{

    constructor(app : any, databaseConnection : any, authentication : any){

        let logbooks = new LogbooksRouter(databaseConnection, authentication);
        app.use(logbooks.path, logbooks.router);

        let logs = new LogsRouter(databaseConnection, authentication );
        app.use(logs.path, logs.router);

        let properties = new PropertiesRouter(databaseConnection, authentication );
        app.use(properties.path, properties.router);

        let tags = new TagsRouter(databaseConnection, authentication );
        app.use(tags.path, tags.router);

    }

}

export = IndexRouter;
