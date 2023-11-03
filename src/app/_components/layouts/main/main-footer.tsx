import { Copyright } from '@/lib/ui/components';

export function MainFooter() {
  return (
    <footer className="flex flex-col gap-1 py-1">
      <hr className="w-full border-gray-200 sm:mx-auto dark:border-gray-700" />
      <Copyright className="text-center" />
    </footer>
  );
}
