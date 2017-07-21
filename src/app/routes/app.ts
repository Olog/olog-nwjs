import express = require('express');

/**
 * Base class for declaring model routers and paths
 */
class ApplicationRouter{

    private _routesPath : string = "/";
    private _model : any = null;
    private _router : any = express.Router();
    private _auth : any;

    constructor(path : string, model: any, authentication : any){
        this._model = model;
        this._routesPath = path;
        this._auth = authentication;
    }

    get path(): string {
        return this._routesPath;
    }

    get model(): any {
        return this._model;
    }

    get router(): any {
        return this._router;
    }

    set router(value: any) {
        this._router = value;
    }

    public auth(header, res){
        return this._auth.ensureAuthenticated(res,header);
    }
}

export = ApplicationRouter;

