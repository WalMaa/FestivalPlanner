
const ArtistLoading = () =>   {
    
    return (
    <div className="flex flex-1 h-20 shadow-sm shadow-white p-2 bg-white mr-1 my-1 justify-start items-center rounded-lg  animate-pulse">
    <div className="lds-ring mt-4"><div></div><div></div><div></div><div></div></div>
    <h2 className="text-xl">Loading...</h2>
    </div>
    );
};

export default ArtistLoading;
