import Container from '@/components/ui/container';
import { Marquee } from '@/components/ui/marquee';
import {
  ActivityLogIcon,
  GearIcon,
  RocketIcon,
  CrumpledPaperIcon,
  FileIcon,
  MixIcon,
  CardStackPlusIcon,
  GlobeIcon,
  LapTimerIcon,
  HandIcon,
  CookieIcon,
  PieChartIcon,
  LayersIcon,
  TransformIcon,
  Share1Icon,
  IconJarLogoIcon,
  ModulzLogoIcon,
  ScissorsIcon,
} from '@radix-ui/react-icons';

const ICON_LIST = [
  {
    icons: [
      {
        icon: <GearIcon className="size-7" />,
      },
      {
        icon: <ActivityLogIcon className="size-7" />,
      },
      {
        icon: <CrumpledPaperIcon className="size-7" />,
      },
      {
        icon: <RocketIcon className="size-7" />,
      },
      {
        icon: <FileIcon className="size-7" />,
      },
      {
        icon: <MixIcon className="size-7" />,
      },
      {
        icon: <CardStackPlusIcon className="size-7" />,
      },
      {
        icon: <GlobeIcon className="size-7" />,
      },
      {
        icon: <LapTimerIcon className="size-7" />,
      },
      {
        icon: <TransformIcon className="size-7" />,
      },
    ],
    className: '[--duration:60s]',
    reverse: true,
  },
  {
    icons: [
      {
        icon: <ScissorsIcon className="size-7" />,
      },
      {
        icon: <LayersIcon className="size-7" />,
      },
      {
        icon: <CrumpledPaperIcon className="size-7" />,
      },
      {
        icon: <RocketIcon className="size-7" />,
      },
      {
        icon: <CookieIcon className="size-7" />,
      },
      {
        icon: <MixIcon className="size-7" />,
      },
      {
        icon: <IconJarLogoIcon className="size-7" />,
      },
      {
        icon: <GlobeIcon className="size-7" />,
      },
      {
        icon: <LapTimerIcon className="size-7" />,
      },
      {
        icon: <ModulzLogoIcon className="size-7" />,
      },
    ],
    className: '[--duration:30s]',
    reverse: false,
  },
  {
    icons: [
      {
        icon: <HandIcon className="size-7" />,
      },
      {
        icon: <PieChartIcon className="size-7" />,
      },
      {
        icon: <CrumpledPaperIcon className="size-7" />,
      },
      {
        icon: <RocketIcon className="size-7" />,
      },
      {
        icon: <CookieIcon className="size-7" />,
      },
      {
        icon: <MixIcon className="size-7" />,
      },
      {
        icon: <LayersIcon className="size-7" />,
      },
      {
        icon: <Share1Icon className="size-7" />,
      },
      {
        icon: <IconJarLogoIcon className="size-7" />,
      },
      {
        icon: <ModulzLogoIcon className="size-7" />,
      },
    ],
    className: '[--duration:50s]',
    reverse: true,
  },
  {
    icons: [
      {
        icon: <CrumpledPaperIcon className="size-7" />,
      },
      {
        icon: <ScissorsIcon className="size-7" />,
      },
      {
        icon: <LayersIcon className="size-7" />,
      },
      {
        icon: <CookieIcon className="size-7" />,
      },
      {
        icon: <RocketIcon className="size-7" />,
      },
      {
        icon: <MixIcon className="size-7" />,
      },
      {
        icon: <IconJarLogoIcon className="size-7" />,
      },
      {
        icon: <GlobeIcon className="size-7" />,
      },
      {
        icon: <ModulzLogoIcon className="size-7" />,
      },
      {
        icon: <LapTimerIcon className="size-7" />,
      },
    ],
    className: '[--duration:60s]',
    reverse: false,
  },
];

export default function FeaturesHero() {
  return (
    <Container className="feature-mask relative mb-24 mt-36 grid max-w-5xl">
      {ICON_LIST.map((row, idx) => (
        <Marquee key={idx} className={row.className} reverse={row.reverse}>
          {row.icons.map((col, idx) => (
            <div
              className="grid size-[5.5rem] shrink-0 place-items-center overflow-hidden rounded-2xl bg-secondary/80 from-transparent p-7 text-center text-muted-foreground after:absolute dark:bg-gradient-to-tr dark:to-[rgba(var(--home-page-gradient-color))] dark:shadow-[inset_0_0.817px_0.817px_0_hsla(0,0%,100%,0.25),inset_0_0.899px_0.899px_0_hsla(0,0%,100%,0.1),inset_0_5.396px_3.598px_0_hsla(0,0%,100%,0.02),inset_0_6.296px_12.592px_0_hsla(0,0%,100%,0.03),0_98.036px_27.882px_0_rgba(0,0,0,0.01),0_62.959px_25.184px_0_rgba(0,0,0,0.05),0_35.077px_21.586px_0_rgba(0,0,0,0.18),0_15.29px_15.29px_0_rgba(0,0,0,0.31),0_3.598px_8.994px_0_rgba(0,0,0,0.36)]"
              key={`col${idx}`}
            >
              {col.icon}
            </div>
          ))}
        </Marquee>
      ))}
      <div className="absolute inset-0 grid place-items-center bg-background/20"></div>
    </Container>
  );
}
