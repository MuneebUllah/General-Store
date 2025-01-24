import React, { useState, useEffect } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarClosed, setSideBarOpened } from "../redux/slices/userSlice";
import { PiBellBold } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa6";
import { colors } from "../helpers/constants";
import useComponentVisible from "../helpers/hooks/click-outside-hook";
import { useNavigate } from "react-router-dom";

const getObjectFromLocalStorage = (key) => {
  try {
    const serializedObj = localStorage.getItem(key);
    if (serializedObj === null) return null;
    return JSON.parse(serializedObj);
  } catch (e) {
    console.error('Error retrieving from localStorage', e);
    return null;
  }
};

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSidebarExpanded, name, email, image } = useSelector((state) => state.user);
  const {
    isComponentVisible: isNotificationVisible,
    ref: notificationRef,
    setIsComponentVisible: setIsNotificationComponentVisible,
  } = useComponentVisible(false);
  const {
    isComponentVisible: profileDropDownOpend,
    ref: profileDropdownRef,
    setIsComponentVisible: setProfileDropdownOpened,
  } = useComponentVisible(false);

  const handleExpandSidebar = () => {
    if (isSidebarExpanded) {
      dispatch(setSideBarClosed());
    } else {
      dispatch(setSideBarOpened());
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const storedUser = getObjectFromLocalStorage('adminDetail');
    if (storedUser) {
      setUser(storedUser);
      setProfileImage(storedUser.image);
    }
  }, []);

  useEffect(() => {
    if (image) {
      setProfileImage(image);
    }
  }, [image]);

  return (
    <div className="h-20 bg-white w-full flex flex-row justify-between items-center">
      <div className="flex gap-4">
      <div className="px-5">
        <HiMiniBars3
          size={30}
          color="#000000"
          className="cursor-pointer"
          onClick={handleExpandSidebar}
        />
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Hello, Mansoor 👋</h1>
      </div>
      </div>
      <div className="px-5 flex flex-row gap-4">
        <div className="relative">
          <div
            className="border border-[#E2E8F0] rounded-md p-3 relative cursor-pointer"
            onClick={() => {
              setIsNotificationComponentVisible(!isNotificationVisible);
            }}
          >
            <div className="relative">
              <div className="absolute bottom-auto left-auto -right-1 -top-1.5 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-[#E4774F] px-2 py-[5px] text-center align-baseline text-xs font-bold leading-none text-white">
                1
              </div>
              <PiBellBold size={28} color="#808D9E" />
            </div>
          </div>
          {isNotificationVisible && (
            <div
              ref={notificationRef}
              className="absolute z-10 top-[3.5rem] right-1 h-40 w-96 bg-white rounded-md shadow flex flex-col border border-[#94A3B8]"
            >
              <div className=" w-full h-[60%] flex flex-row items-center px-4">
                <img
                  src={'https://picsum.photos/200'}
                  className="w-12 h-12 rounded-full"
                  alt="avatar"
                />
                <div className=" px-3 flex flex-col gap-1">
                  <h1 className="text-[#64748B] font-medium inter text-sm">
                    Jake AJ, Posted a new Reel !!
                  </h1>
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-[#64748B] font-medium inter text-xs">
                      Feb 26, 2024 12:02 PM
                    </p>
                    <button className="bg-[#ff774f4a] px-3 py-1 rounded-full text-[#E4774F] font-semibold inter text-[10px]"
                      onClick={() => {
                        setIsNotificationComponentVisible(false)
                        navigate("/users/actions");
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
              <hr className="bg-[#d9d9d957] h-[1.7px] w-3/4 self-center" />
              <button
                onClick={() => {
                  setIsNotificationComponentVisible(false)
                  navigate("/dashboard/notifications");
                }}
                className="bg-[#2E4D55] px-14 py-2 rounded-full text-white font-semibold inter text-xs m-auto"
              >
                View All
              </button>
            </div>
          )}
        </div>

        <div
          className="border border-[#E2E8F0] rounded-md p-3 flex flex-row justify-center items-center gap-4 relative cursor-pointer select-none"
          onClick={() => {
            setProfileDropdownOpened(!profileDropDownOpend);
          }}
        >
          <img
            src={profileImage}
            className="w-8 h-8 rounded-full"
            alt="avatar"
          />
          <h5 className={`text-[#2E4D55] text-base font-semibold`}>
            {
              name || user?.username || "User"
            }
          </h5>
          <FaAngleDown size={20} color={colors.primary} />
        </div>
        {profileDropDownOpend && (
          <div
            ref={profileDropdownRef}
            className="absolute z-10 top-[4.5rem] right-6 h-48 w-56 bg-white rounded-md shadow flex flex-col justify-evenly p-3 "
          >
            <p className="inter font-semibold text-sm text-[#1C1C27] ps-2 cursor-pointer"
              onClick={() => {
                setProfileDropdownOpened(false)
                navigate("/dashboard/profile");
              }}
            >
              Profile
            </p>
            <hr className="bg-[#E2E8F0] h-[1.7px]" />
            <p onClick={() => {
              setProfileDropdownOpened(false)
              navigate('/dashboard/setting')
            }} className="inter font-semibold text-sm text-[#1C1C27] ps-2 cursor-pointer">
              Settings
            </p>
            <hr className="bg-[#E2E8F0] h-[1.7px]" />
            <p className="inter font-semibold text-sm text-[#FF0000] ps-2 cursor-pointer " onClick={logout}>
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;