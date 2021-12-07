from django.views import View
from django.http import HttpResponse, JsonResponse
from django.db import connection
import json

def recommend(request):
    result = []
    try:
        import pandas as pd
        cursor = connection.cursor()
        strSql = "SELECT * FROM seats where seat_available = 1"
        cursor.execute(strSql)
        seats = cursor.fetchall()
        connection.commit()
        connection.close()
        sqlData = json.loads(request.body)
        df = pd.DataFrame(seats,
                          columns=['seat_available', 'pc_available', 'concent_available', 'seat_code', 'preferences',
                                   'edge_seat'])
        fre = sqlData['isPrefer']
        if (fre == 1):
            p_num = sqlData['person']
            flag = df['preferences'] == p_num
            df = df[flag]
            if p_num == 2:
                count = df.shape[0]
                for i in range(count - 1):
                    if int(df['seat_code'].iloc[i][3]) % 2 == 1:
                        if int(df['seat_code'].iloc[i + 1][3]) % 2 == 0:
                            result.append([df['seat_code'].iloc[i], df['seat_code'].iloc[i + 1]])
                            i += 1
            elif p_num == 3:
                start = ['2SC1', '2SC4', '2SC7', '2SC10', '2SC13', '2SC16', '2SC19', '2SD1', '2SD4', '2SD7', '2SD10',
                         '2SD13''2SD16''2SD19']
                count = df.shape[0]
                for i in range(count - 1):
                    if (df['seat_code'].iloc[i]) in start:
                        flag1 = df['seat_code'] == df['seat_code'].iloc[i][0:3] + str(int(df['seat_code'].iloc[i][3:]) + 1)
                        flag2 = df['seat_code'] == df['seat_code'].iloc[i][0:3] + str(int(df['seat_code'].iloc[i][3:]) + 2)
                        if not df[flag1].empty and not df[flag2].empty:
                            result.append([df['seat_code'].iloc[i], df[flag1]['seat_code'].iloc[0], df[flag2]['seat_code'].iloc[0]])
        else:
            test_df = pd.DataFrame(sqlData['preferInfo'],
                                  columns=['reservation_id', 'reservation_user', 'seat_code', 'count', 'date',
                                           'score', 'density'])
            com = sqlData['isPc']
            con = sqlData['isConcent']
            edge = sqlData['isEdge']
            if (com ==  1):
                flag = df['pc_available'] == 1
                df = df[flag]
                flag= df['preferences']==0
                df = df[flag]
                flag = test_df['score'] == 5
                tmp_test = test_df[flag]
                print(tmp_test)
                for i in tmp_test['seat_code']:
                    flag = df['seat_code'] == i
                    if df[flag].empty: continue
                    result.append(df[flag].iloc[0]['seat_code'])
                    idx_df = df[flag].index
                    df = df.drop(idx_df)
                while (len(result) <= 15):
                    if df.empty: break
                    result.append(df.iloc[0]['seat_code'])
                    df = df.drop(df.index[0])
            elif (con == 1):
                flag = df['concent_available'] == 1
                df = df[flag]
                flag = test_df['score'] == 5
                tmp_test = test_df[flag]
                for i in tmp_test['seat_code']:
                    flag = df['seat_code'] == i
                    if not df[flag].empty :
                        result.append(df[flag].iloc[0]['seat_code'])
                        idx_df = df[flag].index
                        df = df.drop(idx_df)
                if edge == 1:
                    flag = df['edge_seat'] == 1
                    count=df[flag].shape[0]
                    while count > 0 and len(result) < 15:
                        result.append(df[flag].iloc[0]['seat_code'])
                        idx_df = df[flag].index[0]
                        df = df.drop(idx_df)
                        count -= 1
                while (len(result) < 15):
                    if df.empty: break
                    result.append(df.iloc[0]['seat_code'])
                    df = df.drop(df.index[0])
            else:
                df['point'] = 0
                flag = df['pc_available'] == 0
                df = df[flag]
                fdf = fretend(df)
                flag = test_df['score'] == 5
                if not test_df[flag].empty:
                    for i in test_df[flag]['seat_code']:
                        flag = df['seat_code'] == i
                        if not df[flag].empty:
                            tmp_density = fdf[df[flag].iloc[0]['seat_code'][0:3]]
                            temp_list=[]
                            temp_list.append(df[flag].iloc[0]['seat_code'])
                            temp_list.append(tmp_density)
                            result.append(temp_list)
                            idx_df = df[flag].index
                            df = df.drop(idx_df)
                flag = test_df['score'] >= 3
                fre_ten = 0
                for i in test_df[flag]['density']:
                    fre_ten += i
                fre_ten = fre_ten / test_df[flag].shape[0]
                if fre_ten < 50:
                    for i in df['seat_code']:
                        flag = df['seat_code'] == i
                        test_key = i[0:3]
                        if (fdf[test_key] < fre_ten * 1.03) and (fdf[test_key] > fre_ten * 0.97):
                            if not df[flag].empty:
                                df.iloc[df[flag].index - 1, 6] += 6
                        elif (fdf[test_key] < fre_ten * 1.05) and (fdf[test_key] > fre_ten * 0.95):
                            if not df[flag].empty:
                                df.iloc[df[flag].index - 1, 6] += 4
                        elif (fdf[test_key] < fre_ten * 1.07) and (fdf[test_key] > fre_ten * 0.93):
                            if not df[flag].empty:
                                df.iloc[df[flag].index - 1, 6] += 2
                if edge == 1:
                    flag = df['edge_seat'] == 1
                    k= df[flag].shape[0]-1
                    for i in range(k):
                        idx=df[flag].index[i]
                        df.loc[idx, 'point'] +=6
                flag=test_df['score'] >= 4
                floor=[]
                for i in test_df[flag]['seat_code']:
                    floor.append(i[0])
                floor=set(floor)
                for i in range(df.shape[0]-1):
                    floor_int=df.iloc[i,3]
                    if str(floor_int[0]) in floor:
                        df.iloc[i,6] += 1
            flag = test_df['score'] >= 3
            tmp_df = test_df[flag]['seat_code']
            count_df=test_df[flag]['count']
            J_point = 0
            S_point = 0
            for i in range(tmp_df.shape[0]-1):
                tmp=tmp_df.iloc[i]
                if tmp[1] == 'J':
                    J_point+=(2*count_df.iloc[i])
                elif tmp[1] == 'S':
                    S_point +=(2*count_df.iloc[i])
                elif tmp[1] =='N':
                    S_point +=(1*count_df.iloc[i])
            for i in range(df.shape[0]-1):
                tmp=df.iloc[i,3]
                if tmp[1] == 'J':
                    df.iloc[i,6] += J_point
                elif tmp[1] == 'S':
                    df.iloc[i, 6] += S_point
                elif tmp[1] == 'N':
                    if S_point<0:continue
                    df.iloc[i, 6] += S_point-1
            df=df.sort_values(by=['point'], axis=0, ascending=False)
            result_count = 0
            flag = df['preferences'] != 0
            pre_temp = df[flag]
            flag = df['preferences'] == 0
            df = df[flag]
            while (len(result) < 15):
                temp = result
                if df.shape[0] == 0:
                    tmp_density = fdf[pre_temp.iloc[0]['seat_code'][0:3]]
                    temp_list = []
                    temp_list.append(pre_temp.iloc[0]['seat_code'])
                    temp_list.append(tmp_density)
                    result.append(temp_list)
                    flag = pre_temp['seat_code'] == pre_temp.iloc[0, 3]
                    pre_temp = pre_temp.drop(pre_temp[flag].index)
                    if pre_temp.shape[0] == 0:
                        break
                for i in temp:
                    if i[0][0:3] == df.iloc[0, 3][0:3]:
                        result_count +=1
                if result_count == 2:
                    result_count = 0
                    flag = df['seat_code'] == df.iloc[0]['seat_code']
                    df = df.drop(df[flag].index)
                else:
                    result_count = 0
                    tmp_density = fdf[df.iloc[0]['seat_code'][0:3]]
                    temp_list = []
                    temp_list.append(df.iloc[0]['seat_code'])
                    temp_list.append(tmp_density)
                    result.append(temp_list)
                    flag = df['seat_code'] == df.iloc[0, 3]
                    df = df.drop(df[flag].index)



    except Exception as ex:
        connection.rollback()
        print("Error: ",ex)
        print("Failed selecting")


    return JsonResponse(result, safe=False)


