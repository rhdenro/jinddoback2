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
                });
                request.post(OPTIONS, function(err, res, result){
                    result = JSON.parse(result)
                    statusCodeHandler(res.statusCode, callback, result);
                })
            },
            recommendation: function(user_id, isPc, isConcent, isEdge, preferInfo, isPreference, callback){
                OPTIONS.url = process.env.Django_URL;
                OPTIONS.body = JSON.stringify({
                    "user_id": user_id,
                    "isPrefer": isPreference,
                    "isPc": isPc,
                    "isConcent": isConcent,
                    "isEdge": isEdge,
                    "preferInfo": preferInfo
                });
                request.post(OPTIONS, function(err, res, result){
                    statusCodeHandler(res.statusCode, callback, result);
                });
            },
            reservation: function(user_id, seatCode, rating, end_date, density, callback){
                OPTIONS.url = process.env.Django_URL;
                OPTIONS.body = JSON.stringify({
                    "user_id": user_id,
                    "seatCode": seatCode,
                    "rating": rating,
                    "end_date": end_date,
                    "density": density
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
                callback(null, result);
                break;
            default:
                callback("error", result);
                break;
        }
    };
