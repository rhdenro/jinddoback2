from django.views import View
from django.http import HttpResponse, JsonResponse
from django.db import connection


def recommend(request):
    try:
        import pandas as pd
        import json
        test_df = pd.read_excel(r'C:\Users\user\Desktop\test.xlsx')

        cursor = connection.cursor()

        strSql = "SELECT *  FROM seats where seat_available = 1"
        cursor.execute(strSql)
        seats = cursor.fetchall()
        connection.commit()
        connection.close()
        df = pd.DataFrame(seats,
                          columns=['seat_available', 'pc_available', 'concent_available', 'seat_code', 'preferences',
                                   'edge_seat'])
        result = []
        temp = []
        fre = 0
        p_num = 3
        if (fre == 1):
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
            com = 0
            con=1
            if (com == 1):
                flag = df['pc_available'] == 1
                df = df[flag]
                flag = test_df['별점'] == 5
                tmp_test = test_df[flag]
                print(tmp_test)
                for i in tmp_test['좌석 코드']:
                    flag = df['seat_code'] == i
                    if df[flag].empty: continue
                    result.append(df[flag].iloc[0]['seat_code'])
                    idx_df = df[flag].index
                    df = df.drop(idx_df)
                while (len(result) <= 15):
                    if df.empty: break
                    result.append(df.iloc[0]['seat_code'])
                    df = df.drop(df.index[0])
            elif (con == '1'):
                flag = df['concent_available'] == 1
                df = df[flag]
                df['점수'] = 0
                while (len(result) <= 15):
                    if df.empty: break
                    result.append(df.iloc[0]['seat_code'])
                    df = df.drop(df.index[0])








    except:
        connection.rollback()
        print("Failed selecting")

    return HttpResponse(result)
