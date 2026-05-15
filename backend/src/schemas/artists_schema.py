from pydantic import BaseModel
from typing import Optional


class CreateArtistSchema(BaseModel):
    nombre: str
    pais: Optional[str] = None
    genero_musical: Optional[str] = None


class UpdateArtistSchema(BaseModel):
    nombre: Optional[str] = None
    pais: Optional[str] = None
    genero_musical: Optional[str] = None


class ArtistResponseSchema(BaseModel):
    id: int
    nombre: str
    pais: Optional[str]
    genero_musical: Optional[str]

    class Config:
        from_attributes = True
