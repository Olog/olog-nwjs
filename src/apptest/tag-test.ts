/**
 * Test the application tags REST API
 */

let chai = require('chai');
import {assert} from 'chai';
let chaiHttp = require('chai-http');
let should = chai.should();
import * as express from 'express';
import * as request from 'supertest';
let Tags = require('../app/entities/tags');

import * as app from './app';
import * as jsonschema from './jsonschema';

import * as status from '../app/shared/status';

let handler: express.Application;

before(async function() {
    handler = await app.start();
    await jsonschema.initializeDir();
});

describe('Tags', function() {

    beforeEach((done) => {
        chai.use(chaiHttp);
        done();
    });

    it('GET /tags', (done) => {
        chai.request(handler)
            .get('/tags')
            .end((err: any, res: any) => {
                res.should.have.status(200);
                let body = JSON.parse(res.text);
                body.should.have.property('tags');
                body.tags.should.be.a('array');
                body.tags.should.length.eq(0);
                done();
            });
    });

    it('GET /tags/mytag1', function() {
        return request(handler)
            .get('/tags')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                res.should.have.status(200);
                let body = JSON.parse(res.text);
                res.body.should.have.property('tags');
                res.body.tags.should.have.property("id", "e683e5d0-7d32-11e7-931f-4b18a9e15c37");
                res.body.tags.should.have.property("name", "mytag1");
                res.body.tags.should.have.property("owner", "person");
            });
    });

    it('DELETE /tags/mytag1', function() {
        return request(handler)
            .delete('/tags')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                res.body.should.have.property('tags');
                res.body.tags.should.have.property("id", "e683e5d0-7d32-11e7-931f-4b18a9e15c37");
                res.body.tags.should.have.property("name", "mytag1");
                res.body.tags.should.have.property("owner", "person");
        });
    });

    it('POST /tags', function() {
        let resObj: any = {
                    "id": "e683e5d0-7d32-11e7-931f-4b18a9e15c37",
                    "name": "mytag2",
                    "owner": "person2",
        };
        return request(handler)
            .post('/tags')
            .send(resObj)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                res.body.should.have.property('tags');
                res.body.tags.should.have.property("id", "e683e5d0-7d32-11e7-931f-4b18a9e15c37");
                res.body.tags.should.have.property("name", "mytag2");
                res.body.tags.should.have.property("owner", "person2");
        });
    });

    it('PUT /tags/mytag2', function() {
        let resObj: any = {
                    "id": "e683e5d0-7d32-11e7-931f-4b18a9e15c37",
                    "name": "mytag2",
                    "owner": "person3",
        };
        return request(handler)
            .put('/tags/mytag2')
            .send(resObj)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(jsonschema.checkFileContnts('./testdir/templates/tags.json', resObj), true )
                res.body.should.have.property('tags');
                res.body.tags.should.have.property("id", "e683e5d0-7d32-11e7-931f-4b18a9e15c37");
                res.body.tags.should.have.property("name", "mytag2");
                res.body.tags.should.have.property("owner", "person3");
        });
    });


});

