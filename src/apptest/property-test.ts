/**
 * Test the application properties REST API
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

describe('Properties', function() {

    it('GET /properties', function() {
        return request(handler)
            .get('/properties')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                res.body.should.have.property('properties');

            });
    });

    it('GET /properties/test1', function() {
        return request(handler)
            .get('/properties')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                res.body.should.have.property('properties');
                res.body.tags.should.have.property("id", "8a9d9dd0-7d3a-11e7-929e-61ecf778bb16");
                res.body.tags.should.have.property("name", "test1");
                res.body.tags.should.have.property("attributes", []);
            });
    });

    it('POST /properties', function() {
        let attr: any = {"attr1": "attr2"};
        let resObj: any = {
            "name": "anotherProperty",
            "attributes": [
                attr,
                attr,
            ]
        };
        return request(handler)
            .post('/properties')
            .set('Accept', 'application/json')
            .send(resObj)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                res.body.should.have.property('properties');
                res.body.tags.should.have.property("name", "anotherProperty");
                res.body.tags.should.have.property("attributes", [attr, attr]);
            });
    });

    it('PUT /properties/test2', function() {
        let attr: any = {"attr3": "attr4"};
        let resObj: any = {
            "name": "anotherProperty123",
            "attributes": [
                attr,
                attr,
            ]
        };
        return request(handler)
            .get('/properties')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                res.body.should.have.property('properties');
                res.body.tags.should.have.property("name", "anotherProperty123");
                res.body.tags.should.have.property("attributes", [attr, attr]);            });
    });

    it('DELETE /properties/will_be_deleted', function() {
        return request(handler)
            .get('/properties')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                res.body.should.have.property('properties');
                res.body.tags.should.have.property("name", "will_be_deleted");
                res.body.tags.should.have.property("attributes", []);
        });
    });
});

