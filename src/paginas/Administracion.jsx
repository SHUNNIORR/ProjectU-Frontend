import { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/Alerta";
import useAdmin from "../hooks/useAdmin";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "rsuite";
import moment from "moment";

const Administracion = () => {
  const {
    proyectos,
    tareaPorUsuario,
    obtenerTareasPorUsuario,
    alerta,
    filtrarTareasPorFecha,
    tareaPorFecha,
  } = useProyectos();
  const { msg } = alerta;
  const admin = useAdmin();

  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const params = useParams();

  const handleFechaInicio = (e) => {
    let fecha = moment(new Date(e.target.value));
    console.log("Fecha original:" + e.value);
    console.log("Fecha formateada es: " + fecha.format("YYYY-MM-DD"));
    const fechaFormateada = fecha.format("YYYY-MM-DD") + "T00:00:00.000Z";
    console.log("variable", fechaFormateada);
    setFechaInicial(fechaFormateada);
    console.log("FECHA INICIAL", fechaInicial);
  };

  const handleFechaFinal = (e) => {
    let fecha = moment(new Date(e.target.value));
    console.log("Fecha original:" + e.value);
    console.log("Fecha formateada es: " + fecha.format("YYYY-MM-DD"));
    const fechaFormateada = fecha.format("YYYY-MM-DD") + "T00:00:00.000Z";
    console.log("variable", fechaFormateada);
    setFechaFinal(fechaFormateada);
    console.log("FECHA FINAL", fechaFinal);
  };

  useEffect(() => {
    obtenerTareasPorUsuario({ userId: params.id });
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">Administracion</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg ">
        <div>
          <h2
            style={{ paddingLeft: "30px", paddingTop: "30px" }}
            className="text-3xl font-black"
          >
            {" "}
            Mis tareas.
          </h2>
          <div style={{ padding: "30px" }}>
            {console.log("tarea por usuario en el componente", tareaPorUsuario)}
            {tareaPorUsuario.map((tarea, index) => (
              <div
                style={{ margin: "30px", padding: "20px" }}
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <p className="text-blue-600" style={{ fontSize: "24px" }}>
                  {" "}
                  Nombre: {tarea.nombre}{" "}
                </p>
                <p> Descripción: {tarea.descripcion}</p>
                <p> Prioridad: {tarea.prioridad}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white shadow mt-10 rounded-lg ">
        <div>
          <h2
            style={{ paddingLeft: "30px", paddingTop: "30px" }}
            className="text-3xl font-black"
          >
            {" "}
            Tareas por fechas.
          </h2>
          <div style={{ padding: "30px" }}>
            <div style={{display:'flex',flexDirection:'column', width:"300px"}}>
              <p>Fecha inicial</p>
              <input
                style={{border:'1px solid blue'}}
                type="date"
                id="date"
                onChange={(e) => handleFechaInicio(e)}
              />
              <p>Fecha final</p>
              <input
                style={{border:'1px solid blue'}}
                type="date"
                id="date"
                onChange={(e) => handleFechaFinal(e)}
              />
              <button
                style={{border:'1px solid blue', borderRadius:'20px', width:"200px", backgroundColor:"#293462", color:"white", margin:'20px'}}
                onClick={() =>
                  filtrarTareasPorFecha(params.id, fechaInicial, fechaFinal)
                }
              >
                Filtrar
              </button>
            </div>
            {tareaPorFecha.map((tarea, index) => (
              <div
                style={{ margin: "30px", padding: "20px" }}
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <p className="text-blue-600" style={{ fontSize: "24px" }}>
                  {" "}
                  Nombre: {tarea.nombre}{" "}
                </p>
                <p> Descripción: {tarea.descripcion}</p>
                <p> Prioridad: {tarea.prioridad}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Administracion;
