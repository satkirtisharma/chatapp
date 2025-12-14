import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { apiFetch } from "../utils/api";

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
			const data = await apiFetch("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({ username, password }),
			});

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
