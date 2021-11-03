import pandas as pd

df = pd.read_excel(r'C:\Users\user\Desktop\data.xlsx')
backup_df=df
print(" 콘센트 사용 가능 유무 (1:가능 , 2: 불가능)")
con = input()
print(" pc 사용 가능 유무 (1:가능 , 2: 불가능)")
com = input()

flag=df['사용여부'] == 1
df=df[flag]
if (com=='1') :
    flag = df['pc유무'] == 1
    df=df[flag]
if (con=='1') :
    flag = df['콘센트유무'] == 1
    df = df[flag]
df['점수'] = 0
print(df)
