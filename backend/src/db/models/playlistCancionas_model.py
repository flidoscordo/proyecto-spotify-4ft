from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from playlists_model import Playlist
from src.db.connection import Base


class Playlist_canciones(Playlist):
    __tablename__ = "Playlist_canciones"

    playlist_id = Column(Integer, nullable=False)
    cancion_id = Column(String, nullable=False)
    orden = Column(Integer, nullable=False)
    fecha_agregada = Column(DateTime)