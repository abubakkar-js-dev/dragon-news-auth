import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
    const {createNewUser,setUser,updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();
    const [error,setError] = useState({});

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        if(name.length < 5){
          setError({...error, name: 'must be more then 5 character long'});
          return;
        }
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        createNewUser(email,password)
        .then(result => {
            setUser(result.user);
            e.target.reset();
            updateUserProfile({displayName: name, 
              photoURL: photo})
            .then(() => {
              // console.log('updated profile');
              navigate('/');
            })
            .catch(err => {
              alert(err.code);
            })

        })
        .catch(err => {
            const errorCode = err.code;
            const errorMessage = err.message;
            alert(errorCode,errorMessage);
        })


        

    }
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-72px)]">
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl p-12">
        <h2 className="text-center text-2xl lg:text-3xl font-semibold text-[#403F3F]">
          Register Your Account
        </h2>
        <div className="divider"></div>
        <form onSubmit={handleSubmit} className="card-body">
          {/* name input */}
          <div className="form-control">
            <label className="label text-lg md:text-xl font-semibold">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your Name"
              className="input bg-[#F3F3F3]"
              required
            />
          </div>
          {
            error.name && <label className="label text-red-500 text-xs">{error.name}</label>
          }
          {/* photo url input */}
          <div className="form-control">
            <label className="label text-lg md:text-xl font-semibold">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Enter your Photo URL"
              className="input bg-[#F3F3F3]"
              required
            />
          </div>
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
              Register
            </button>
          </div>
          <p>
            Already Have an Account ?{" "}
            <NavLink
              to={"/auth/login"}
              className="!bg-transparent active:bg-transparent text-red-500"
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
