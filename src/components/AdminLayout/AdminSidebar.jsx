import Link from "next/link";
const AdminSidebar = () => {
  return (
  <aside className='fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75' >
	  <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 bg-white divide-y space-y-1">
          <ul className="space-y-2 pt-2">
          
            <li>
              <Link href="/admin" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/create-event" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                <span className="ml-3">Events</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/create-ticket" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                <span className="ml-3">Tickets</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
	</aside>
  );
}

export default AdminSidebar;
