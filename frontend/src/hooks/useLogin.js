import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		if (!username || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(`${API_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Login failed");
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;
