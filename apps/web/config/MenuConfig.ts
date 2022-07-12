/**
 * Story config object
 */
import { AiOutlineBarChart, AiOutlineRadarChart } from "react-icons/ai";
import { FaHome, FaBuilding, FaUserMinus, FaUserPlus, FaUserFriends } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export const MENU_ITEMS = [
  {
    name: "Home",
    url: "/",
    icon: FaHome,
    items: [],
  },
  {
    name: "D3 practice",
    url: "/d3-practice",
    icon: AiOutlineRadarChart,
    items: [
      {
        name: "Bar charts",
        url: "/d3-practice/bar",
        icon: AiOutlineBarChart,
      },
      {
        name: "Settings",
        url: "/organization/settings",
        icon: IoIosSettings,
      },
    ],
  },
  {
    name: "Clients",
    url: "/clients",
    icon: FaUserFriends,
    items: [
      {
        name: "Create client",
        url: "/clients/create",
        icon: FaUserPlus,
      },
    ],
  },
  {
    name: "With sub-links",
    url: "/",
    icon: "home",
    items: [
      {
        name: "Sublink 1",
        url: "/",
        icon: "home",
      },
      {
        name: "Sublink 2",
        url: "/",
        icon: "home",
      },
      {
        name: "Sublink 3",
        url: "/",
        icon: "home",
      },
    ],
  },
  {
    name: "Only top-level",
    url: "/",
    icon: "home",
  },
];
