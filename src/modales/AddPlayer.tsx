import { useState, useEffect } from "react";
import axios from "axios";
export default function AddPlayer({ onCancel, leagues, actualize }: any) {
  const [player, setPlayer] = useState({
    fullname: "",
    leagueId: leagues._id,
  });

  const handleChange = (field: any, value: any) => {
    setPlayer((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSendReserva = async () => {
    if (!player.fullname || !player.leagueId) {
      return alert("Completar todos los campos.");
    }

    try {
      console.log(player, "player");
      await axios.post(`https://f5be.onrender.com/players`, player);
      onCancel();
      actualize();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(leagues, "LEAGUES EN MODAL");
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800  opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-md z-10 w-[350px] h-auto">
        <h1 className="flex text-2xl font-semibold underline mb-4 justify-center items-center text-center">
          Nuevo Jugador
        </h1>
        <div className="flex flex-col justify-center items-start space-y-2">
          <div className="flex flex-col w-full">
            <label className="font-semibold font-geoslab">Nombre</label>
            <input
              onChange={(e) => handleChange("fullname", e.target.value)}
              placeholder="Introducir nombre"
              className=" border-b border-black"
            ></input>
          </div>
          {/* <div className="flex flex-col w-full">
            <label className="font-semibold font-geoslab">Ligas</label>
            <select
              onChange={(e) => handleChange("leagueId", e.target.value)}
              className=" border-b border-black"
            >
              <option value={""}>Seleccionar Liga</option>
              {leagues &&
                leagues.map((e: any) => {
                  return <option value={e.id}>{e.name}</option>;
                })}
            </select>
          </div> */}
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
            Añadir Jugador
          </button>
        </div>
      </div>
    </div>
  );
}
