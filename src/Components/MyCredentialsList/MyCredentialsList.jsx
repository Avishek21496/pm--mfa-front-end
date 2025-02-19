import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../Constants/url";

const MyCredentialsList = () => {
  const { user } = useContext(AuthContext);
  const [reload, setReload] = useState(true);

  const [loading, setLoading] = useState(false);

  // pasword state
  const [savedPasswords, setSavedPasswords] = useState([]);

  // ----------------------------PAsswords api----------------------------------------------
  useEffect(() => {
    setLoading(true);
    fetch(`${SERVER_URL}/myCredentials/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setSavedPasswords(data);
        setLoading(false);
      });
  }, [reload, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${SERVER_URL}/deletePlatformCredentials/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setReload(!reload);
              Swal.fire({
                title: "Deleted!",
                text: "Your saved password has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="p-5 bg-white">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          <h4>Here are ally of my saved passwords</h4>
          {savedPasswords.map((savedPassword, index) => (
            <div key={index}>
              <ul className="p-2 border-2 border-red-300">
                <li>Platform name: {savedPassword.platform_name}</li>
                <li>Platform owner: {savedPassword.platform_owner}</li>
                <li>Platform email: {savedPassword.platform_email}</li>
                <li>Platform password: {savedPassword.platform_password}</li>
              </ul>
              <div className="flex flex-wrap justify-between">
                <div className="space-x-2">
                  <Link to={`/update/${savedPassword._id}`}>
                    <button className="btn btn-success">Update</button>
                  </Link>
                </div>
                <div className="flex space-x-2 text-sm ">
                  <button
                    onClick={() => handleDelete(savedPassword._id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCredentialsList;
