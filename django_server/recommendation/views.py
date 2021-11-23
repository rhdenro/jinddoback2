from django.views import View
from django.http import HttpResponse, JsonResponse
from django.db import connection


def recommend(request):
    try:
        import pandas as pd
        import json
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
        fre = 1
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
    except:
        connection.rollback()
        print("Failed selecting in BookListView")

    return HttpResponse(result)
