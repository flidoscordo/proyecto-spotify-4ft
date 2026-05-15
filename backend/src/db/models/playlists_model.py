from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from backend.src.db.models.artists_model import Artists
from src.db.connection import Base


class Playlist(Base):
    __tablename__ = "playlists"
    id = Column(Integer, primary_key=True)
    nombre = Column(String, nullable=False)
    usuario_id = Column(Integer, nullable=False)
    fecha_creacion = Column(DateTime, server_default=func.now())
    es_publica = Column(Boolean, default=True)
    es_colaborativa = Column(Boolean, default=False)
