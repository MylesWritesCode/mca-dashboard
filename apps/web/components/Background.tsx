interface BackgroundProps {
  children: React.ReactNode;
}

export default function Background({ ...props }: BackgroundProps) {
  return (
    <svg
      id="visual"
      viewBox="0 0 1280 970"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1">
      <rect x="0" y="0" width="1280" height="970" fill="#dedede"></rect>
      <defs>
        <linearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%">
          <stop offset="20%" stopColor="#715df2" stopOpacity="1"></stop>
          <stop offset="80%" stopColor="#715df2" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad1_1" x1="33.3%" y1="0%" x2="100%" y2="100%">
          <stop offset="20%" stopColor="#715df2" stopOpacity="1"></stop>
          <stop offset="80%" stopColor="#b09cea" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad1_2" x1="33.3%" y1="0%" x2="100%" y2="100%">
          <stop offset="20%" stopColor="#dedede" stopOpacity="1"></stop>
          <stop offset="80%" stopColor="#b09cea" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%">
          <stop offset="20%" stopColor="#715df2" stopOpacity="1"></stop>
          <stop offset="80%" stopColor="#715df2" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_1" x1="0%" y1="0%" x2="66.7%" y2="100%">
          <stop offset="20%" stopColor="#b09cea" stopOpacity="1"></stop>
          <stop offset="80%" stopColor="#715df2" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="grad2_2" x1="0%" y1="0%" x2="66.7%" y2="100%">
          <stop offset="20%" stopColor="#b09cea" stopOpacity="1"></stop>
          <stop offset="80%" stopColor="#dedede" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <g transform="translate(900, 0)">
        <path
          d="M0 441C-74 434.9 -147.9 428.7 -232 401.8C-316.1 375 -410.3 327.3 -445 256.9C-479.6 186.5 -454.8 93.2 -430 0L0 0Z"
          fill="#c9bde4"></path>
        <path
          d="M0 294C-49.3 289.9 -98.6 285.8 -154.7 267.9C-210.7 250 -273.5 218.2 -296.6 171.3C-319.8 124.3 -303.2 62.2 -286.7 0L0 0Z"
          fill="#947cee"></path>
        <path
          d="M0 147C-24.7 145 -49.3 142.9 -77.3 133.9C-105.4 125 -136.8 109.1 -148.3 85.6C-159.9 62.2 -151.6 31.1 -143.3 0L0 0Z"
          fill="#715df2"></path>
      </g>
      <g transform="translate(0, 600)">
        <path
          d="M0 -506C83.2 -475.7 166.4 -445.5 230.5 -399.2C294.6 -353 339.6 -290.7 383.6 -221.5C427.7 -152.3 470.7 -76.1 513.8 0L0 0Z"
          fill="#c9bde4"></path>
        <path
          d="M0 -337.3C55.5 -317.2 110.9 -297 153.7 -266.2C196.4 -235.3 226.4 -193.8 255.8 -147.7C285.1 -101.5 313.8 -50.8 342.5 0L0 0Z"
          fill="#947cee"></path>
        <path
          d="M0 -168.7C27.7 -158.6 55.5 -148.5 76.8 -133.1C98.2 -117.7 113.2 -96.9 127.9 -73.8C142.6 -50.8 156.9 -25.4 171.3 0L0 0Z"
          fill="#715df2"></path>
      </g>
    </svg>
  );
}
