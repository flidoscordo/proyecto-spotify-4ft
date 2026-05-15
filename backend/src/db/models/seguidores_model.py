from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.db.connection import Base


class Seguidores(Base):
    __tablename__ = "seguidores"

    usuario_id = Column(Integer, nullable=False)
    artista_id = Column(Integer, nullable=False)
    fecha_seguimiento = Column(DateTime)
