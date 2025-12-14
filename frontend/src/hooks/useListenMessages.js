import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { selectedConversation, setMessages } = useConversation();

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage) => {
			// ✅ sirf current open conversation ke messages add karo
			if (
				newMessage.senderId !== selectedConversation?._id &&
				newMessage.receiverId !== selectedConversation?._id
			) {
				return;
			}

			newMessage.shouldShake = true;

			const sound = new Audio(notificationSound);
			sound.play();

			setMessages((prev) => {
				if (!Array.isArray(prev)) return [newMessage];
				return [...prev, newMessage];
			});
		};

		socket.on("newMessage", handleNewMessage);

		return () => socket.off("newMessage", handleNewMessage);
	}, [socket, selectedConversation, setMessages]);
};

export default useListenMessages;
