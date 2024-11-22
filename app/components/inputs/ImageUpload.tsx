"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}
declare global {
  var cloudinary: any;
}
const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <>
      <CldUploadWidget
        onSuccess={(result) => handleUpload(result)}
        uploadPreset="upload_images"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <>
            <div
              onClick={() => open?.()}
              className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            >
              <TbPhotoPlus size={50} />
            </div>
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </>
        )}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
