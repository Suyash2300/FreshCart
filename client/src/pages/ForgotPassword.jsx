import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { axios } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/forgot-password", { email });
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2">Send Link</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
