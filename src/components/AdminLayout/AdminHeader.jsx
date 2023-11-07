import Link from "next/link";

const AdminHeader = () => {
  return (
    <header className=" bg-gray-800 border-b border-gray-200 fixed z-30 w-full">
     <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between my-3 mx-5 ">
        <div className="flex items-center justify-start">
          <Link href="/">
            <h2 className="font-black text-2xl text-center text-orange-500 uppercase">EventifyPro</h2>
          </Link>
        </div>

        <div className="flex items-center">
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
              <button  className="rounde mr-3 border border-white py-1.5 px-6 text-center text-sm font-medium text-slate-300 focus:outline-none md:inline-block rounded-lg">Log out</button>
          </div>
        </div>
      </div>
     </div>
    </header>
  );
}

export default AdminHeader;
