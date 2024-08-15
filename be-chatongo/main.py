import os

import google.generativeai as genai
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import asc, desc

from models import Chat, HistoryChat, db

load_dotenv()

genai.configure(api_key=os.environ.get("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
migrate = Migrate(app, db)

db.init_app(app)


@app.route("/", methods=["GET"])
def home():
    return {"data": "Welcome to Chatongo"}, 200


@app.route("/histories", methods=["GET"])
def list_history():
    history_chats = HistoryChat.query.order_by(desc(HistoryChat.created_at)).all()
    history_list = [
        {
            "id": str(history_chat.id),
            "name": history_chat.name,
            "created_at": history_chat.created_at.isoformat(),
        }
        for history_chat in history_chats
    ]
    return jsonify(history_list), 200


@app.route("/histories", methods=["POST"])
def create_history():
    data = request.get_json()
    name = data.get("name")

    if not name:
        return jsonify({"message": "name are required."}), 400

    new_history = HistoryChat(name=name)
    db.session.add(new_history)
    db.session.commit()

    return jsonify({"id": str(new_history.id), "name": new_history.name}), 201


@app.route("/histories/<history_chat_id>/chats", methods=["GET"])
def list_chats(history_chat_id):
    history_chat_id = request.view_args["history_chat_id"]

    history_chat = HistoryChat.query.filter_by(id=history_chat_id).first()
    if not history_chat:
        return jsonify({"message": "History Chat not found."}), 404

    chats = (
        Chat.query.filter_by(history_chat_id=history_chat_id)
        .order_by(asc(Chat.created_at))
        .all()
    )
    chat_list = [
        {
            "id": str(chat.id),
            "message": chat.message,
            "sender_type": chat.sender_type,
            "created_at": chat.created_at.isoformat(),
        }
        for chat in chats
    ]
    return jsonify(chat_list), 200


@app.route("/histories/<history_chat_id>/chats", methods=["POST"])
def create_chat(history_chat_id):
    history_chat_id = request.view_args["history_chat_id"]

    data = request.get_json()
    message = data.get("message")

    if not message:
        return jsonify({"message": "All fields are required."}), 400

    history_chat = HistoryChat.query.filter_by(id=history_chat_id).first()
    if not history_chat:
        return jsonify({"message": "History Chat not found."}), 404

    try:
        new_chat = Chat(
            history_chat_id=history_chat_id, message=message, sender_type="user"
        )
        db.session.add(new_chat)

        response = model.generate_content(message)
        bot_chat = Chat(
            history_chat_id=history_chat_id, message=response.text, sender_type="bot"
        )
        db.session.add(bot_chat)

        db.session.commit()
    except Exception as e:
        print(f"Error: {e}")
        db.session.rollback()
        return jsonify({"message": e}), 500

    return (
        jsonify(
            {
                "id": str(new_chat.id),
                "message": new_chat.message,
                "created_at": new_chat.created_at.isoformat(),
                "bot_response": response.text,
            }
        ),
        201,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
