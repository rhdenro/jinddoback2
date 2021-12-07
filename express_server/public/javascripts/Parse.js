//우대좌석 미사용자 처리
function repeatNonPrefer(Array){
    return new Promise(async function (resolve, reject){
        const promises = Array.map((row) => parseNonPrefer(row));
        await Promise.all(promises)
            .then(responses => {
                resolve(responses);
            })
    })
}
//하위 row 처리
function parseNonPrefer(row){
    return new Promise(async function(resolve,reject){
        const promises = row.map((subRow) => parseCode(subRow);
        await Promise.all(promises)
            .then(result => {
                resolve(result);
            })
    })
}

function parseCode(subRow){
    return new Promise(function(resolve,reject){
        let result = new Object();
        let seat_code = subRow[0];
        result.density = subRow[1];
        result.floor = "";
        result.form  = "";
        result.sector = "";
        result.sectorNum = "";
    })
}
//최종 row 처리
function repeatDefault(Array){
    return new Promise(function(resolve,reject){
    })
}
module.exports = repeatNonPrefer(), repeatDefault();
