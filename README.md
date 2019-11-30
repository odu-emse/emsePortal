# EMSE Portal | rest API

## Instructions
After cloning into repo, cd to project root directory and install dependencies:

```shell script
$ npm install
```
Run and expose port `5000`
```shell script
$ npm start
```
To seed the database
```shell script
mongoimport --host emseportal-shard-0/emseportal-shard-00-00-1qgvd.mongodb.net:27017,emseportal-shard-00-01-1qgvd.mongodb.net:27017,emseportal-shard-00-02-1qgvd.mongodb.net:27017 --ssl --username root --password <PASSWORD> --authenticationDatabase admin --db <DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
```