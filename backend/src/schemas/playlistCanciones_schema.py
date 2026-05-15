from pydantic import BaseModel, EmailStr, Field, datetime


class CreatePlaylistCancionesSchema(BaseModel):
    playlist_id: int 
    cancion_id: int 
    orden: int = Field(ge=1)
    

class UpdatePlaylistcancionesSchema(BaseModel):
    orden: int = Field() 

class ReadPlaylistCancionesSchema(BaseModel):
    playlist_id: int
    cancion_id: int
    orden: int
    fecha_agregada: datetime