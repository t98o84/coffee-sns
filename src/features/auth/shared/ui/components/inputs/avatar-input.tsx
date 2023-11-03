'use client';

import { Avatar, FileInput } from '@/lib/ui/components';
import { FileInputProps } from 'flowbite-react';
import { FormEvent, useCallback, useState } from 'react';

export interface ImageInputProps extends Partial<FileInputProps> {
  image?: string;
}

export function AvatarInput({ image, ...props }: ImageInputProps) {
  const [img, setImg] = useState<string | undefined>(image);
  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      setImg(image);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImg(reader.result as string);
    };
  }, []);

  return (
    <>
      <div className="flex gap-4">
        <Avatar alt="avatar" img={img} rounded />
        <div className="w-full">
          <FileInput name="avatar" onInput={handleInput} {...props} />
        </div>
      </div>
    </>
  );
}
