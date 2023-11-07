import AdminFooter from "@/components/AdminLayout/AdminFooter";
import AdminHeader from "@/components/AdminLayout/AdminHeader";
import AdminSidebar from "@/components/AdminLayout/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div>
        <AdminHeader/>
        <div className="flex overflow-hidden bg-white pt-16">
          <AdminSidebar/>
          <main className="h-full w-full relative overflow-y-auto lg:ml-64 bg-gray-300 min-h-screen pb-20 pt-28">
              {children}
            <AdminFooter/>
          </main>
        </div>
      </div>
    );
  };

export default AdminLayout
