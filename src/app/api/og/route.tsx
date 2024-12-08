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
