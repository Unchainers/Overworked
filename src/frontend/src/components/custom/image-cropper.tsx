import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

export default function ImageCropper({
  imageSrc,
  aspect,
  onCropComplete,
  style,
}: {
  imageSrc: string | undefined;
  aspect: number;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  style?: Object;
}) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  return (
    <Cropper
      image={imageSrc}
      crop={crop}
      zoom={zoom}
      aspect={aspect}
      onCropChange={setCrop}
      onZoomChange={setZoom}
      onCropComplete={onCropComplete}
      style={style}
      classes={{
        containerClassName: "z-[999] relative",
      }}
      cropShape="round"
      restrictPosition
    />
  );
}
