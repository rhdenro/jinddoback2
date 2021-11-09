import pandas as pd
result=[]
df = pd.read_excel(r'C:\Users\user\Desktop\data.xlsx')
test_df = pd.read_excel(r'C:\Users\user\Desktop\test.xlsx')
backup_df = df
print(" 콘센트 사용 가능 유무 (1:가능 , 2: 불가능)")
con = input()
print(" pc 사용 가능 유무 (1:가능 , 2: 불가능)")
com = input()
level_2_flag=0
flag = df['사용여부'] == 1
df = df[flag]
if (com == '1') :
    level_2_flag = 1
    flag = df['pc유무'] == 1
    df = df[flag]
    df['점수'] = 0
elif (con == '1') :
    level_2_flag = 2
    flag = df['콘센트유무'] == 1
    df = df[flag]
    df['점수'] = 0


if level_2_flag == 1:
    flag = test_df['별점'] == 5
    tmp_test = test_df[flag]
    for i in tmp_test['좌석 코드']:
        flag = df['좌석 번호'] == i
        result.append(df[flag])
        result[-1]['점수'] = 1
        idx_df=df[flag].index
        df = df.drop(idx_df)
print(result)