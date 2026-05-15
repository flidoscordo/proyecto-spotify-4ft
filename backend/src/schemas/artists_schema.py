from pydantic import BaseModel, Field
from typing import Optional


class CreateArtistSchema(BaseModel):
    nombre: str = Field(min_length=1)
    pais: Optional[str] = None
    genero_musical: Optional[str] = None


class UpdateArtistSchema(BaseModel):
    nombre: Optional[str] = None
    pais: Optional[str] = None
    genero_musical: Optional[str] = None


class ArtistResponseSchema(BaseModel):
    id: int
    nombre: str
    pais: Optional[str] = None
    genero_musical: Optional[str] = None

    class Config:
        from_attributes = True