const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiFetch = async (endpoint, options = {}) => {
	try {
		const res = await fetch(`${BASE_URL}${endpoint}`, {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				...(options.headers || {}),
			},
			...options,
		});

		const text = await res.text();

		// agar backend HTML bhej de (error case)
		try {
			const data = JSON.parse(text);
			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			}
			return data;
		} catch {
			throw new Error("Invalid JSON response from server");
		}
	} catch (error) {
		throw error;
	}
};
