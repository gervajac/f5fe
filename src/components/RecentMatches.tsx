export default function RecentMatches({ recentMatches }: any) {
  console.log(recentMatches, "recentttt");
  return (
    <section className="flex flex-col justify-center h-auto items-center w-full">
      <div className="flex flex-col w-full bg-green-300 h-[40px] border-b-2 border-white">
        <div className="flex flex-row justify-center w-full">
          {" "}
          <div className="flex justify-center items-center h-full w-[240px] bg-green-600">
            Fecha
          </div>
          <div className="flex justify-center items-center h-[40px] w-full bg-green-600 border-l border-white">
            Equipo 1
          </div>
          <div className="flex justify-center items-center h-[40px]  w-full bg-green-600 border-l border-white">
            Equipo 2
          </div>
        </div>
        <section className="flex flex-col justify-start items-center h-full w-full space-y-1">
          {recentMatches &&
            recentMatches.map((e: any) => {
              return (
                <div
                  key={e.id}
                  className="flex flex-row w-full bg-green-300 h-auto"
                >
                  <div className="flex justify-center flex-col items-center w-[240px] h-full font-semibold text-yellow-700">
                    <div className="flex flex-row">
                      {" "}
                      {e.date && e.date.slice(8, 10)}-
                      {e.date && e.date.slice(5, 7)}-
                      {e.date && e.date.slice(0, 4)}
                    </div>
                    <div className="flex flex-row text-2xl text-black font-serif">
                      {e.team1Goals} - {e.team2Goals}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center h-full w-full bg-green-600">
                    {e.winner &&
                      e.winner.map((a: any) => {
                        return (
                          <h1
                            className={`${
                              e.tie.length >= 1
                                ? "text-yellow-400"
                                : "text-green-900"
                            } font-semibold`}
                          >
                            {a.split(" ")[0]}
                          </h1>
                        );
                      })}
                  </div>
                  <div className="flex flex-col justify-center items-center h-full w-full bg-green-600">
                    {e.losser &&
                      e.losser.map((a: any) => {
                        return (
                          <h1
                            className={`${
                              e.tie.length >= 1
                                ? "text-yellow-400"
                                : "text-red-900"
                            } font-semibold`}
                          >
                            {a.split(" ")[0]}
                          </h1>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </section>
      </div>
    </section>
  );
}
