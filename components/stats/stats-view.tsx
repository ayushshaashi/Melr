export default function StatsView() {
  return (
    <>
      <div className="flex w-full flex-col items-center pt-24">
        <div className="aspect-square w-1/4 overflow-hidden rounded-full border-2 border-solid border-green-400 bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKhPgpyvBBdZnJ5rOaVwcfxm3rzCl4ATuBOw&s)] bg-cover bg-no-repeat"></div>
        <h1 className="text-2xl font-bold text-slate-300">Ayxh</h1>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <div className="flex flex-col items-center pt-4">
        <h1 className="w-full p-4 text-xl font-bold text-gray-200">
          Total time you've been listening to songs:
        </h1>
        <div className="w-3/4">
          <canvas id="barChart"></canvas>
        </div>
        <h1 className="w-full px-4 pt-4 text-xl font-bold text-gray-200">
          All the genre's you've enjoyed:
        </h1>
        <div className="w-3/4 pt-8">
          <canvas id="doughnutChart"></canvas>
        </div>
        <h1 className="w-full px-4 pt-4 text-xl font-bold text-gray-200">
          Songs tell a lot about you:
        </h1>
        <div className="w-3/4 pb-24 pt-8">
          <canvas className="rounded-xl bg-slate-300" id="radarChart"></canvas>
        </div>
      </div>
      <script src="/stats.js"></script>
    </>
  );
}
