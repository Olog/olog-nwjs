/**
 * Start and stop the test application.
 */
import * as path from 'path';

import * as bodyparser from 'body-parser';
import * as express from 'express';
import * as session from 'express-session';

// application singleton
let app: express.Application;

// db connection
import GitStor = require('../lib/storage/main');
import Auth = require('../lib/authentication/auth');
import handlers = require('../app/shared/handlers');
import status = require('../app/shared/status');

import IndexRouter = require('../app/routes/indexrouter');

let configurations: any = {
  "authconfig" : {},
  "gitConfigs": {
    "repo_conf": {
      "remote_name": "origin",
      "local_path": "../../testdir",
      "url": "",
    },
    "auth": {
      "username": "Tester",
      "email": "testemail@email.com",
      "password": "password",
    },
    "gitlabConfigs": {
      "privateToken": "",
      "namespaceId": "",
    },
  },
};

// application logging
export let log = console.log;
export let warn = console.warn;
export let error = console.error;

// start the test application
export async function start(): Promise<express.Application> {
  app = express();

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({
    extended: false,
  }));

  // session configuration
  app.use(session({
    store: new session.MemoryStore(),
    resave: false,
    saveUninitialized: false,
    secret: 'test_secret',
    cookie: {
      maxAge: 28800000,
    },
  }));

  // view engine configuration
  app.set('views', path.resolve(__dirname, '../../views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
  app.use(express.static(path.resolve(__dirname, '..', '..', 'bower_components')));

  let git = new GitStor(configurations.gitConfigs);

  app.use('/status', status.router);

  let auth = new Auth(configurations.authconfig);

  // set the routes for all the models and connection to the database
  new IndexRouter(app, git, auth);

  // no handler found for request
  app.use(handlers.notFoundHandler);

  // error handlers
  app.use(handlers.requestErrorHandler);
  app.use(function(err: any, req: any, res: any, next: any) {
    // Do logging and user-friendly error message display
    console.error(err);
  })
  return app;
}
