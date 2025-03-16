import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import { SERVER_URL } from "../../Constants/url";

export const AddCredentials = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleAddCraft = (e) => {
    setLoading(true);
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const platform_name = form.get("platform");
    const platform_owner = form.get("owner");
    const platform_email = form.get("email");
    const platform_password = form.get("password");
    const user_email = user.email;
    const user_name = user.displayName;

    if (
      !platform_name ||
      !platform_owner ||
      !platform_email ||
      !platform_password
    ) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    const savedPlatform = {
      user_name,
      user_email,
      platform_name,
      platform_owner,
      platform_email,
      platform_password,
    };
    fetch(`${SERVER_URL}/saveCredentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")} `
      },
      body: JSON.stringify(savedPlatform),
    })
    .then((res) => {
      if (!res.ok) {
        // ✅ Handle potential errors
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
      .then((data) => {
        if (data.insertedId) {
          setLoading(false);
          toast.success("Your credentials have been added successfully");
          e.target.reset();
        }
        console.log("Response Data:", data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  };
  return (
    <section className="p-6">
      <form
        onSubmit={handleAddCraft}
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="firstname" className="text-sm">
                Platform
              </label>
              <input
                id="firstname"
                type="text"
                name="platform"
                placeholder="Enter Platform Name"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 text-white p-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                Owner
              </label>
              <input
                id="lastname"
                name="owner"
                type="text"
                placeholder="Enter the owner Name"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 text-white p-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                Email
              </label>
              <input
                id="lastname"
                name="email"
                type="email"
                placeholder="Enter email address"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 text-white p-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                password
              </label>
              <input
                id="lastname"
                name="password"
                type="text"
                placeholder="Enter password"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 text-white p-2"
              />
            </div>
            <div className="col-span-full">
              {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <button
                  className="btn btn-info border-2 w-full border-red-800"
                  type="submit"
                >
                  Save Credentials
                </button>
              )}
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default AddCredentials;
