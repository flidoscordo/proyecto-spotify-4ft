from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.db.connection import Base

class playlist_colaboradores(Base):
    playlist_id = Column(Integer,nullable=False)
    usuario_id = Column(Integer, nullable = False)
    fecha_agregado = Column(DateTime)
