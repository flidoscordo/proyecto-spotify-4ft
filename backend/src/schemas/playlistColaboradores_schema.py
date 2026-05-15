from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class CreatePlaylistColaboradoresSchema(BaseModel):
    playlist_id: int 
    usuario_id: int 
    fecha_agregado: datetime
    

class UpdatePlaylistColaboradoresSchema(BaseModel):
    usuario_id: Optional[int]

class ReadPlaylistColaboradoresSchema(BaseModel):
    playlist_id: int
    ususario_id: int
    fecha_agregado: datetime
