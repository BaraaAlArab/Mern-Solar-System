import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Dash_Sidebar from "../Component/Dash_Sidebar";
import DashProfile from "../Component/DashProfile";
import DashPost from "../Component/DashPost";
import DashUser from "../Component/DashUser";
import Feedback from "../Component/Feedback";
import CreatePost from "../pages/CreatePost";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <Dash_Sidebar />
      </div>
      <div className="flex-1">
        {tab === "DashProfile" && <DashProfile />}

        {tab === "DashPost" && <DashPost />}

        {tab === "DashUser" && <DashUser />}

        {tab === "Feedback" && <Feedback />}

        {tab === "CreatePost" && <CreatePost />}
      </div>
    </div>
  );
}
