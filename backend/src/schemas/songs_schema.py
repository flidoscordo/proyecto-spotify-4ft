from pydantic import BaseModel, Field
from typing import Optional


class CreateSongSchema(BaseModel):
    titulo: str
    duracion_seg: int = Field(gt=0)
    album_id: int


class UpdateSongSchema(BaseModel):
    titulo: Optional[str] = None
    duracion_seg: Optional[int] = Field(default=None, gt=0)
    album_id: Optional[int] = None


class SongResponseSchema(BaseModel):
    id: int
    titulo: str
    duracion_seg: int
    album_id: int

    class Config:
        from_attributes = True
