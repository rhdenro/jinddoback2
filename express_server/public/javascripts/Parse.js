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
        const promises = row.map((subRow) => parseSingle(row));
        await Promise.all(promises)
            .then(responses => {
                resolve(responses);
            })
    })
}
//최종 row 처리

function repeatDefault(Array){

}
module.exports = repeatNonPrefer(), repeatDefault();
