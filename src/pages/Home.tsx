import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
        Welcome to the Event Platform 🎉
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Plan, manage, and attend events with ease!
      </p>
      <div className="flex justify-center gap-8 mt-6">
        <Link to="/dashboard">
          <Button className="px-6 py-3 text-lg cursor-pointer">Go to Dashboard 🚀</Button>
        </Link>

        <Link to="/register">
          <Button className="px-6 py-3 text-lg cursor-pointer">Register here</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
