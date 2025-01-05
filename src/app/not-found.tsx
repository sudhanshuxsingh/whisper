import { NotFoundIllusstration } from '@/components/illutstration/not-found';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center text-muted-foreground">
      <div className="flex flex-col items-center gap-2">
        <NotFoundIllusstration />
        <h2 className="mt-4 text-lg font-semibold">Not Found</h2>
        <p className="text-sm">
          The page you&lsquo;re trying to access does not exist.
        </p>
      </div>
    </main>
  );
}
