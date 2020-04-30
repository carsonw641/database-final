import os
import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

def create_app(config=None):
    app = Flask(__name__)

    # See http://flask.pocoo.org/docs/latest/config/
    app.config.update(dict(DEBUG=True))
    app.config.update(config or {})

    # Setup cors headers to allow all domains
    # https://flask-cors.readthedocs.io/en/latest/
    CORS(app)

    # Definition of the routes. Put them into their own file. See also
    # Flask Blueprints: http://flask.pocoo.org/docs/latest/blueprints
    @app.route("/username/<username>", methods=['GET'])
    def hello_world(username):
        return "Hello %s" % username

    @app.route("/username", methods=['POST'])
    def foo_url_arg():
        data = request.json
        return jsonify(data)

    return app

    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app = create_app()
    app.run(host="localhost", port=port)