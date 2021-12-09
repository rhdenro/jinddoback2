//우대좌석 미사용자 처리
const repeatNonPrefer = (Array) => {
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
    let result = new Object();
    let seat_code = row[0];
    result.seatCode = seat_code;
    result.density = row[1];
    result.floor = "";
    result.form  = "";
    result.sector = "";
    result.seatNum = "";
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
            result.form = "스마트";
            break;
        case 'J':
            result.form = "조망형";
            break;
        case 'P':
            result.form = "PC룸";
            break;
        case 'N':
            result.form = "노트북 전용";
            break;
    }
    //섹터 분류
    switch(seat_code[2]){
        case 'A':
            result.sector = "A섹터";
            break;
        case 'B':
            result.sector = "B섹터";
            break;
        case 'C':
            result.sector = "C섹터";
            break;
        case 'D':
            result.sector = "D섹터";
            break;
    }
    //좌석 번호
    if(seat_code[4]){
        result.seatNum = ((seat_code[3]-'0')*10) + (seat_code[4]-'0');
    }
    else{
        result.seatNum = seat_code[3]-'0';
    }
    return result;
}

//우대좌석 처리
const repeatPrefer = (Array) => {
    return new Promise(async function(resolve,reject){
        const promises = Array.map((row) => parsePrefer(row));
        await Promise.all(promises)
            .then(responses => {
                resolve(responses);
            })
    })
}

function parsePrefer(row){
    let result = new Object();
    let seat_code = row[0];
    result.seatCode = row;
    result.density = 'X';
    result.floor = "";
    result.form  = "";
    result.sector = "";
    result.seatNum = "";
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
            result.form = "스마트";
            break;
        case 'J':
            result.form = "조망형";
            break;
        case 'P':
            result.form = "PC룸";
            break;
        case 'N':
            result.form = "노트북 전용";
            break;
    }
    //섹터 분류
    switch(seat_code[2]){
        case 'A':
            result.sector = "A섹터";
            break;
        case 'B':
            result.sector = "B섹터";
            break;
        case 'C':
            result.sector = "C섹터";
            break;
        case 'D':
            result.sector = "D섹터";
            break;
    }
    //좌석 번호
    if(seat_code[4]){
        result.seatNum = ((seat_code[3]-'0')*10) + (seat_code[4]-'0');
    }
    else{
        result.seatNum = seat_code[3]-'0';
    }
    return result;
}

//예약 기록 파서
const repeatPreferLog = (Array) => {
    return new Promise(async function(resolve, reject){
        const promises = Array.map((row) => parsePreferLog(row));
        await Promise.all(promises)
            .then(responses => {
                resolve(responses);
            })
    })
}

function parsePreferLog(row){
    return new Promise(function(resolve,reject){
        let result = new Object();
        let seat_code = row.seat_code;
        result.shape = "";
        result.floor = "";
        result.seatNo = "";
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
                result.form = "스마트";
                break;
            case 'J':
                result.form = "조망형";
                break;
            case 'P':
                result.form = "PC룸";
                break;
            case 'N':
                result.form = "노트북 전용";
                break;
        }
        //좌석 번호
        if(seat_code[4]){
            result.seatNum = ((seat_code[3]-'0')*10) + (seat_code[4]-'0');
        }
        else{
            result.seatNum = seat_code[3]-'0';
        }
        result.date = row.date;
        result.score = row.score;

    })
}

module.exports = {
    repeatPrefer,
    repeatNonPrefer,
    repeatPreferLog,
}
