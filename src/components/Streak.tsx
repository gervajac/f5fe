export const Streak = ({ firePlayers, coldPlayers }: any) => {
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <h1 className="text-lg text-center font-bold">🔥-Rachas-🥶</h1>
      <div className="flex flex-row justify-start items-center w-full">
        <div className="flex flex-col justify-start items-center w-full bg-green-500">
          {firePlayers.map((e: any) => {
            return (
              <div className="flex flex-row justify-center items-center w-full">
                <h1 className="w-[20px] pl-1">{e.winningStreak}</h1>
                <h1 className="w-full">{e.fullname}</h1>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-start items-center w-full bg-red-300">
          {coldPlayers.map((e: any) => {
            return (
              <div className="flex flex-row justify-center items-center w-full">
                <h1 className="w-[20px] pl-1">{e.losingStreak}</h1>
                <h1 className="w-full">{e.fullname}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center"></div>
    </div>
  );
};
