const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiFetch = async (endpoint, options = {}) => {
	try {
		const res = await fetch(`${BASE_URL}${endpoint}`, {
			...options, // ⬅️ pehle options
			credentials: "include", // ⬅️ LAST me so override na ho
			headers: {
				"Content-Type": "application/json",
				...(options.headers || {}),
			},
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.error || "Something went wrong");
		}

		return data;
	} catch (error) {
		throw error;
	}
};
