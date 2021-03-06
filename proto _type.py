from datetime import datetime, timedelta
def recommend():
    import pandas as pd
    result = []
    df = pd.read_excel(r'C:\Users\user\Desktop\data.xlsx')
    test_df = pd.read_excel(r'C:\Users\user\Desktop\test.xlsx')
    backup_df = df
    flag = df['사용여부'] == 1
    df = df[flag]
    print(df)
    print("우대인원 사용 가능 (1: 사용, 2. 미사용)")
    fre = int(input())
    if (fre == 1):
        print("좌석 분류: pc석(2인), 일반석(3인)")
        print("2: pc, 3: 일반")
        p_num = int(input())
        flag = df['우대인원'] == p_num
        df = df[flag]
        if p_num == 2:
            count = df.shape[0]
            for i in range(count - 1):
                print(i)
                if int(df['좌석 번호'].iloc[i][3]) % 2 == 1:
                    if int(df['좌석 번호'].iloc[i + 1][3]) % 2 == 0:
                        temp = pd.concat([df.iloc[i], df.iloc[i + 1]], axis=1)
                        result.append(temp.to_json)
                        i += 1
        elif p_num == 3:
            start = ['2SC1', '2SC4', '2SC7', '2SC10', '2SC13', '2SC16', '2SC19', '2SD1', '2SD4', '2SD7', '2SD10',
                     '2SD13','2SD16','2SD19']
            count = df.shape[0]
            for i in range(count - 1):
                if (df['좌석 번호'].iloc[i]) in start:
                    flag1=df['좌석 번호']==df['좌석 번호'].iloc[i][0:3]+str(int(df['좌석 번호'].iloc[i][3:])+1)
                    flag2 = df['좌석 번호'] == df['좌석 번호'].iloc[i][0:3] + str(int(df['좌석 번호'].iloc[i][3:]) + 2)
                    if not df[flag1].empty and not df[flag2].empty:
                        result.append([df['좌석 번호'].iloc[i], df[flag1]['좌석 번호'].iloc[0], df[flag2]['좌석 번호'].iloc[0]])
    else:
        print(" 콘센트 사용 가능 유무 (1:가능 , 2: 불가능)")
        con = input()
        print(" pc 사용 가능 유무 (1:가능 , 2: 불가능)")
        com = input()
        print(" 가장자리 여부 (1:YES , 2: no matter)")
        edge = input()
        level_2_flag = 0

        if (com == '1'):
            level_2_flag = 1
            flag = df['pc유무'] == 1
            df = df[flag]
            df['점수'] = 0
        elif (con == '1'):
            level_2_flag = 2
            flag = df['콘센트유무'] == 1
            df = df[flag]
            df['점수'] = 0

        # pc사용 가능 좌석 처리
        if level_2_flag == 1:
            flag = test_df['별점'] == 5
            tmp_test = test_df[flag]
            for i in tmp_test['좌석 코드']:
                flag = df['좌석 번호'] == i
                if df[flag].empty: continue
                result.append(df[flag].iloc[0])
                result[-1]['점수'] = 1
                idx_df = df[flag].index
                df = df.drop(idx_df)
            while (len(result) <= 15):
                if df.empty: break
                result.append(df.iloc[0])
                df = df.drop(df.index[0])

        # 콘센트 사용 가능 좌석 처리
        elif (level_2_flag == 2):
            flag = test_df['별점'] == 5
            tmp_test = test_df[flag]
            if edge == '1':
                df = df[df['가장자리'] == 1]
            for i in tmp_test['좌석 코드']:
                flag = df['좌석 번호'] == i
                if df[flag].empty:
                    continue
                result.append(df[flag].iloc[0])
                result[-1]['점수'] = 1
                idx_df = df[flag].index
                df = df.drop(idx_df)
            while (len(result) <= 15):
                if df.empty: break
                result.append(df.iloc[0])
                df = df.drop(df.index[0])
    print(result)

