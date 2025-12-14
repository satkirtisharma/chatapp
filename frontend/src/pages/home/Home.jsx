import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div
			className="
				h-screen 
				flex flex-col md:flex-row 
				rounded-lg 
				overflow-hidden 
				overscroll-none
				bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0
			"
		>
			{/* ===== Sidebar ===== */}
			<div className="w-full md:w-72 h-full overflow-y-auto border-b md:border-b-0 md:border-r border-slate-500">
				<Sidebar />
			</div>

			{/* ===== Chat Area ===== */}
			<div className="flex-1 w-full h-full overflow-hidden">
				<MessageContainer />
			</div>
		</div>
	);
};

export default Home;
