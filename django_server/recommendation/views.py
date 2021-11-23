from django.views import View
from django.http import HttpResponse, JsonResponse
from django.db import connection

def recommend(request):
    try:
        import pandas as pd
        cursor = connection.cursor()

        strSql = "SELECT *  FROM seats where seat_available = 0"
        cursor.execute(strSql)
        seats = cursor.fetchall()
        connection.commit()
        connection.close()
        df = pd.DataFrame(seats, columns=['seat_available', 'pc_available', 'concent_available', 'seat_code', 'preferences', 'edge_seat'])
        js = df.to_json(orient='columns')


    except:
        connection.rollback()
        print("Failed selecting in BookListView")

    return HttpResponse(js)

