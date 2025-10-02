import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/userContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [mobileOpen, setMobileOpen] = useState(false);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const itemQuantities = useSelector((store) => store.cart.itemQuantities);

  // lock body scroll when menu open (nice UX)
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/grocery", label: "Grocery" },
  ];

  // Add this function to calculate total items
  const getTotalItemCount = () => {
    return Object.values(itemQuantities).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  return (
    <header className="sm:mx-4 m-1 px-4 h-16 sticky top-2 z-50 bg-transparent backdrop-blur-lg rounded-2xl text-black border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1), inset_0_1px_0_rgba(255,255,255,0.5), inset_0_-1px_0_rgba(255,255,255,0.1), inset_0_0_20px_10px_rgba(255,255,255,1)] bg-white/10">
      <div className="flex h-16 items-center justify-between">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-4 h-full"
        >
          <FontAwesomeIcon
            className="text-brand-500"
            icon={faUtensils}
            size="2x"
          />
          <h1 className="font-heading-1 text-brand-500 text-3xl whitespace-nowrap">
            Namaste Food
          </h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:block h-full">
          <ul className="flex items-center h-full gap-1 font-body font-semibold [&>li]:rounded-3xl [&>li]:px-3 [&>li]:py-2 [&>li:hover]:bg-brand-100">
            <li className="hidden xl:inline">
              Online Status: {onlineStatus ? "😎" : "🥶"}
            </li>
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>{loggedInUser}</li>
            <li className="border-brand-500 border rounded-2xl text-brand-500 font-medium hover:bg-white! hover:border-brand-600! hover:text-brand-600! mx-1">
              <Link to="/cart" className="flex items-center gap-2">
                <FontAwesomeIcon
                  className="text-brand-500"
                  icon={faCartShopping}
                />
                ({getTotalItemCount()} Items)
              </Link>
            </li>
            <li className="bg-brand-500 text-white font-medium hover:bg-brand-400!">
              <button
                onClick={() =>
                  setBtnName((n) => (n === "Login" ? "Logout" : "Login"))
                }
              >
                {btnName}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <div className="xl:hidden flex items-center h-full">
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-300"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu: smooth scale + fade */}
      <div
        className={`xl:hidden origin-top transform transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "scale-y-100 opacity-100 max-h-[500px]"
            : "scale-y-0 opacity-0 max-h-0"
        }`}
      >
        <nav className="bg-white backdrop-blur-md rounded-2xl p-4 mt-3 shadow-sm">
          <ul className="flex flex-col gap-2 [&>li]:rounded-3xl [&>li]:px-3 [&>li]:py-2 [&>li:hover]:bg-brand-100 items-center">
            <li>Online Status: {onlineStatus ? "😎" : "🥶"}</li>
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-4">{loggedInUser}</li>
            <li className="border-brand-500 border rounded-2xl text-brand-500 font-medium hover:bg-white! hover:border-brand-600! hover:text-brand-600! w-full flex items-center justify-center">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <FontAwesomeIcon
                  className="text-brand-500"
                  icon={faCartShopping}
                />
                ({getTotalItemCount()} Items)
              </Link>
            </li>
            <button
              onClick={() => {
                setBtnName((n) => (n === "Login" ? "Logout" : "Login"));
                setMobileOpen(false);
              }}
              className="w-full bg-brand-500 text-white py-2 rounded-lg"
            >
              {btnName}
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
