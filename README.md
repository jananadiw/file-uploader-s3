

## File-Uploader-Nest-S3

> Backend Service to upload files/images to a AWS S3 bucket.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Test file upload with Postman

```bash
#REQUEST 
METHOD: POST
URI: /fileupload
BODY: form-data
KEY: upload
VALUE: select a file (.jpg, .png .jpeg)

#RESPONSE
File url
```


