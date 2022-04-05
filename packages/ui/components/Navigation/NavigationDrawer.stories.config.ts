/**
 * Story config object
 */

import { FaHome } from 'react-icons/fa';

export const items = [
  {
    name: "Home",
    url: "/",
    icon: FaHome,
    items: [],
  },
  {
    name: "Link 1",
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
    ],
  },
  {
    name: "Link 2",
    url: "/",
    icon: "home",
  },
  {
    name: "Link 3",
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
];
