
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 
      "bg-institute-blue text-white" : 
      "bg-white text-black hover:bg-gray-100";
  };

  return (
    <div className="flex border-b border-gray-200">
      <Link 
        to="/faculty" 
        className={`px-6 py-4 font-medium ${isActive("/faculty")}`}
      >
        HOME
      </Link>
      <Link 
        to="/faculty/notification" 
        className={`px-6 py-4 font-medium ${isActive("/faculty/notification")}`}
      >
        Notification
      </Link>
      <Link 
        to="/faculty/requests" 
        className={`px-6 py-4 font-medium ${isActive("/faculty/requests")}`}
      >
        Requests To HOD
      </Link>
    </div>
  );
};

export default Navigation;
