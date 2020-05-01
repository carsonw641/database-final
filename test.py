import os
import sqlite3


def main():
    path = os.getcwd()+r'\database.db'
    print(path)
    conn = sqlite3.connect(path).cursor()

    sql = ''' SELECT * FROM User WHERE email=(?); '''
    
    username = 'carson@test.org'
    print(username)
    conn.execute(sql, (username,))
    
    print(conn.fetchall())

    if conn is not None:
        conn.close()


    # sql = '''SELECT name from sqlite_master where type="table"'''
    
    # results = conn.cursor().execute(sql)
    # # conn.cursor().execute(sql, (username,))
    # #result = str(len(conn.cursor().fetchall()) > 0).lower()

    # print(conn.cursor().fetchall())
    
    # if conn is not None:
    #     conn.close()



if __name__ == "__main__":
    main()