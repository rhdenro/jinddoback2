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
//최종 row 처리
function parseCode(subRow){
    return new Promise(function(resolve,reject){
        let result = new Object();
        let seat_code = subRow[0];
        result.density = subRow[1];
        result.floor = "";
        result.form  = "";
        result.sector = "";
        result.sectorNum = "";
        //층수 추출
        switch(seat_code[0]){
            case '1':
                result.floor = "1층";
                break;
            case '2':
                result.floor = "2층";
                break;
            case '3':
                result.floor = "3층";
                break;
            case '4':
                result.floor = "4층";
                break;
        }
        //형태 분류
        switch(seat_code[1]){
            case 'S':
                result.floor = "스마트";
                break;
            case 'J':
                result.floor = "조망형";
                break;
            case 'P':
                result.floor = "PC룸";
                break;
            case 'N':
                result.floor = "노트북 전용";
                break;
        }
    })
}

function repeatDefault(Array){
    return new Promise(function(resolve,reject){
    })
}
module.exports = repeatNonPrefer(), repeatDefault();
