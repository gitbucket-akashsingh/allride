import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "/src/api/axios.js";

// import InputField from "../components/ui/InputField";
// import PrimaryButton from "../components/ui/PrimaryButton";
// import Card from "../components/ui/Card";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "RIDER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      await api.post("/auth/signup", formData);

      alert("Signup Successful");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Signup Failed");
    }
  };

  return (
    <div
      className="
            min-h-screen
            flex
            justify-center
            items-center
            bg-gray-100
        "
    >
      <Card>
        <div
          className="
                    flex
                    flex-col
                    gap-4
                    w-96
                "
        >
          <h1
            className="
                        text-3xl
                        font-bold
                        text-center
                    "
          >
            Create Account
          </h1>

          <InputField
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            name="fullName"
          />

          <InputField
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />

          <InputField
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />

          <InputField
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            name="phone"
          />

          {/* Role Selection */}

          <div>
            <p
              className="
                            font-medium
                            mb-2
                        "
            >
              Select Role
            </p>

            <div
              className="
                            flex
                            gap-6
                        "
            >
              <label
                className="
                                flex
                                items-center
                                gap-2
                            "
              >
                <input
                  type="radio"
                  name="role"
                  value="RIDER"
                  checked={formData.role === "RIDER"}
                  onChange={handleChange}
                />
                Rider
              </label>

              <label
                className="
                                flex
                                items-center
                                gap-2
                            "
              >
                <input
                  type="radio"
                  name="role"
                  value="DRIVER"
                  checked={formData.role === "DRIVER"}
                  onChange={handleChange}
                />
                Driver
              </label>
            </div>
          </div>

          <PrimaryButton onClick={handleSignup}>Sign Up</PrimaryButton>
        </div>
      </Card>
    </div>
  );
}

export default Signup;
