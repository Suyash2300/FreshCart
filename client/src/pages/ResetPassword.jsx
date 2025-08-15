import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { axios } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/reset-password/${token}`, {
        password,
      });
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-500 text-white px-4 py-2">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
