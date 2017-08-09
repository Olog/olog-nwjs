/**
 * Test the application logs REST API
 */
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import { assert } from 'chai';
import * as express from 'express';
import * as request from 'supertest';

import * as app from './app';
import * as jsonschema from './jsonschema';

let handler: express.Application;

before(async function() {
    handler = await app.start();
});

describe('Logs', function() {

    it('GET /logs', function() {
        return request(handler)
            .get('/logs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
            });
    });

    it('GET /logs by id', function() {
        return request(handler)
            .get('/logs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
            });
    });

    it('POST new log', function() {
        return request(handler)
            .post('/logs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
            });
    });

    it('PUT update log by id', function() {
        return request(handler)
            .put('/logs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
            });
    });

    it('DELETE remove log by id', function() {
        return request(handler)
            .delete('/logs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
            });
    });
});

