export type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  google: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      ></path>
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      ></path>
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      ></path>
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      ></path>
      <path d="M1 1h22v22H1z" fill="none"></path>
    </svg>
  ),
  gridPattern: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1384"
      height="986"
      viewBox="0 0 1384 986"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M523 986V846H262V932H261V846H132V932H131V846H1.00011L1.00012 932H5.81741e-05L0 846V845V754V753V661V660V568V567V475V474V382V381V289V288V196V195V108H1.00006L1.00006 195H131V108H132V195H261V108H262V195H412V194H413V195H523V103H0V102H523V0H524V102H805V54H806V102H1384V103H806V195H915V194H916V195H1046V108H1047V195H1177V108H1178V195H1308V108H1309V195H1383V108H1384V195V196V288V289V381V382V474V475V567V568V660V661V753V754V845V846V932H1383V846H1309V932H1308V846H1178V932H1177V846H1047V932H1046V846H806V986H805V846H524V986H523ZM1383 845V754H1309V845H1383ZM1383 753V661H1309V753H1383ZM1383 660V568H1309V660H1383ZM1383 567V475H1309V567H1383ZM1383 474V382H1309V474H1383ZM1383 381V289H1309V381H1383ZM1383 288V196H1309V288H1383ZM1178 196H1308V288H1178V196ZM1178 289H1308V381H1178V289ZM1178 382H1308V474H1178V382ZM1178 475H1308V567H1178V475ZM1178 568H1308V660H1178V568ZM1178 661H1308V753H1178V661ZM1178 754H1308V845H1178V754ZM1177 845V754H1047V845H1177ZM1177 753V661H1047V753H1177ZM1177 660V568H1047V660H1177ZM1177 567V475H1047V567H1177ZM1177 474V382H1047V474H1177ZM1177 381V289H1047V381H1177ZM1177 288V196H1047V288H1177ZM916 196H1046V288H916V196ZM916 289H1046V381H916V289ZM916 382H1046V474H916V382ZM916 475H1046V567H916L916 475ZM916 568H1046V660H916V568ZM916 661H1046V753H916V661ZM916 754H1046V845H916V754ZM915 845V754H806V845H915ZM915 753V661H806V753H915ZM915 660V568H806V660H915ZM915 567L915 475H806L806 567H915ZM915 474V382H806V474H915ZM915 381V289H806V381H915ZM915 288V196H806V288H915ZM524 103H805V195H655V194H654V195H524V103ZM655 196H805V288H655V196ZM655 289H805V381H655V289ZM655 382H805V474H655V382ZM655 475H805L805 567H655L655 475ZM655 568H805V660H655V568ZM655 661H805V753H655V661ZM655 754H805V845H655V754ZM654 845V754H524V845H654ZM654 753V661H524V753H654ZM654 660V568H524V660H654ZM654 567L654 475H524L524 567H654ZM654 474V382H524V474H654ZM654 381V289H524V381H654ZM654 288V196H524V288H654ZM523 754V845H413V754H523ZM523 661V753H413V661H523ZM523 568V660H413V568H523ZM523 475L523 567H413L413 475H523ZM523 382V474H413V382H523ZM523 289V381H413V289H523ZM523 196V288H413V196H523ZM412 845V754H262V845H412ZM412 753V661H262L262 753H412ZM412 660V568H262V660H412ZM412 567L412 475H262V567H412ZM412 474V382H262V474H412ZM412 381V289H262L262 381H412ZM412 288V196H262V288H412ZM132 196H261V288H132L132 196ZM132 289H261L261 381H132V289ZM132 382H261V474H132L132 382ZM132 475H261V567H132V475ZM132 568H261V660H132L132 568ZM132 661H261L261 753H132V661ZM132 754H261V845H132L132 754ZM131 196H1.00006L1.00007 288H131L131 196ZM131 289H1.00007L1.00008 381H131V289ZM131 382H1.00008L1.00008 474H131L131 382ZM131 475H1.00008L1.00009 567H131V475ZM131 568H1.00009L1.0001 660H131L131 568ZM131 661H1.0001L1.0001 753H131V661ZM131 754H1.0001L1.00011 845H131L131 754Z"
        fill="gray"
        fillOpacity="0.2"
      />
      <rect x="1289" y="381" width="38" height="1" fill="green" />
      <rect
        x="413"
        y="218"
        width="97"
        height="0.999996"
        transform="rotate(90 413 218)"
        fill="green"
      />
      <rect
        x="1178"
        y="878"
        width="50"
        height="0.999998"
        transform="rotate(90 1178 878)"
        fill="green"
      />
      <rect
        x="523.5"
        y="195.5"
        width="131"
        height="93"
        fill="url(#paint4_linear_17150_72673)"
        stroke="#F1F5FD"
      />
      <rect
        x="261.5"
        y="381.5"
        width="151"
        height="93"
        fill="url(#paint5_linear_17150_72673)"
        stroke="#F1F5FD"
      />
      <rect
        x="654.5"
        y="660.5"
        width="151"
        height="93"
        fill="url(#paint6_linear_17150_72673)"
        stroke="#F1F5FD"
      />
      <rect
        x="412.5"
        y="753.5"
        width="111"
        height="92"
        fill="url(#paint7_linear_17150_72673)"
        stroke="#F1F5FD"
      />
      <rect
        x="1046.5"
        y="567.5"
        width="131"
        height="93"
        fill="url(#paint8_linear_17150_72673)"
        stroke="#F1F5FD"
      />
      <rect
        x="12"
        y="753"
        width="75"
        height="1"
        fill="url(#paint9_linear_17150_72673)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_17150_72673"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(692 493) rotate(-90) scale(493 1097.32)"
        >
          <stop stopColor="green" />
          <stop offset="1" stopColor="green" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_17150_72673"
          x1="1327"
          y1="381.5"
          x2="1289"
          y2="381.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="darkgreen" stopOpacity="0" />
          <stop offset="0.501679" stopColor="darkgreen" />
          <stop offset="1" stopColor="darkgreen" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_17150_72673"
          x1="510"
          y1="218.5"
          x2="413"
          y2="218.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="darkgreen" stopOpacity="0" />
          <stop offset="0.501679" stopColor="darkgreen" />
          <stop offset="1" stopColor="darkgreen" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_17150_72673"
          x1="1228"
          y1="878.5"
          x2="1178"
          y2="878.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="darkgreen" stopOpacity="0" />
          <stop offset="0.501679" stopColor="darkgreen" />
          <stop offset="1" stopColor="darkgreen" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_17150_72673"
          x1="589"
          y1="195"
          x2="589"
          y2="289"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="green" stopOpacity="0.04" />
          <stop offset="1" stopColor="green" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_17150_72673"
          x1="337"
          y1="381"
          x2="337"
          y2="475"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="green" stopOpacity="0.04" />
          <stop offset="1" stopColor="green" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_17150_72673"
          x1="730"
          y1="660"
          x2="730"
          y2="754"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="green" stopOpacity="0.04" />
          <stop offset="1" stopColor="green" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_17150_72673"
          x1="468"
          y1="753"
          x2="468"
          y2="846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="green" stopOpacity="0.04" />
          <stop offset="1" stopColor="green" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_17150_72673"
          x1="1112"
          y1="567"
          x2="1112"
          y2="661"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="green" stopOpacity="0.04" />
          <stop offset="1" stopColor="green" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_17150_72673"
          x1="87"
          y1="753.5"
          x2="12"
          y2="753.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="darkgreen" stopOpacity="0" />
          <stop offset="0.501679" stopColor="darkgreen" />
          <stop offset="1" stopColor="darkgreen" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
}
