from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.db.connection import Base
from playlists_model import Playlists

class playlist_colaboradores(Playlists):
    __tablename__ = "playlist_colaboradores"
    
    playlist_id = Column(Integer,nullable=False)
    usuario_id = Column(Integer, nullable = False)
    fecha_agregado = Column(DateTime)
