var request = require('superagent');

export const ROOT_URL = process.env.API_ROOT_URL;

function defaultPromise(req){
  return new Promise(function(resolve, reject) {
    request.get(req).end(
      function(err,res) {
        if (err===null) {
          if (res.body.error) {
            // console.log(res.body + "error on server");
          }
          resolve(res);
        } else {
        // console.log(err);
        reject(err);
      }
    });
  });
}

/*Home page message fetches*/

export function fetchHomeMessages(groupId){
    var req = 'api/home/chat?';
    req = `${req}groupId=${groupId}`;
    return defaultPromise(req);
}