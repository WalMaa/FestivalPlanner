import React from "react";
export function NoFestivals({
  modalRef,
  closeLocation,
  city,
}: {
    modalRef: React.RefObject<HTMLDivElement>;
    closeLocation: () => void;
    city: string;
}) {
  return <div className="fixed animate-jump-in animate-ease-out top-0 left-0 w-full h-full z-10 backdrop-blur-sm">
        <div ref={modalRef} className="absolute top-1/3 right-1/2 translate-x-1/2 w-64 shadow-md rounded-lg p-2 z-20 ">
          <span className="flex justify-end">
            <button onClick={() => closeLocation()} aria-label="Close festival menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-8 h-8 active:scale-90 hover:scale-110 transition-transform duration-300 hover:stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
          <h2 className="text-xl text-center">
            No festivals available for {city}
          </h2>
        </div>
        ;
      </div>;
}
  