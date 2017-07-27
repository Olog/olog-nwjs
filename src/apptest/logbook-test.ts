/**
 * Test the application logbook REST API
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

describe('Logbooks', function() {

    it('GET /logbooks', function() {
        return request(handler)
            .get('/logbooks')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
        });
    });

    it('GET logbook by name', function(){
        return request(handler)
            .get('/logbooks/logbook1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
            });
    });


    it('GET logbook by invalid name', function(){
        return request(handler)
            .get('/logbooks/not-a-real-logbook')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
            });
    });

    it('POST new logbook', function(){
         return request(handler)
                .post('/logbooks')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((res: request.Response) => {
                    assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
                });
    });

    it('POST modify logs with given logbook', function(){
        return request(handler)
            .post('/logbooks/logbook1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
            });
    });

    it('PUT modify logbook by name', function(){
        return request(handler)
            .put('/logbooks/logbook5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
            });
    });

    it('PUT modify logs with given logbook', function(){
        return request(handler)
            .put('/logbooks/logbook1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
            });
    });

    it('DELETE logbook by name', function(){
        return request(handler)
            .delete('/logbooks/logbook2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
            });
    });

    it('DELETE given logbook from logs', function(){
        return request(handler)
            .delete('/logbooks/logbook4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK"');
            });
    });



});
