import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    signIn,
    signInWithGoogle,
    setLoading,
    otpSent,
    setOtpSent,
    otpLoading,
    setOtpLoading,
  } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  console.log("otp sent", otpSent);
  console.log("email", email);
  console.log("otp", otp);

  const handleResendOTP = async () => {
    setOtpLoading(true);
    await axiosPublic.post("/send-otp", { email: email });
    setOtpLoading(false);
    setOtpSent(true);
    toast.success("OTP sent to your email!", { duration: 4000 });
  };

  const handleSignInWithGoogle = async () => {
    setOtpLoading(true);
    try {
      const result = await signInWithGoogle(); // Wait for Google sign-in to complete
      setEmail(result?.user?.email);
      await axiosPublic.post("/send-otp", { email: result.user.email }); // Wait for OTP request to complete

      setOtpSent(true);
      toast.success("OTP sent to your email!", { duration: 4000 });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Failed to sign in with Google.", { duration: 4000 });
      setLoading(false);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    try {
      const userCredential = await signIn(email, password);
      console.log("User Authenticated:", userCredential.user);

      // Request OTP from Backend
      await axiosPublic.post("/send-otp", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email!", { duration: 4000 });
    } catch (error) {
      toast.error("Invalid Email or Password", { duration: 4000 });
      setLoading(false);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);

    try {
      // Verify OTP with backend
      const otpResponse = await axiosPublic.post("/verify-otp", { email, otp });

      if (otpResponse.data.token) {
        // Store the token if valid
        localStorage.setItem("access-token", otpResponse.data.token);
        toast.success("Login Successful!", { duration: 4000 });
        navigate(location?.state ? location.state : "/");
        setOtpSent(false);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.message);
      toast.error("OTP verification failed.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5">
        <h2
          data-aos="fade-left"
          data-aos-duration="2000"
          className="text-3xl text-center my-10"
        >
          {otpSent ? "Please verify yourself" : " Please Login!"}
        </h2>

        {!otpSent ? (
          <form
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            onSubmit={handleLogin}
            className="lg:w-1/2 md:w-3/4 mx-auto"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your E-mail"
                className="input input-bordered focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your Secret Password"
                name="password"
                className="input input-bordered focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-success text-xl" disabled={otpLoading}>
                {otpLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        ) : (
          // OTP Input UI
          <div className="lg:w-1/2 md:w-3/4 mx-auto text-center text-2xl">
            <h3>Enter 6 digit OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input input-bordered mt-2"
              required
            />
            <button
              className="btn btn-success text-xl m-4"
              onClick={handleVerifyOtp}
              disabled={otpLoading}
            >
              {otpLoading ? (
                <span className="loading loading-spinner text-info loading-lg"></span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}

        {/* Social Login - Google */}
        {otpSent ? (
          <div className="mx-auto text-center">
            <h3 className="text-2xl">Didn't get OTP</h3>
            {otpLoading ? (
              <span className="loading loading-spinner text-info loading-lg"></span>
            ) : (
              <button
                onClick={handleResendOTP}
                className="btn btn-primary text-xl m-4"
              >
                Resend OTP
              </button>
            )}
          </div>
        ) : (
          <div>
            {" "}
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="flex items-center pt-4 space-x-1"
            >
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
              <p className="px-3 text-xl dark:text-gray-600">
                Sign in with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                data-aos="fade-right"
                data-aos-duration="2000"
                onClick={handleSignInWithGoogle}
                aria-label="Log in with Google"
                className="p-3 rounded-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-10 h-10 fill-blue-500"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </button>
            </div>
            <p className="text-center mt-4 text-xl">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold">
                Register
              </Link>
            </p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;