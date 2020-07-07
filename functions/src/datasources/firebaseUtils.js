const { v4: uuidv4 } = require('uuid');
//TODO
/**
 * Generate Singed URL to let front end upload images in a tag to firebase storage
 * The file name on the storage will looks like: `tagID/(8 digits uuid)`
 * reference from: https://github.com/googleapis/nodejs-storage/blob/master/samples/generateV4UploadSignedUrl.js
 * @param {Int} imageNumber 
 * @param {String} tagID 
 * @returns {Array[Promise]} an array contain singed urls with length `imageNumber`
 */
function getImageUploadUrls(bucket, imageNumber, tagID) {

  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'application/octet-stream',
  };
  
  const fileNameArray = generateFileName(imageNumber, tagID);

  return fileNameArray.map(
    async name => {
      const [url] = await bucket.file(name).getSignedUrl(options);
      return url;
    }
  );
}

function generateFileName(imageNumber, tagID) {
  return Array.apply(null, Array(imageNumber))
    .map(() => `${tagID}/${uuidv4().substr(0,8)}`);
}

exports.getImageUploadUrls = getImageUploadUrls;