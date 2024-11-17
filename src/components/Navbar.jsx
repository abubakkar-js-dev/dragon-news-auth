import { Link } from "react-router-dom";
import userIcon from "../assets/user.png";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        alert("Log out Succesfully");
      })
      .catch((err) => {
        alert("OHH ERROR: ", err.message);
      });
  };
  return (
    <div className="flex justify-between items-center">
      <div className="">{user && user.email}</div>
      <div className="nav space-x-5">
        <Link to="/">Home</Link>
        <Link to="/career">Career</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="login flex gap-2 items-center">
        <div className=" ">
          {user && user?.email ? (
            <div className="flex flex-row-reverse items-center gap-2">
              <img
                className="h-12 border-2 border-gray-200 rounded-full"
                src={user.photoURL}
              />
              <p>{user.displayName}</p>
            </div>
          ) : (
            <img src={userIcon} alt="" />
          )}
        </div>
        {user && user?.email ? (
          <button
            onClick={handleLogOut}
            className="btn btn-neutral rounded-none"
          >
            Log-Out
          </button>
        ) : (
          <Link to={"/auth/login"} className="btn btn-neutral rounded-none">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
