import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const data = await apiFetch("/api/users");

				// 🔥 SAFETY: ensure array
				if (Array.isArray(data)) {
					setConversations(data);
				} else {
					setConversations([]);
				}
			} catch (error) {
				toast.error(error.message);
				setConversations([]); // fallback
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;

