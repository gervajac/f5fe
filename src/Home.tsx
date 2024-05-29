import { TableLeague } from "./components/TableLeague";

export function Home() {
  return (
    <section className="flex justify-start flex-col w-screen h-auto items-center min-h-screen bg-green-200 p-2">
      <TableLeague />
    </section>
  );
}
