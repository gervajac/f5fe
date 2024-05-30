import axios from "axios";
export default function NextMatch({ nextMatch, actualize, admin }: any) {
  console.log(nextMatch, "NEXTMATCHH");
  const HandleWinnerTeam1 = async () => {
    try {
      const resp = await axios.patch(`http://localhost:3002/matches/`, {
        id: nextMatch._id,
        winner: nextMatch.team1,
        losser: nextMatch.team2,
        tie: false,
      });
      console.log(resp, "respuestawinner1");
      actualize();
    } catch (err) {
      console.log(err);
    }
  };

  const HandleWinnerTeam2 = async () => {
    try {
      const resp = await axios.patch(`http://localhost:3002/matches/`, {
        id: nextMatch._id,
        winner: nextMatch.team2,
        losser: nextMatch.team1,
        tie: false,
      });
      console.log(resp, "respuestawinner2");
      actualize();
    } catch (err) {
      console.log(err);
    }
  };

  const HandleTie = async () => {
    try {
      const resp = await axios.patch(`http://localhost:3002/matches/`, {
        id: nextMatch._id,
        winner: nextMatch.team2,
        losser: nextMatch.team1,
        tie: true,
      });
      console.log(resp, "empate");
      actualize();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-auto space-x-2 p-2">
      <h1 className="text-xl underline">Próximo Partido</h1>
      {/* <h1 className="font-bold">{nextMatch && nextMatch.date.slice(0, 10)}</h1> */}
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold text-black">Equipo 1</h1>
          {nextMatch &&
            nextMatch.team1.map((e: any) => {
              return (
                <h1 className="flex justify-center items-center p-1 font-semibold text-green-800">
                  {e}
                </h1>
              );
            })}
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold text-black">Equipo 2</h1>
          {nextMatch &&
            nextMatch.team2.map((e: any) => {
              return (
                <h1 className="flex justify-center items-center p-1 font-semibold text-green-800">
                  {e}
                </h1>
              );
            })}
        </div>
      </div>

      {admin && (
        <div className="flex flex-row w-full justify-center items-center space-x-4 px-1">
          <h1 className="text-lg font-semibold">Resultado</h1>
          <button
            onClick={() => HandleWinnerTeam1()}
            className="bg-green-600 rounded-lg p-1 font-semibold"
          >
            EQUIPO 1
          </button>
          <button
            onClick={() => HandleTie()}
            className="bg-yellow-400 rounded-lg p-1 font-semibold"
          >
            EMPATE
          </button>
          <button
            onClick={() => HandleWinnerTeam2()}
            className="bg-green-600 rounded-lg p-1 font-semibold"
          >
            EQUIPO 2
          </button>
        </div>
      )}
    </div>
  );
}
