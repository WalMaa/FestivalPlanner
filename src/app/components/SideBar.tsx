

const SideBar = (props:any) => {
    return (
    <div className="bg-orange w-80">
            <div className="h-16 flex justify-center items-center ">
              <h1 className="text-3xl font-bold text-gray-800"> Mis Festarit?</h1>
            </div>
            <div className="flex-grow">
              <ul className="p-4">
                <li className="mb-2">
                  <a
                    href="#"
                    className="block p-2 text-gray-800 hover:bg-gray-200 rounded-xl"
                  >
                    Kuukausi
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="block p-2 text-gray-800 hover:bg-gray-200 rounded-xl"
                  >
                    Festivals
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="block p-2 text-gray-800 hover:bg-gray-200 rounded-xl"
                  >
                    About
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="block p-2 text-gray-800 hover:bg-gray-200 rounded-xl"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
    )

}
    
export default SideBar;