/**
 * Test the application tags REST API
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

describe('Tags', function() {

    it('GET /tags', function() {
        return request(handler)
            .get('/tags')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                res.body.should.have.property('tags');
                res.body.tags.should.have.property([
                    {
                        "id": "e683e5d0-7d32-11e7-931f-4b18a9e15c37",
                        "name": "mytag1",
                        "owner": "person"
                    },
                ]);

            });
    });

    it('GET /tags/mytag1', function() {
        return request(handler)
            .get('/tags')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
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
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                res.body.should.have.property('tags');
                assert.equal(jsonschema.checkFileContnts('./testdir/templates/tags.json', {tags: []}), true )
                res.body.tags.should.have.property("id", "e683e5d0-7d32-11e7-931f-4b18a9e15c37");
                res.body.tags.should.have.property("name", "mytag1");
                res.body.tags.should.have.property("owner", "person");
        });
    });

    it('POST /tags', function() {
        let resObj: any = {
            "tags": [
                {
                    "id": "e683e5d0-7d32-11e7-931f-4b18a9e15c37",
                    "name": "mytag2",
                    "owner": "person2",
                },
            ],
        };
        return request(handler)
            .post('/tags')
            .send(resObj)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                assert.equal(jsonschema.checkFileContnts('./testdir/templates/tags.json', resObj), true )
                res.body.should.have.property('tags');
                res.body.tags.should.have.property("id", "e683e5d0-7d32-11e7-931f-4b18a9e15c37");
                res.body.tags.should.have.property("name", "mytag2");
                res.body.tags.should.have.property("owner", "person2");
        });
    });

    it('PUT /tags/mytag2', function() {
        let resObj: any = {
            "tags": [
                {
                    "id": "e683e5d0-7d32-11e7-931f-4b18a9e15c37",
                    "name": "mytag2",
                    "owner": "person3",
                },
            ],
        };
        return request(handler)
            .put('/tags/mytag2')
            .send(resObj)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res: request.Response) => {
                assert.equal(res.body.status, 'OK', 'Expected application status is "OK');
                assert.equal(jsonschema.checkFileContnts('./testdir/templates/tags.json', resObj), true )
                res.body.should.have.property('tags');
                res.body.tags.should.have.property("id", "e683e5d0-7d32-11e7-931f-4b18a9e15c37");
                res.body.tags.should.have.property("name", "mytag2");
                res.body.tags.should.have.property("owner", "person3");
        });
    });


});

