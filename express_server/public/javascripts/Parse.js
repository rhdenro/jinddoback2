function repeatNonPrefer(Array){
    return new Promise(async function (resolve, reject){
        const promises = Array.map((row) => parse(row.seat_code));
        await Promise.all(promises)
            .then(responses => {
                resolve(responses);
            })
    })
}

function repeatDefault(Array){

}
module.exports = repeatNonPrefer(), repeatDefault();
