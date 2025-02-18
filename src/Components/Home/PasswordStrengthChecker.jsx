import { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score === 5) return "Very Strong";
    if (score === 4) return "Strong";
    if (score === 3) return "Medium";
    if (score === 2) return "Weak";
    return "Very Weak";
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkStrength(newPassword));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Password Strength Checker</h2>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        className="w-96 p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
      />
      <p className={`mt-4 text-lg font-semibold ${
        strength === "Very Strong" ? "text-green-500" :
        strength === "Strong" ? "text-green-400" :
        strength === "Medium" ? "text-yellow-400" :
        strength === "Weak" ? "text-orange-400" : "text-red-500"
      }`}>
        Strength: {strength}
      </p>
    </div>
  );
};

export default PasswordStrengthChecker;