def fretend(df):
    temp = {"1SA": 24, "1SB": 24, "1JA": 14, "1JB": 14, "2JA": 34, "2JB": 34, "2SA": 24, "2SB": 24,
            "2SC": 21, "2SD": 21, "3NA": 80, "3JA": 7, "3JB": 18,
            "4SA": 84, "4SB": 16, "4SC": 44, "4JA": 21, "4JB": 7}
    count = {"1SA": 0, "1SB": 0, "1JA": 0, "1JB": 0, "2JA": 0, "2JB": 0, "2SA": 0, "2SB": 0, "2SC": 0,
             "2SD": 0, "3NA": 0, "3JA": 0, "3JB": 0,
             "4SA": 0, "4SB": 0, "4SC": 0, "4JA": 0, "4JB": 0}
    for i in df['seat_code']:
        tmp = i[0:3]
        count[tmp] += 1
    for i in count:
        temp[i] = (100 - round(count[i] / temp[i] * 100))
    return temp

def reservation(request):
    try:
        sqldata = json.loads(request.body)
        seat_code = sqldata["seat_code"]
        if seat_code[1] == 'P' or seat_code[1] == 'N':
            return JsonResponse(200)
        userid = sqldata["userid"]
        date = sqldata["end_date"]
        score = sqldata["score"]
        density = sqldata["density"]
        cursor = connection.cursor()
        strSql = "SELECT * FROM preference_table where reservation_user = (%s)"
        cursor.execute(strSql, (userid,))
        connection.commit()
        temp = cursor.fetchall()
        min_date = 0
        flag_date = 0
        for i in temp:
            if i[2] == seat_code:
                temp_count = i[3] + 1
                strSql = 'UPDATE preference_table SET  count =(%s), score=(%s),density=(%s) WHERE reservation_user=(%s) and seat_code=(%s)'
                cursor.execute(strSql, (temp_count, score, density, userid, seat_code,))
                connection.commit()
                connection.close()
                return JsonResponse(200)

        for i in temp:
            if i[4] <min_date:
                min_date=i[4]
        if date - min_date > 21:
            temp.sort(key=lambda x: x[4])
            strSql = 'DELETE FROM preference_table WHERE reservation_user=(%s) and seat_code=(%s)'
            cursor.execute(strSql, (userid, temp[0][2],))
            connection.commit()
            strSql = 'INSERT INTO preference_table(reservation_user, seat_code , count ,date,score,density) VALUES ((%s),(%s),(%s),(%s),(%s),(%s))'
            cursor.execute(strSql, (userid, seat_code, 1, date, score, density,))
            connection.commit()
            connection.close()
            return JsonResponse(200)
        if flag_date != 1:
            min_score = 10
            for i in temp:
                if i[5]<min_score:
                    min_score = i[5]
            if score < min_score:
                connection.close()
                return JsonResponse(200)
            else:
                temp.sort(key=lambda x: x[4])
                for i in temp:
                    if i[5] <= score and score == min_score:
                        strSql='DELETE FROM preference_table WHERE reservation_user=(%s) and seat_code=(%s)'
                        cursor.execute(strSql, (userid, i[2] ,))
                        connection.commit()
                        strSql = 'INSERT INTO preference_table(reservation_user, seat_code , count ,date,score,density) VALUES ((%s),(%s),(%s),(%s),(%s),(%s))'
                        cursor.execute(strSql, (userid, seat_code , 1 ,date ,score ,density, ))
                        connection.commit()
                        connection.close()
        return JsonResponse(200)
    except Exception as ex:
        connection.rollback()
        return JsonResponse(406)

