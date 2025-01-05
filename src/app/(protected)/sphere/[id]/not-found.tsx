import { NotFoundIllusstration } from '@/components/illutstration/not-found';

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center text-muted-foreground">
      <div className="flex flex-col items-center gap-2">
        <NotFoundIllusstration />
        <h2 className="mt-4 text-lg font-semibold">404 Not Found</h2>
        <p className="text-sm">Could not find the requested sphere.</p>
      </div>
    </main>
  );
}
