export default function Pagination() {
  return (
    <div className="p-4 flex justify-between items-center to-gray-500">
      <button disabled className="px-4 py-2 rounded-md bg-slate-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="px-2 rounded-md bg-thirdElement ">1</button>
        <button className="px-2 rounded-md  ">2</button>
        <button className="px-2 rounded-md  ">3</button>
        
        <button className="px-2 rounded-md  ">10</button>
      </div>
      <button className="px-4 py-2 rounded-md bg-slate-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Prev
      </button>
    </div>
  );
}
