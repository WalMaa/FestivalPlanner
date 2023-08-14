export default function Loading() {
    return (
        <div className="flex h-20 shadow-sm min-w-full shadow-white p-2 bg-white mr-1 my-1 justify-start items-center animate-pulse rounded-lg">
            <div className="lds-ring mt-4"><div></div><div></div><div></div><div></div></div>
            <h2 className="text-xl">Loading...</h2>
        </div>
    );
};
