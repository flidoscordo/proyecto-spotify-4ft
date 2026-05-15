from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from user_model import User
from src.db.connection import Base


class Reproduccion(Base):
    __tablename__ = "reproduccion"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, User.id, nullable=False)
    cancion_id = Column(Integer, nullable=False)
    #queda terminarlo