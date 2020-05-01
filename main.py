import os
import sqlite3
import json

from sqlite3 import Error
from flask import Flask, jsonify, request
from flask_cors import CORS

DB_PATH = os.getcwd()+r'\database.db'

def create_connection():
    conn = None

    try:
        conn = sqlite3.connect(DB_PATH, timeout=10)
        print("Connected to %s!" % DB_PATH)
    except Error as e:
        print(e)

    return conn

def create_app(config=None):
    app = Flask(__name__)

    app.config.update(dict(DEBUG=True))
    app.config.update(config or {})

    CORS(app)

    @app.route("/item/<id>", methods=['DELETE'])
    def deleteGift(id):
        sql = ''' DELETE FROM Item WHERE id=? '''

        conn =create_connection()
        c = conn.cursor()
        c.execute(sql, (id,))

        conn.commit()
        if conn is not None:
            conn.close()

        return ('', 204)


    @app.route("/item", methods=['PUT'])
    def updateGift():
        data = request.get_json()

        values = []
        for key, value in data.items():
            values.append(value)

        sql = ''' UPDATE Item SET itemName=?, price=?, url=?, purchased=?, purchaserId=? WHERE id=?'''
        conn = create_connection()
        c = conn.cursor()
        
        c.execute(sql, (data['itemName'], data['price'], data['url'], data['purchased'], data['purchaserId'],data['id']))

        conn.commit()

        if conn is not None:
            conn.close()

        return ('', 204)


    @app.route("/item", methods=['POST'])
    def createGift():
        data = request.get_json()

        values = []
        for key, value in data.items():
            values.append(value)

        sql = ''' INSERT INTO Item(id, userEmail, itemName, price, url, purchased, purchaserId) VALUES(?,?,?,?,?,?,?); '''
        conn = create_connection()
        c = conn.cursor()

        c.execute(sql, values)
        conn.commit()

        if conn is not None:
            conn.close()
        return ('', 204)

    @app.route('/item/<email>', methods=['GET'])
    def getGifts(email):
        sql = ''' SELECT * FROM Item WHERE Item.userEmail=?; '''
        conn = create_connection()
        c = conn.cursor()

        c.execute(sql, (email,))

        results = [dict((c.description[i][0], value) \
            for i, value in enumerate(row)) for row in c.fetchall()]

        if conn is not None:
            conn.close()

        return json.dumps(results)

    @app.route("/users", methods=['GET'])
    def getUsers():
        sql = ''' SELECT * FROM User; '''
        conn = create_connection()
        c = conn.cursor()

        c.execute(sql)
        results = [dict((c.description[i][0], value) \
            for i, value in enumerate(row)) for row in c.fetchall()]

        if conn is not None:
            conn.close()

        print(results)
        
        return jsonify(results)

    @app.route("/username/<username>", methods=['GET'])
    def is_user(username):
        sql = ''' SELECT * FROM User WHERE email=(?); '''
        conn = create_connection()
        c = conn.cursor()

        c.execute(sql, (username,))
        result = str(len(c.fetchall()) > 0).lower()

        if conn is not None:
            conn.close()

        return result

    @app.route("/username", methods=['POST'])
    def createAccount():
        
        data = request.get_json()
        
        dataList = []
        for key, value in data.items():
            dataList.append(value)

        sql = ''' INSERT INTO User(name, email) VALUES(?,?); '''
        conn = create_connection()
        c = conn.cursor()

        c.execute(sql, dataList)
        conn.commit()

        if conn is not None:
            conn.close()
        return ('', 204)

    return app

    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app = create_app()
    app.run(host="localhost", port=port)