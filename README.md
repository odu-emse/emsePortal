# emse

This project was built with Turbo 360. To learn more, click here: https://www.turbo360.co

## Instructions
After cloning into repo, cd to project root directory and install dependencies:

```shell script
$ npm install
```

To run dev server, install Turbo CLI globally:

```shell script
$ sudo npm install turbo-cli -g
```

Start mongoDB
```shell script
sudo chown -R `id -un` /data/db
```

Then run devserver from project root directory:

```shell script
$ turbo devserver
```
To seed db:
```shell script
mongoimport --db portal --collection <collection name> --file seed/<seed file>.json
```

To build for production, run build:

```shell script
$ npm run build
```
