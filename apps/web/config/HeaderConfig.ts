import { AiOutlineLogin, AiOutlineLogout, AiFillSetting } from "react-icons/ai";
import { FaGithubSquare, FaLinkedin, FaGlobe, FaTwitterSquare } from "react-icons/fa";

import { HeaderLinks } from "ui/components/Header/Header.types";
import { signIn, signOut } from "next-auth/react";

export const HEADER_CONFIG: Record<"resourceLinks" | "signedIn" | "signedOut", HeaderLinks[]> = {
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
      action: signOut,

    },
  ],
  signedOut: [
    {
      icon: AiOutlineLogin,
      action: signIn,
    },
  ],
};
