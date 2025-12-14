import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		if (!message || !selectedConversation?._id) return;

		setLoading(true);
		try {
			const data = await apiFetch(
				`/api/messages/send/${selectedConversation._id}`,
				{
					method: "POST",
					body: JSON.stringify({ message }),
				}
			);

			// ✅ safe state update
			setMessages((prev) => {
	if (!Array.isArray(prev)) return [data];
	return [...prev, data];
});

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
