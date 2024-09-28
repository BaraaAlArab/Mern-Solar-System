import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Dash_Sidebar from "../Component/Dash_Sidebar";
import DashProfile from "../Component/DashProfile";
import DashPost from "../Component/DashPost";
import DashUser from "../Component/DashUser";
import DashFeedback from "../Component/DashFeedback";

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
        {/* Sidebar */}
        <Dash_Sidebar />
      </div>
      {/* profile... */}
      {tab === "DashPost" && <DashProfile />}
      {/* posts... */}
      {tab === "DashPost" && <DashPost />}
      {/* users */}
      {tab === "DashUser" && <DashUser />}
      {/* comments  */}
      {tab === "DashFeedback" && <DashFeedback />}
      {/* dashboard comp */}
    </div>
  );
}
