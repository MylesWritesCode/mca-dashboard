/**
 * Story config object
 */
import { FaHome, FaBuilding, FaUserMinus, FaUserPlus, FaUserFriends } from "react-icons/fa";
import { IoIosSettings } from 'react-icons/io'

export const MENU_ITEMS = [
  {
    name: "Home",
    url: "/",
    icon: FaHome,
    items: [],
  },
  {
    name: "Organization",
    url: "/",
    icon: FaBuilding,
    items: [
      {
        name: "Create account",
        url: "/auth/create-account",
        icon: FaUserPlus,
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
