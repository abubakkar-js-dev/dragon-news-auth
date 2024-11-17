import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    loginUser(email, password)
      .then((result) => {
        setUser(result.user);
        e.target.reset();
        setError({...error,})
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl p-12">
        <h2 className="text-center text-2xl lg:text-3xl font-semibold text-[#403F3F]">
          Login Your Account
        </h2>
        <div className="divider"></div>
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label text-lg md:text-xl font-semibold">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your Email"
              className="input bg-[#F3F3F3]"
              required
            />
          </div>
          <div className="form-control">
            <label className="label text-lg md:text-xl font-semibold">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your Password"
              className="input bg-[#F3F3F3]"
              required
            />
            {error.login && <label className="label">
             <p className="text-xs text-red-500">
             {error.login}
             </p>
             </label>}

            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover text-gray-600"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#403F3F] text-white hover:text-black">
              Login
            </button>
          </div>
          <p>
            Don&apos;t Have an Account ?{" "}
            <NavLink
              to={"/auth/register"}
              className="!bg-transparent active:bg-transparent text-red-500"
            >
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
