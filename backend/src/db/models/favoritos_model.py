from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from src.db.connection import Base


class Favoritos(Base):
    __tablename__ = "Favoritos"

    usuario_id = Column(Integer, primary_key=True, notnull=True)
    cancion_id = Column(Integer, nullable=False)
    fecha_agregada = Column(DateTime)
    genero_musical = Column(String)
    