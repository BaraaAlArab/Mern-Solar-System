import {Sidebar, SidebarItem} from "flowbite-react";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiHome,
  HiOutlinePlus,
} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {Logout} from "../../redux/user/userSlice";

function DashSideBar() {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/Server/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(Logout());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=Dashboard">
              <Sidebar.Item
                active={tab === "Dashboard" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/Dashboard?tab=DashProfile">
            <Sidebar.Item
              active={tab === "DashProfile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/Dashboard?tab=DashPost">
              <Sidebar.Item
                active={tab === "DashPost"}
                icon={HiDocumentText}
                as="div"
              >
                posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=DashUser">
              <SidebarItem
                active={tab === "DashUser"}
                as="div"
                icon={HiOutlineUserGroup}
              >
                Users
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=Feedback">
              <SidebarItem
                active={tab === "Feedback"}
                as="div"
                icon={HiAnnotation}
              >
                feedback
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/Dashboard?tab=CreatePost">
              <SidebarItem
                active={tab === "CreatePost"}
                as="div"
                icon={HiOutlinePlus}
              >
                Create Post
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/?tab=Home">
              <SidebarItem active={tab === "Home"} as="div" icon={HiHome}>
                Home
              </SidebarItem>
            </Link>
          )}
          <Sidebar.Item
            onClick={handleSignout}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSideBar;
