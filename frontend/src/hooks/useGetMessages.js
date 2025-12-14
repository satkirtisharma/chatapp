import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation?._id) return;

			setLoading(true);
			try {
				const data = await apiFetch(
					`/api/messages/${selectedConversation._id}`
				);

				// 🔥 IMPORTANT FIX: messages hamesha array hi rahe
				if (Array.isArray(data)) {
					setMessages(data);
				} else {
					setMessages([]);
				}
			} catch (error) {
				toast.error(error.message);
				setMessages([]); // safety
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};

export default useGetMessages;
