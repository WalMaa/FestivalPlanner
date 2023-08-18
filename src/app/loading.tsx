export default function Loading() {
  return (
    <li className="flex h-20 shadow-sm shadow-white p-2 bg-white mr-1 my-1 justify-start items-center animate-pulse rounded-lg">
      <div className="lds-ring mt-4">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="w-40 h-10 bg-zinc-300 rounded-lg animate-pulse"></div>
    </li>
  );
}
