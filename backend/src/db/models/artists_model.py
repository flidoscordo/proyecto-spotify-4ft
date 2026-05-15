from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from src.db.connection import Base


class Artists(Base):
    __tablename__ = "artists"

    id = Column(Integer, primary_key=True)
    nombre = Column(String, nullable=False)
    pais = Column(String)
    genero_musical = Column(String)