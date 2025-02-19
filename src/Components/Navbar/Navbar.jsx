import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { logOut, user, loading } = useContext(AuthContext);
  console.log("user url", user?.photoURL);
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const navlinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addCredentials">Add Credentials</NavLink>
      </li>
      <li>
        <NavLink to="/myCredentialsList">My Credentials List</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52"
          >
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-outline btn-warning text-xl" href="/">
          Password Manager
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          // Show loading spinner while data is loading
          <div>
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        ) : user ? (
          // Show user data when available
          <>
            {/* <p className="hidden md:block lg:block">{user.displayName}</p>  */}
            <div className="btn btn-ghost btn-circle avatar flex">
              <div className={`w-10 rounded-full hover:${user.displayName}`}>
                {loading ? (
                  <h5>Loading</h5>
                ) : (
                  <img
                    src={user?.photoURL}
                    title={user.displayName || "No User Name"}
                    alt="User Avatar"
                  />
                )}
                {/* <img src={user?.photoURL} data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName} alt="User Avatar" /> */}
              </div>
            </div>
            <button
              className="btn btn-outline btn-accent"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </>
        ) : (
          // Show login button if no user is logged in
          <>
            <div className="flex gap-2">
              <Link className="btn btn-outline btn-success" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline btn-success" to="/register">
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
