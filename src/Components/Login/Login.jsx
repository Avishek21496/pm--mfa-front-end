import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { signIn, signInWithGoogle, setLoading } = useContext(AuthContext);

    const handleLogin = e =>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password')
        console.log(email, password)

        // sign in or Log in email and password 
        signIn(email, password)
        .then(result =>{
            console.log(result.user)
            toast.success('You have Successfully logged in', { duration: 4000 })
            navigate(location?.state ? location.state : '/')
        })
        .catch(error =>{
            toast.error('Invalid Email or Password', { duration: 4000 });
            setLoading(false);
        })

    }
    const handleSignInWithGoogle = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result.user)
            toast.success('You have Successfully Signed In with Google', { duration: 4000 });
            navigate(location?.state ? location.state : '/')
        })
        .catch(error => toast.error('Unable to sign in with Google', { duration: 4000 }))
    }
    return (
        <div>
            {/* <Helmet><title>Login</title></Helmet> */}
            <div className=" p-5">
                <h2 data-aos="fade-left" data-aos-duration="2000" className="text-3xl text-center my-10">Please Login!</h2>
                <form data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000" onSubmit={handleLogin} className="lg:w-1/2 md:w-3/4  mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your E-mail" className="input input-bordered focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter your Secret Password" name="password" className="input input-bordered focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600" required />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-success text-xl">Login</button>
                    </div>
                    {/* <button className="btn" onClick={handleSignInWithGoogle}>Sign in with google</button>
                    <button className="btn" onClick={handleSignInWithGithub}>Sign in with Github</button> */}
                </form>

                {/* ____________Sign in with social account______________ */}

                <div data-aos="fade-up" data-aos-duration="2000"
                    className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-xl dark:text-gray-600">Sign in with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4 ">
                    <button data-aos="fade-right" data-aos-duration="2000" onClick={handleSignInWithGoogle} aria-label="Log in with Google" className="p-3 rounded-sm ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-10 h-10 fill-blue-500">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                </div>

                <p className="text-center mt-4 text-xl">Dont have an account? <Link to='/register' className="text-blue-600 font-bold">Register</Link></p>
            </div>

        </div>
    );
};

export default Login;