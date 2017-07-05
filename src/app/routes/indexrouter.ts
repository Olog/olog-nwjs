import LogbooksRouter = require('./logbooks');
import LogsRouter = require('./logs');
import PropertiesRouter = require('./properties');
import TagsRouter = require('./tags');

class IndexRouter{

    constructor(app : any, databaseConnection : any){

        let logbooks = new LogbooksRouter(databaseConnection);
        app.use(logbooks.path, logbooks.router);

        let logs = new LogsRouter(databaseConnection);
        app.use(logs.path, logs.router);

        let properties = new PropertiesRouter(databaseConnection);
        app.use(properties.path, properties.router);

        let tags = new TagsRouter(databaseConnection);
        app.use(tags.path, tags.router);

    }

}

export = IndexRouter;
