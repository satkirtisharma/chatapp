import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	messages: [],

	setSelectedConversation: (selectedConversation) =>
		set({ selectedConversation }),

	// 🔥 SAFE setMessages (never break array)
	setMessages: (updater) =>
		set((state) => {
			// function form: setMessages(prev => ...)
			if (typeof updater === "function") {
				const next = updater(state.messages);
				return { messages: Array.isArray(next) ? next : state.messages };
			}

			// direct value: setMessages([...])
			return {
				messages: Array.isArray(updater) ? updater : state.messages,
			};
		}),
}));

export default useConversation;
