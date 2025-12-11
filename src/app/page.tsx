import { SFIcon } from "star-flicks-ds";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Ellen Teixeira</h1>
        <SFIcon name="star" />
        <p className="text-xl text-gray-600">Odontologia</p>
      </div>
    </main>
  );
}
