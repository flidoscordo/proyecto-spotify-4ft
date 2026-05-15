from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from src.db.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    nombre= Column(String, unique=True, nullable=False)
    fecha_registro= Column(DateTime)
    tipo_plan= Column(nullable=False)
