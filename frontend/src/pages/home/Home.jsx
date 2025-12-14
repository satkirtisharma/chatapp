import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className="h-screen flex flex-col md:flex-row rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
			
			{/* Sidebar */}
			<div className="w-full md:w-72">
				<Sidebar />
			</div>

			{/* Chat Area */}
			<div className="flex-1 w-full">
				<MessageContainer />
			</div>

		</div>
	);
};

export default Home;
