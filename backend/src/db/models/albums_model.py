from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.db.connection import Base


class Albums(Base):
    __tablename__ = "albums"

    id = Column(Integer, primary_key=True)
    titulo = Column(String, unique=False, nullable=False)
    anio = Column(Integer)
    artista_id = Column(Integer,nullable=False, )