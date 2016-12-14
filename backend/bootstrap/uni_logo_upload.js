var AWS = require('aws-sdk');
var s3 = require('s3');

var Bucket = "exchangebuddy-university-public-image";
var s3Options = {
    accessKeyId: "AKIAJLYC7BRYAJIX3Q5Q",
    secretAccessKey: "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"
}

var awsS3Client = new AWS.S3(s3Options);
var options = {
    s3Client: awsS3Client
};
var client = s3.createClient(options);

var params = {
    localDir: './University_Logos',
    s3Params: {
        Bucket,
        ACL: 'public-read',
        Prefix: '',
    }
};

client.uploadDir(params);
