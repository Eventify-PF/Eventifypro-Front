import AdminFooter from "@/components/AdminLayout/AdminFooter";
import AdminSidebar from "@/components/AdminLayout/AdminSidebar";
import Navbar from "@/components/Navbar/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex overflow-hidden bg-white">
        <AdminSidebar />
        <main className="h-full w-full relative overflow-y-auto lg:ml-64 bg-gray-300 min-h-screen pb-20 pt-28">
          {children}
          <AdminFooter />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
