import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../assets/images/logo.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { handleError, handleSuccess } from "../utils/utils.jsx";
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API_BASEURL;

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(formData);

		try {
			const response = await fetch(`${apiUrl}/auth/user/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			setLoading(false);
			if (response.ok) {
					localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("name", data.user.name);
				dispatch(
          loginSuccess({
            token: data.token,
            userId: data.user._id,
          })
        );
			handleSuccess(data.message);

				navigate('/');
			} else {
				handleError(data.message || "Invalid email or password");
			}
		} catch (error) {
			setLoading(false);
			console.error('Error:', error);
			handleError(error.message || "An error occurred while logging in");
		}
	};

	return (
    <div className="flex justify-center items-center min-h-screen px-4 font-serif">
      <div className="relative flex flex-col rounded-xl bg-white shadow-lg p-6 w-full max-w-md">
        <img
          src={logo}
          className="w-10 m-auto mb-3"
          style={{
            filter:
              "invert(6%) sepia(95%) saturate(6097%) hue-rotate(307deg) brightness(60%) contrast(102%)",
          }}
          alt=""
        />
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login to your account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Don't have an account yet? <a className="text-fuchsia-900" href="/signup">
          SignUp
          </a>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="sairabatool787@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Mi40mwoL"
                required
              />
              <button
                type="button"
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-fuchsia-900  hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;