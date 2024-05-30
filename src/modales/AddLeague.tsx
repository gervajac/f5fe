import { useState } from "react";
import axios from "axios";
export default function AddLeague({ onCancel, actualize }: any) {
  const [league, setLeague] = useState({
    name: "",
    days: "",
    stadium: "",
    hour: "",
  });

  const handleChange = (field: any, value: any) => {
    setLeague((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSendReserva = async () => {
    if (!league.name || !league.days || !league.stadium || !league.hour) {
      return alert("Completar todos los campos.");
    }

    try {
      console.log(league, "ligaenviada");
      await axios.post(`http://localhost:3002/league`, league);
      onCancel();
      actualize();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800  opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-md z-10 w-[350px] h-auto">
        <h1 className="flex text-2xl font-semibold underline mb-4 justify-center items-center text-center">
          Nueva Liga
        </h1>
        <div className="flex flex-col justify-center items-start space-y-2">
          <div className="flex flex-col w-full">
            <label className="font-semibold font-geoslab">Nombre de Liga</label>
            <input
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Introducir nombre"
              className=" border-b border-black"
            ></input>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold font-geoslab">
              Que día se juega?
            </label>
            <select
              onChange={(e) => handleChange("days", e.target.value)}
              className=" border-b border-black"
            >
              <option>Seleccionar Día</option>
              <option value={"lunes"}>Lunes</option>
              <option value={"martes"}>Martes</option>
              <option value={"miercoles"}>Miercoles</option>
              <option value={"jueves"}>Jueves</option>
              <option value={"viernes"}>Viernes</option>
              <option value={"sabado"}>Sabados</option>
              <option value={"domingo"}>Domingo</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold font-geoslab">
              Estadio / Cancha
            </label>
            <input
              onChange={(e) => handleChange("stadium", e.target.value)}
              placeholder="Introducir nombre"
              className=" border-b border-black"
            ></input>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold font-geoslab">
              Hora FORMATO: HH:MM (00:00)
            </label>
            <input
              onChange={(e) => handleChange("hour", e.target.value)}
              placeholder="Introducir nombre"
              className=" border-b border-black"
            ></input>
          </div>
        </div>
        {/* {error() && <h1 className="font-semibold text-red-500">{error()}</h1>} */}
        <div className="flex justify-center space-x-4 p-6">
          <button
            className="flex w-auto p-2 border hover:bg-red-200 border-red-200 rounded"
            onClick={() => onCancel()}
          >
            Cerrar
          </button>
          <button
            className="flex w-auto p-2 border hover:bg-green-200 border-green-200 rounded"
            onClick={() => handleSendReserva()}
          >
            Añadir Liga
          </button>
        </div>
      </div>
    </div>
  );
}
