from pydantic import BaseModel, EmailStr, Field, datetime


class CreatePlaylistCancionesSchema(BaseModel):
    playlist_id: int 
    cancion_id: int 
    orden: int = Field(ge=1)
    

class UpdatePlaylistcancionesSchema(BaseModel):
    # TODO: completar con los campos opcionales que se permiten actualizar.
    # Tip: todos los campos van como Optional / con default None.
    ...

class ReadPlaylistCancionesSchema(BaseModel):
    playlist_id: int
    cancion_id: int
    orden: int
    fecha_agregada: datetime