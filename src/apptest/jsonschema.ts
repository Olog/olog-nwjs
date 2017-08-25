/**
 * Convenient wrapper for the jsonschema library with Supertest integration
 */
import { AssertionError } from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import * as jsonschema from 'jsonschema';
import * as supertest from 'supertest';
import mkdirp = require('mkdirp');

export const validator = new jsonschema.Validator();

const cache = new Map<string, jsonschema.Schema>();


export function validate(instance: any, name: string): jsonschema.ValidatorResult {
  let cachedSchema = cache.get(name);
  if (cachedSchema) {
    return validator.validate(instance, cachedSchema);
  }
  let schemaPath = path.resolve(__dirname, '..', 'jsonschema', name + '.json');
  let schema = <jsonschema.Schema> JSON.parse(fs.readFileSync(schemaPath, 'UTF-8'));
  cache.set(name, schema);
  return validator.validate(instance, schema);
};


export function checkValid(name: string): (res: supertest.Response) => void {
  return (res) => {
    let result = validate(res.body, name);
    for (let error of result.errors) {
      let msg = 'Schema validation failed: ' + error.toString();
      throw new AssertionError({ message: msg });
    }
  };
};

/**
 * Compare two objects found in a file
 * @param filepath
 * @param object
 * @returns {boolean}
 */
export function checkFileContnts(filepath: string, object: any) {
  let fileVal: any = fs.readFileSync(filepath);
  let res = JSON.parse(fileVal.toString());
  return (res === object);
};

/**
 * Empties the testing directory folders, and restarts with new data
 */
export function initializeDir() {
  let filepath = "../../testdir";

  mkdirp(filepath, function (err) {
    if (err) return false;

    // initialize a logbook
    mkdirp(filepath + "/logbook1", function (err) {
      if (err) return false;

      // initialize the templates folder
      mkdirp(filepath + "/templates", function (err) {
        if (err) return false;

        // initialize the tags and properties
        fs.writeFileSync(filepath + '/tags' + '.json', JSON.stringify({"tags": []}, null, 4));
        fs.writeFileSync(filepath + '/properties' + '.json', JSON.stringify({"properties": []}, null, 4));
      });
    });
  });

};

