'use strict';
import AWS from 'aws-sdk';
import uuidV4 from 'uuid/v4';
module.exports.hello = (event, context, callback) => {
    let v = 'hi';
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `${v} Go Serverless v1.0! Your function executed successfully!!!!`,
            input: event,
        }),
    };

    callback(null, response);

};

module.exports.addmsg = (event, context, callback) => {
    let s3 = new AWS.S3();
    let body = JSON.parse(event.body);
    if (body.msg) {
        let msg = body.msg;
        let key = uuidV4();
        const params = {
            Bucket: 'tmp4msgs',
            Key: key,
            Body: msg
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                callback(null, err);
            } // an error occurred
            else {
                console.log(data);


                console.log(event);
                const response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        msg: body.msg
                    })
                };
                callback(null, response);
            }

        });
    }
    else {
        const response = {
            statusCode: 501,
            body: 'msg did not exist'
        };
        callback(null, response);
    }



};

