import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '@/redux/authSlice/AuthSlice'; // Adjust the path accordingly
import axiosInstance from "@/axiosCofig/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.accessToken);

  // if (!user) {
  //   return <div>Loading...</div>; // Fallback while loading
  // }

  const isLogin = user?.success;

  // Logout function

  const handleLogout = async () => {
    try {
      // Send logout request to the server
      await axiosInstance.post("/users/logout");
  
      // Show toast notification
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 2000, 
      });
  
      // Dispatch logout action
      dispatch(logout());
  
      // Redirect after toast
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      // Show toast error instead of alert
      toast.error("Failed to log out. Please try again.");
    }
  };
  
  return (
    <header className=" bg-[#A1662F]">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://www.svgrepo.com/show/500085/tree.svg"
              className="h-10 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link to="/trees" className="text-sm font-semibold leading-6 text-gray-900">
            Trees
          </Link>
          <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
            About
          </Link>
          {isLogin && user?.data?.user?.role === "admin" && (
            <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
              Dashboard
            </Link>
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLogin ? (
            <Link to="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
              Login<span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-white inline-block p-2 border border-spacing-1 bg-slate-800">
                {user?.data?.user?.fullName?.toUpperCase()}
              </p>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold leading-6 text-gray-900 bg-red-500 hover:bg-red-600 p-2 rounded-md"
              >
                Logout
              </button>
              <ToastContainer/>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#00b894] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://www.svgrepo.com/show/500085/tree.svg"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <Link
                  to ="/trees"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Trees
                </Link>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
                {isLogin && user?.data?.user?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
              <div className="py-6">
                {!isLogin ? (
                  <Link to="/auth/login" className="text-sm font-semibold leading-6 text-gray-900">
                    Login<span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-white inline-block p-2 border border-spacing-1 bg-slate-800">
                      {user?.data?.user?.fullName?.toUpperCase()}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="text-sm font-semibold leading-6 text-gray-900 bg-red-500 hover:bg-red-600 p-2 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
