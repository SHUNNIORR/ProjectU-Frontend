import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import { Link } from "react-router-dom";
import { useState } from "react";
import '../index.css'

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const admin = useAdmin();

  const [selectedFile, setSelectedFile] = useState(null);

  const {
    descripcion,
    nombre,
    prioridad,
    fechaEntrega,
    estado,
    _id,
    responsable,
  } = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      {console.log("DE TAREAAAA", responsable)}
      <div className="flex flex-col  items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
        {responsable && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Responsable: {responsable.nombre}
          </p>
        )}
        {estado && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completada por: {tarea.completado.nombre}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {responsable ? null : (
          <Link
            to={`/proyectos/nuevo-responsable/${_id}`}
            className="text-gray-400 hover:text-black uppercase font-bold"
          >
            Añadir responsable
          </Link>
        )}

        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>
        {/* BOTON SUBIR ARCHIVO */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="file"
            accept="application/pdf"
            className={`${
              estado ? "bg-sky-600" : "bg-gray-600"
            } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
            onChange={e => setSelectedFile(e.target.files[0])}
          />
          <button
            className=" button-subirArchivo bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => console.log(selectedFile)}
            disabled={!selectedFile}
          >
            Subir
          </button>
        </div>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
