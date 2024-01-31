import React, { useState } from "react";

interface Comentario {
  id: number;
  texto: string;
  respuestas: Comentario[];
}

const CommentsFormPrompt = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState<string>("");

  const handleNuevoComentarioChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNuevoComentario(e.target.value);
  };

  const handleAgregarComentario = () => {
    if (nuevoComentario.trim() !== "") {
      const nuevoComentarioObj: Comentario = {
        id: comentarios.length + 1,
        texto: nuevoComentario,
        respuestas: [],
      };

      setComentarios([...comentarios, nuevoComentarioObj]);
      setNuevoComentario("");
    }
  };

  const handleAgregarRespuesta = (comentarioId: number) => {
    const respuesta = prompt("Ingrese su respuesta:");
    if (respuesta) {
      const nuevoComentarioObj: Comentario = {
        id: comentarios.length + 1,
        texto: respuesta,
        respuestas: [],
      };

      const nuevosComentarios = comentarios.map((c) => {
        if (c.id === comentarioId) {
          return { ...c, respuestas: [...c.respuestas, nuevoComentarioObj] };
        }
        return c;
      });

      setComentarios(nuevosComentarios);
    }
  };

  return (
    <div>
      <h2>Formulario de Comentarios</h2>
      <div>
        <label htmlFor="nuevoComentario">Nuevo Comentario:</label>
        <input
          type="text"
          id="nuevoComentario"
          value={nuevoComentario}
          onChange={handleNuevoComentarioChange}
        />
        <button onClick={handleAgregarComentario}>Agregar Comentario</button>
      </div>
      <div>
        <h3>Comentarios</h3>
        {comentarios.map((comentario) => (
          <div key={comentario.id}>
            <p>{comentario.texto}</p>
            <button onClick={() => handleAgregarRespuesta(comentario.id)}>
              Responder
            </button>
            {comentario.respuestas.length > 0 && (
              <div style={{ marginLeft: 20 }}>
                <h4>Respuestas:</h4>
                {comentario.respuestas.map((respuesta) => (
                  <p key={respuesta.id}>{respuesta.texto}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsFormPrompt;
