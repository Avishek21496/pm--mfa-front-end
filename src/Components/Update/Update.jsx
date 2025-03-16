import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../Constants/url";

const Update = () => {
  const { user, setReload } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const loadedItem = useLoaderData();
  const {
    _id,
    platform_name,
    platform_owner,
    platform_password,
    platform_email,
  } = loadedItem;

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
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

    const updateInfo = {
      user_name,
      user_email,
      platform_name,
      platform_owner,
      platform_email,
      platform_password,
    };

    console.log(updateInfo);
    fetch(`${SERVER_URL}/updateCredentials/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`, // ✅ Include token
      },
      body: JSON.stringify(updateInfo),
    })
    .then((res) => {
      if (!res.ok) {
        // ✅ Handle potential errors
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
      .then((data) => {
        if (data.modifiedCount > 0) {
          setReload(true);
          setLoading(false);
          toast.success("Your information has been successfully updated.", {
            duration: 3000,
          });
        } else {
          setLoading(false);
          toast.info("No changes were made.", { duration: 3000 }); // Optional: Notify user if nothing was updated
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  };

  return (
    // <div>

    <section className="p-3 border-2">
      <form
        onSubmit={handleUpdate}
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-6">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="firstname" className="text-sm">
                Platform
              </label>
              <input
                id="firstname"
                type="text"
                defaultValue={platform_name}
                name="platform"
                placeholder="Enter Platform Name"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 p-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                Email
              </label>
              <input
                id="lastname"
                name="owner"
                defaultValue={platform_email}
                type="text"
                placeholder="Enter the owner Name"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 p-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                Owner
              </label>
              <input
                id="lastname"
                name="email"
                defaultValue={platform_owner}
                type="text"
                placeholder="Enter email address"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 p-2"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastname" className="text-sm">
                password
              </label>
              <input
                id="lastname"
                name="password"
                defaultValue={platform_password}
                type="text"
                placeholder="Enter password"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 p-2"
              />
            </div>
            <div className=" col-span-full">
              {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <button
                  className="btn btn-info border-2 w-full border-red-800"
                  type="submit"
                >
                  Update Credentials
                </button>
              )}
            </div>
          </div>
        </fieldset>
      </form>
    </section>
    // </div>
  );
};

export default Update;
