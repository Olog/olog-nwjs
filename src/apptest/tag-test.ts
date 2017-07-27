/**
 * Test the application tags REST API
 */
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import { assert } from 'chai';
import * as express from 'express';
import * as request from 'supertest';

import * as app from './../app/index';
import * as jsonschema from './jsonschema';

let handler: express.Application;

before(async function() {
    handler = await app.start();
});

describe('Tags', function() {

    it('GET /tags', function() {

    });
});

