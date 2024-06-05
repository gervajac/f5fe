import { useState } from "react";
import axios from "axios";
export default function AddMatch({ onCancel, leagues, actualize }: any) {
  const [date, setDate] = useState<any>(null);
  const [players, setPlayers] = useState(leagues.players);
  const [tenPlayers, setTenPlayers] = useState<any>([]);
  const [teamOne, setTeamOne] = useState<any>([]);
  const [teamTwo, setTeamTwo] = useState<any>([]);
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState("");

  // const handleChange = (field: any, value: any) => {
  //   setTeamOne((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  const handleSendReserva = async () => {
    try {
      console.log(teamOne, teamTwo, date, "INFO");
      const resp = await axios.post(`https://f5be.onrender.com/matches`, {
        team1: teamOne,
        team2: teamTwo,
        date: date,
        leagueId: leagues._id,
      });
      console.log("ENTRA??????");
      console.log(resp, "RESPUESTAAAAAAAAAAAAAAAAAA");
      await actualize();
      onCancel();
    } catch (err) {
      console.log(err);
      //   setError("Error al añadir Reserva. Intente más tarde.");
    }
  };
  console.log(players, "PLAYERRRR");
  console.log(tenPlayers, "tennnnnnPLAYERS");
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800  opacity-50"></div>
      {paso === 1 ? (
        <div className="bg-white p-6 rounded shadow-md z-10 w-[350px] h-auto">
          <h1 className="flex text-2xl font-semibold underline mb-4 justify-center items-center text-center">
            Armar Partido
          </h1>
          <div className="flex flex-col justify-center items-start space-y-2">
            <div className="flex flex-col w-full">
              <label className="font-bold font-geoslab uppercase">
                Paso 1 - Elegir 10 Jugadores:
              </label>
              <select
                onChange={(e) => {
                  setTenPlayers((prevState: any) => [
                    ...prevState,
                    e.target.value,
                  ]);
                  const filterPlayers = players.filter(
                    (p: any) => p.fullname !== e.target.value
                  );
                  console.log(filterPlayers, "FILTERPLAYERS");
                  setPlayers(filterPlayers);
                }}
                className="border p-3 rounded-lg border-black"
              >
                <option value={""}>Seleccionar Jugadores</option>
                {players &&
                  players.map((e: any) => {
                    return (
                      <option key={e.fullname} value={e.fullname}>
                        {e.fullname}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label className="font-semibold font-geoslab">
                Jugadores Citados: {tenPlayers && tenPlayers.length}
              </label>
              {tenPlayers &&
                tenPlayers.map((e: string) => {
                  return (
                    <div className="flex flex-row w-full p-2 border rounded-lg">
                      <h1 className="w-full">{e}</h1>
                      <button
                        onClick={() => {
                          const eliminate = tenPlayers.filter(
                            (p: string) => p !== e
                          );
                          setTenPlayers(eliminate);
                        }}
                        className="text-red-700"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* {error() && <h1 className="font-semibold text-red-500">{error()}</h1>} */}
          <div className="flex justify-center space-x-4 p-6 font-bold">
            <button
              className="flex w-auto p-2 border hover:bg-red-200 border-red-200 rounded uppercase"
              onClick={() => onCancel()}
            >
              Cerrar
            </button>
            <button
              className="flex w-auto p-2 border hover:bg-green-200 border-green-200 rounded uppercase"
              onClick={() => setPaso(2)}
            >
              Armar EQUIPOS
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center bg-white p-6 rounded shadow-md z-10 w-[400px] h-auto space-y-5">
          <h1 className="flex text-2xl font-semibold underline mb-4 justify-center items-center text-center">
            Armar Equipos
          </h1>
          <input
            type="date"
            onChange={(date) => setDate(date.target.value)}
            className="flex justify-center items-center border-2 p-1 rounded-lg border-green-700"
          />
          <div className="flex flex-row justify-center items-start">
            <div className="flex flex-col w-full">
              <label className="font-bold font-geoslab uppercase">
                Equipo 1 ELECCION
              </label>
              <select
                onChange={(e) => {
                  if (5 === teamOne.length) {
                    return setError("Máximo 5 Jugadores en equipo 1.");
                  }
                  setTeamOne((prevState: any) => [
                    ...prevState,
                    e.target.value,
                  ]);
                  const filterPlayers = tenPlayers.filter(
                    (p: any) => p !== e.target.value
                  );
                  console.log(filterPlayers, "FILTERPLAYERS");
                  setTenPlayers(filterPlayers);
                }}
                className="border-2 p-1 rounded-lg border-green-700"
              >
                <option>Seleccionar Jugador</option>
                {tenPlayers &&
                  tenPlayers.map((e: any) => {
                    return (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label className="font-bold font-geoslab uppercase">
                Equipo 2 ELECCION
              </label>
              <select
                onChange={(e) => {
                  if (5 === teamTwo.length) {
                    return setError("Máximo 5 Jugadores en equipo 2.");
                  }
                  setTeamTwo((prevState: any) => [
                    ...prevState,
                    e.target.value,
                  ]);
                  const filterPlayers = tenPlayers.filter(
                    (p: any) => p !== e.target.value
                  );
                  console.log(filterPlayers, "FILTERPLAYERS");
                  setTenPlayers(filterPlayers);
                }}
                className="border-2 p-1 rounded-lg border-green-700"
              >
                <option>Seleccionar Jugador</option>
                {tenPlayers &&
                  tenPlayers.map((e: any) => {
                    return (
                      <option key={e} className="text-black" value={e}>
                        {e}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="flex flex-col w-full">
              <label className="font-semibold font-geoslab">
                Equipo 1: {teamOne && teamOne.length} / 5
              </label>
              {teamOne &&
                teamOne.map((e: string) => {
                  return (
                    <div
                      key={e}
                      className="flex flex-row w-full p-2 border rounded-lg border-black"
                    >
                      <h1 className="w-full">{e}</h1>
                      <button
                        onClick={() => {
                          const eliminate = teamOne.filter(
                            (p: string) => p !== e
                          );
                          setTeamOne(eliminate);
                          setTenPlayers((prevData: any) => [...prevData, e]);
                        }}
                        className="text-red-700"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className="flex flex-col w-full ">
              <label className="font-semibold font-geoslab">
                Equipo 2: {teamTwo && teamTwo.length} / 5
              </label>
              {teamTwo &&
                teamTwo.map((e: string) => {
                  return (
                    <div
                      key={e}
                      className="flex flex-row w-full p-2 border rounded-lg border-black"
                    >
                      <h1 className="w-full">{e}</h1>
                      <button
                        onClick={() => {
                          const eliminate = teamTwo.filter(
                            (p: string) => p !== e
                          );
                          setTeamTwo(eliminate);
                          setTenPlayers((prevData: any) => [...prevData, e]);
                        }}
                        className="text-red-700"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          {error && <h1 className="font-semibold text-red-500">{error}</h1>}
          <div className="flex justify-center space-x-4 p-6 font-bold">
            <button
              className="flex w-auto p-2 border hover:bg-red-200 border-red-200 rounded uppercase"
              onClick={() => onCancel()}
            >
              Cerrar
            </button>
            <button
              className="flex w-auto p-2 border hover:bg-green-200 border-green-200 rounded uppercase"
              onClick={() => handleSendReserva()}
            >
              Confirmar Parrtido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
