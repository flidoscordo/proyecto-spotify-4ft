from pydantic import BaseModel
from typing import Optional


class CreateAlbumSchema(BaseModel):
    titulo: str
    anio: Optional[int] = None
    artista_id: int


class UpdateAlbumSchema(BaseModel):
    titulo: Optional[str] = None
    anio: Optional[int] = None
    artista_id: Optional[int] = None


class AlbumResponseSchema(BaseModel):
    id: int
    titulo: str
    anio: Optional[int]
    artista_id: int

    class Config:
        from_attributes = True
