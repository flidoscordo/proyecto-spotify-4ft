from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from backend.src.db.models.artists_model import Artists
from src.db.connection import Base

class playlist_colaboradores(Base):
    playlist_id = Column(Integer,nullable=False)
    usuario_id = Column(Integer, nullable = False)
    fecha_agregado = Column(DateTime)
