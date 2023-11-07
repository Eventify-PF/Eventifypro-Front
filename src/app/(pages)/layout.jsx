import Navbar from "@/components/Navbar/Navbar";
export default function MainLayout({ children }) {
  return (
    <div>
        <Navbar/>
        <div className="bg-gray-300 min-h-screen pb-20 pt-28">
            {children}
        </div>
    </div>
  )
}