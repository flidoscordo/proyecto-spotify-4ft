from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from src.db.connection import Base


class Canciones(Base):
    __tablename__ = "canciones"

    id = Column(Integer, primary_key=True)
    titulo = Column(String, unique=False, nullable=False )
    duracion_seg = Column(Integer, nullable=False )
    album_id = Column(Integer, unique= True, nullable=False  )

