const request = require('request');
module.exports = function API_Call(){
        let OPTIONS = {
            headers: {'Content-Type': 'application/json'},
            url: null,
            body: null
        };
        return{
            recommendation_preference: function(user_id, isPreference, person, isEdge, preferInfo, callback){
                OPTIONS.url = process.env.Django_URL;
                OPTIONS.body = JSON.stringify({
                    "user_id": user_id,
                    "isPrefer": isPreference,
                    "person": person,
                    "isEdge": isEdge,
                    "preferInfo": preferInfo
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeHandler(res.statusCode, callback, result);
                })
            },
            recommendation: function(user_id, isPc, isConcent, isEdge, preferInfo, callback){
                OPTIONS.url = process.env.Django_URL;
                OPTIONS.body = JSON.stringify({
                    "user_id": user_id,
                    "isPc": isPc,
                    "isConcent": isConcent,
                    "isEdge": isEdge,
                    "preferInfo": preferInfo
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeHandler(res.statusCode, callback, result);
                });
            }
        };
    }
    function statusCodeHandler(statusCode, callback, result){
        switch(statusCode){
            case 200:
                callback(null, JSON.parse(result));
                break;
            default:
                callback("error", JSON.parse(result));
                break;
        }
    };
