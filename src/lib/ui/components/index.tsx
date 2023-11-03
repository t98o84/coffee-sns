import { makeAppConfig } from '@/lib/config/client';
import { ImageProps } from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { GiCoffeeBeans } from 'react-icons/gi';

export * from '@/lib/ui/components/flowbite';
export * from '@/lib/ui/components/tailwind';
export * from '@/lib/ui/components/layouts';
export * from '@/lib/ui/components/display';
export * from '@/lib/ui/components/navigation';

export interface CoffassIconProps extends Omit<ImageProps, 'src' | 'alt'> {
  width?: ImageProps['width'];
  height?: ImageProps['height'];
}

export function CoffassIcon(props: CoffassIconProps) {
  return (
    <GiCoffeeBeans {...props} />
    // <Image
    //   src="/icon.svg"
    //   alt="coffass icon"
    //   width={100}
    //   height={100}
    //   {...props}
    // />
  );
}

export function Copyright(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  const appConfig = makeAppConfig();
  return (
    <div {...props} className={`text-xs text-gray-500 ${props.className}`}>
      &copy; {new Date().getFullYear()}{' '}
      <a
        href={appConfig.appUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-gray-600 hover:text-gray-800"
      >
        {appConfig.appName}
      </a>
      . All rights reserved.
    </div>
  );
}
