import uuid

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Enum, String, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

db = SQLAlchemy()


class Chat(db.Model):
    __tablename__ = "chats"

    id = db.Column(
        UUID(as_uuid=True),
        server_default=text("uuid_generate_v4()"),
        primary_key=True,
        default=uuid.uuid4,
    )
    history_chat_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey("history_chats.id"), nullable=False
    )
    message = Column(String, nullable=False)
    sender_type = Column(Enum("user", "bot", name="sender_type"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<Chat {self.id}>"


class HistoryChat(db.Model):
    __tablename__ = "history_chats"

    id = db.Column(
        UUID(as_uuid=True),
        server_default=text("uuid_generate_v4()"),
        primary_key=True,
        default=uuid.uuid4,
    )
    name = db.Column(db.String(64), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    chats = db.relationship("Chat", backref="history_chat", lazy="dynamic")

    def __repr__(self):
        return f"<HistoryChat {self.name}>"
