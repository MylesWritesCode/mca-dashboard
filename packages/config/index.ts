import {
  FaGithubSquare,
  FaLinkedin,
  FaGlobe,
  FaTwitterSquare,
  FaTwitter,
} from "react-icons/fa";

import { AiOutlineLogin, AiOutlineLogout, AiFillSetting } from "react-icons/ai";

export const APP_CONFIG = {
  header: {
    resourceLinks: [
      {
        icon: FaGithubSquare,
        link: "https://github.com/MylesWritesCode",
      },
      {
        icon: FaLinkedin,
        link: "https://linkedin.com/in/myles-berueda",
      },
      {
        icon: FaGlobe,
        link: "https://themapletree.io",
      },
      {
        icon: FaTwitterSquare,
        link: "https://twitter.com/MylesCodesEmoji",
      },
    ],
    signedIn: [
      {
        icon: AiFillSetting,
        link: "settings",
      },
      {
        icon: AiOutlineLogout,
        link: "signout",
      },
    ],
    signedOut: [
      {
        icon: AiOutlineLogin,
        link: "/signin",
      },
    ],
  },
};

export * from "./placeholders";
