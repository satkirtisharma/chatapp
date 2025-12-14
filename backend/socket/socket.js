import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// HTTP server create
const server = http.createServer(app);

// Socket.io server with proper CORS
const io = new Server(server, {
	cors: {
		origin: [
			"https://chatapp-frontend-opal-six.vercel.app",
			"http://localhost:5173",
		],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// userId -> socketId map
const userSocketMap = {}; // { userId: socketId }

// helper function
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

// socket connection
io.on("connection", (socket) => {
	console.log("✅ User connected:", socket.id);

	const userId = socket.handshake.query.userId;

	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
	}

	// send online users list to everyone
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("❌ User disconnected:", socket.id);

		if (userId) {
			delete userSocketMap[userId];
		}

		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
