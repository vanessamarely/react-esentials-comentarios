import React, { useState } from "react";
import "./CommentsForm.css";
interface Comentario {
  id: number;
  texto: string;
  respuestas: Comentario[];
}

const CommentsForm = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState<string>("");
  const [respuestaActiva, setRespuestaActiva] = useState<number | null>(null);
  const [nuevaRespuesta, setNuevaRespuesta] = useState<string>("");

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
    setRespuestaActiva(comentarioId);
  };

  const handleEnviarRespuesta = () => {
    if (nuevaRespuesta.trim() !== "") {
      const nuevaRespuestaObj: Comentario = {
        id: comentarios.length + 1,
        texto: nuevaRespuesta,
        respuestas: [],
      };

      const nuevosComentarios = comentarios.map((c) => {
        if (c.id === respuestaActiva) {
          return { ...c, respuestas: [...c.respuestas, nuevaRespuestaObj] };
        }
        return c;
      });

      setComentarios(nuevosComentarios);
      setRespuestaActiva(null);
      setNuevaRespuesta("");
    }
  };

  return (
    <div>
      <h2>Formulario de Comentarios</h2>
      <div className="comments">
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
            {respuestaActiva === comentario.id && (
              <div className="reply">
                <input
                  type="text"
                  value={nuevaRespuesta}
                  onChange={(e) => setNuevaRespuesta(e.target.value)}
                />
                <button onClick={handleEnviarRespuesta}>
                  Enviar Respuesta
                </button>
              </div>
            )}
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

export default CommentsForm;
