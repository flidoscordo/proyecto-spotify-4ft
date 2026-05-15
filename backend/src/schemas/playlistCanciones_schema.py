from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class CreatePlaylistCancionesSchema(BaseModel):
    playlist_id: int 
    cancion_id: int 
    orden: int = Field(ge=1)
    

class UpdatePlaylistCancionesSchema(BaseModel):
    orden: Optional[int] = Field(default=None, ge=1) 

class ReadPlaylistCancionesSchema(BaseModel):
    playlist_id: int
    cancion_id: int
    orden: int
    fecha_agregada: datetime
