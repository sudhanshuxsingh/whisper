import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  return new ImageResponse(
    (
      <div tw="relative flex rounded-md border bg-opacity-[0.01] bg-[radial-gradient(ellipse_50%_80%_at_20%_40%,rgba(93,52,221,0.1),transparent),radial-gradient(ellipse_50%_80%_at_80%_50%,rgba(120,119,198,0.15),transparent)] before:transition-opacity dark:border-secondary/50 animate-image-rotate before:absolute before:left-0 before:top-0 before:z-[11] before:h-full before:w-full before:bg-hero-glow before:opacity-5 before:[filter:blur(120px)]">
        <p>Whisper</p>
      </div>
    ),

    {
      width: 1200,
      height: 630,
    }
  );
}

function SvgComponent() {
  return (
    <svg
      fill="none"
      preserveAspectRatio="xMinYMin slice"
      viewBox="0 0 1376 718"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full min-w-[1200px]"
    >
      <path
        d="M0 0h1376v670c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V0z"
        fill="url(#paint0_radial_401_76334)"
        opacity={0.5}
      />
      <mask
        height={718}
        id="a"
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
        width={1376}
        x={0}
        y={0}
      >
        <path
          d="M0 0h1376v670c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V0z"
          fill="#fff"
          opacity={0.5}
        />
      </mask>
      <g mask="url(#a)">
        <circle cx={245} cy={192} fill="#F1F5F9" fillOpacity={0.32} r={2} />
        <circle cx={250} cy={249} fill="#F1F5F9" fillOpacity={0.32} r={2} />
        <circle cx={148} cy={333} fill="#F1F5F9" fillOpacity={0.12} r={3} />
        <circle cx={337} cy={362} fill="#F1F5F9" fillOpacity={0.48} r={2} />
        <circle cx={366} cy={116} fill="#F1F5F9" fillOpacity={0.48} r={2} />
        <circle cx={899} cy={188} fill="#F1F5F9" fillOpacity={0.08} r={2} />
        <circle cx={491} cy={401} fill="#F1F5F9" fillOpacity={0.12} r={2} />
        <circle cx={491} cy={401} fill="#F1F5F9" fillOpacity={0.32} r={2} />
        <circle cx={818} cy={154} fill="#F1F5F9" fillOpacity={0.24} r={2} />
        <circle cx={988} cy={393} fill="#F1F5F9" fillOpacity={0.24} r={2} />
        <circle cx={995} cy={475} fill="#F1F5F9" fillOpacity={0.32} r={1} />
        <circle cx={869} cy={414} fill="#F1F5F9" fillOpacity={0.48} r={2} />
        <circle cx={1088} cy={209} fill="#F1F5F9" fillOpacity={0.48} r={2} />
        <circle cx={975} cy={127} fill="#F1F5F9" fillOpacity={0.32} r={1} />
        <circle cx={1259} cy={339} fill="#F1F5F9" fillOpacity={0.12} r={2} />
        <circle cx={1107} cy={525} fill="#F1F5F9" fillOpacity={0.4} r={1} />
        <circle cx={866} cy={484} fill="#F1F5F9" fillOpacity={0.32} r={1} />
        <circle cx={718} cy={428} fill="#F1F5F9" fillOpacity={0.64} r={1} />
        <circle cx={445} cy={479} fill="#F1F5F9" fillOpacity={0.72} r={1} />
        <circle cx={384} cy={453} fill="#F1F5F9" fillOpacity={0.16} r={2} />
        <circle cx={183} cy={498} fill="#F1F5F9" fillOpacity={0.32} r={1} />
        <circle cx={299} cy={409} fill="#F1F5F9" fillOpacity={0.24} r={1} />
        <g filter="url(#filter0_f_401_76334)">
          <path
            d="M1433.72 442.763a12.272 12.272 0 00-13.04-1.568 12.323 12.323 0 00-7.02 11.129v98.57H983.296c-6.791 0-12.296 5.516-12.296 12.321v98.57c0 6.805 5.505 12.321 12.296 12.321h430.364v98.57c0 4.755 2.73 9.086 7.02 11.129a12.272 12.272 0 0013.04-1.568l196.74-160.176a12.338 12.338 0 000-19.122l-196.74-160.176z"
            fill="url(#paint1_linear_401_76334)"
          />
        </g>
        <g filter="url(#filter1_f_401_76334)">
          <path
            clipRule="evenodd"
            d="M371-65l461 369-284 58L371-65z"
            fill="url(#paint2_linear_401_76334)"
            fillRule="evenodd"
          />
        </g>
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={616.828}
          id="filter0_f_401_76334"
          width={935.828}
          x={835.086}
          y={304.086}
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_76334"
            stdDeviation={67.957}
          />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={698.828}
          id="filter1_f_401_76334"
          width={732.828}
          x={235.086}
          y={-200.914}
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_76334"
            stdDeviation={67.957}
          />
        </filter>
        <radialGradient
          cx={0}
          cy={0}
          gradientTransform="matrix(0 -877.183 1681.06 0 688 918)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_401_76334"
          r={1}
        >
          <stop stopColor="var(--brand-gradient-radial-light)" />
          <stop
            offset={0.223497}
            stopColor="var(--brand-gradient-radial-dark)"
          />
          <stop
            offset={1}
            stopColor="var(--brand-gradient-radial-stop-color)"
            stopOpacity={0.01}
          />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_401_76334"
          x1={264.422}
          x2={386.568}
          y1={61.9859}
          y2={432.799}
        >
          <stop stopColor="var(--brand-gradient-hero-triangle-start)" />
          <stop
            offset={1}
            stopColor="var(--brand-gradient-hero-triangle-stop)"
          />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_401_76334"
          x1={974.464}
          x2={986.754}
          y1={494.676}
          y2={790.36}
        >
          <stop stopColor="var(--brand-gradient-hero-arrow-start)" />
          <stop offset={1} stopColor="var(--brand-gradient-hero-arrow-stop)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgComponent;
