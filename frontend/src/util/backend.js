var request = require('superagent');

export const ROOT_URL = process.env.SERVER_NAME;

function defaultPromise(req){
    return new Promise(function(resolve, reject) {
        request.get(req).end(
            function(err,res){
                if(err===null){
                	if(res.body.error){
                		console.log(res.body + "error on server");
                	}
                    resolve(res);
                }else{
                    console.log(err);
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


//sample for geolocation in the future
/*export function getAllNearbyDrops(){
  return new Promise((resolve, reject) => {
    let req = 'api/feeds/local?';
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        req = `${req}longitude=${longitude}&latitude=${latitude}&radius=0.1`
        // const final = HOST+req;
        request.get(req).end(
            function(err,res){
                if(err===null){
                  if(res.body.error){
                    console.log(res.body + "error on server");
                  }
                    //console.log(res);
                    resolve(res);
                }else{
                    console.log(err);
                    reject(err);
                }
            });
      })
    }
  });
}*/