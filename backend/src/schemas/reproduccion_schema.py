from pydantic import BaseModel, Field
from datetime import datetime


class CreateReproduccionSchema(BaseModel):
    cancion_id: int
    segundos_escuchados: int = Field(ge=0)


class ReproduccionResponseSchema(BaseModel):
    id: int
    usuario_id: int
    cancion_id: int
    fecha: datetime
    segundos_escuchados: int

    class Config:
        from_attributes = True
