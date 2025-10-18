import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { MdAccountCircle } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function Hider() {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // ✅ Search popup state

    // Desktop and mobile menu items
    const navItems = [
        { name: "Home", to: "/" },
        { name: "All Courses", to: "/" },
        { name: "Pricing", to: "/Pricing" },
        { name: "About Us", to: "/AboutPagase" },
        { name: "Contact Us", to: "/ContactSection" },
        { name: "Blog", to: "/BologPagas" },
    ];

    return (
        <nav>
            {/* Navbar */}
            <div className="bg-teal-50 flex justify-between items-center fixed top-0 left-0 w-full shadow-md px-6 md:px-12 z-50 h-16">
                {/* Logo */}
                <div className="w-[150px]">
                    <img src="/imgas/1.png" alt="Logo" className="h-12 object-contain" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 font-semibold">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-gray-950"
                                    : "hover:text-indigo-600 transition-colors"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Right Icons & Button */}
                <div className="flex items-center gap-4">
                    <Link to="/FreeTrailPagas">
                        <Button className="bg-blue-600 cursor-pointer p-2 rounded-2xl text-white">
                            FREE TRIAL
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3 text-gray-800 text-xl">
                        <Link to={"/Myaccountpagas"}>
                            <MdAccountCircle />
                        </Link>
                        <button className="cursor-pointer" onClick={() => setSearchOpen(true)}>
                            <FaSearch />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        aria-label={open ? "Close menu" : "Open menu"}
                        className="md:hidden text-indigo-600 ml-2"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-teal-50 w-full fixed top-16 left-0 shadow-md z-40 transform transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="flex flex-col gap-4 font-bold px-6 py-6">
                    {navItems.map((item) => (

                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Search Popup */}
            {searchOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative">

                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                            onClick={() => setSearchOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Search</h2>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                            Search
                        </button>
                    </div>
                </div>
            )}

            {/* Page content */}
            <div className="pt-20">
                <Outlet />
            </div>
        </nav>
    );
}

export default Hider;
