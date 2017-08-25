Olog-nwjs
========================

Configuration
-----------
```
$ npm install        # Download and install dependencies (including Typescript)
$ npm run grunt ts   # Compile the Typescript files to regular Javascript
$ ./bin/app          # Run the application with default configuration
$ ./bin/app --config ./config/examplerc   # Run the application with custom configuration
```

Running Tests
----------
```
$ npm test
```
*Testing directory needs to be created under root folder and configured with apptest*

Git Directory Structure
-----------
```
.
+-- logbook_folder
+-- logbook_folder
|   +-- logs
+-- templates
|   +-- properties.json
|   +-- tags.json
```

Gitlab Setup
---------------
For logbook entries, there should be a group to represent the main application structure, with projects under it for each logbook.