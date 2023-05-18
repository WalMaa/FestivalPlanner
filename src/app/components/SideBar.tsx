

const SideBar = (props: any) => {
  return (
    <div className="bg-orange w-80">
      <ul className="px-4 py-24">
        <li className="mb-5">
          <a
            href="#"
            className=" p-4 text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
          >
            Tietoa
          </a>
        </li>
        <li className="mb-5">
          <a
            href="#"
            className=" p-4 text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
          >
            Pimeä Tila
          </a>
        </li>
        <li className="mb-5">
          <a
            href="#"
            className=" p-4 text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
          >
            Yhteistiedot
          </a>
        </li>
        <li className="mb-5">
          <a
            href="#"
            className=" p-4 text-gray-800 text-3xl hover:bg-gray-200 rounded-xl"
          >
            Palaute
          </a>
        </li>
      </ul>
    </div>
  )

}

export default SideBar;