import { PlayerAttendance } from "../interfaces/interfaces";

interface AssistanceProps {
  assistanceList: PlayerAttendance[];
}

export const Assistance: React.FC<AssistanceProps> = ({ assistanceList }) => {
  console.log(assistanceList, "list??");
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-lg text-center font-bold underline">
        Asistencia perfecta
      </h1>
      <div className="flex flex-row justify-center items-center w-full bg-green-600">
        <h1 className="w-[150px] pl-1 text-center font-bold border-r border-black">
          PJ Seguidos
        </h1>
        <h1 className="w-full font-bold pl-1">Jugador</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full bg-green-500">
        {assistanceList.map((e, index) => (
          <div
            key={index}
            className="flex flex-row justify-center items-center w-full"
          >
            <h1 className="w-[150px] pl-1 text-center border-r border-black">
              {e.recentMatchesPlayed}
            </h1>
            <h1 className="w-full pl-1">{e.fullname}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
