import CallToAction from "../Component/CallToAction";

export default function Store() {
  return (
    <div>
      Store
      <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
        <h1 className="text-3xl font-semibold">Pojects</h1>
        <p className="text-md text-gray-500">
          choose your own solar system energy and, have a green life with clean
          health.
        </p>
        <CallToAction />
      </div>
    </div>
  );
}
