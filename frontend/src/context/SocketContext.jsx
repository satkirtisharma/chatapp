import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		// 🔥 CONNECT ONLY WHEN USER EXISTS
		if (!authUser?._id) return;

		const socketInstance = io(
			"https://chatapp-backend-5kcb.onrender.com",
			{
				query: { userId: authUser._id },
				withCredentials: true,
				transports: ["websocket"],
			}
		);

		setSocket(socketInstance);

		socketInstance.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
		});

		// 🔥 CLEANUP ONLY ON LOGOUT / UNMOUNT
		return () => {
			socketInstance.disconnect();
			setSocket(null);
		};
	}, [authUser?._id]); // 🔥 VERY IMPORTANT

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
