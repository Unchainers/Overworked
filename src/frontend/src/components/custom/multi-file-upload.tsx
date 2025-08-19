import Uppy from "@uppy/core";
import { Dashboard, useUppyEvent } from "@uppy/react";
import DropTarget from "@uppy/drop-target";
import DragDrop from "@uppy/drag-drop";

import "@uppy/core/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";
import { useState } from "react";

export default function MultiFileUpload({
  // target,
  onFileAdd,
  onFileRemove,
}: {
  // target: string;
  onFileAdd: (file: File | Blob) => any;
  onFileRemove: (file: File | Blob) => any;
}) {
  const uppy = new Uppy({
    autoProceed: false,
  });
  // .use(DragDrop, { target });

  const [numberOfFiles, setNumberOfFiles] = useState<number>(0);
  const [totalFileSize, setTotalFileSize] = useState<number>(0);

  const syncFileData = () => {
    let files = uppy.getFiles();
    setNumberOfFiles(files.length);

    let totalSize = 0;
    files.forEach((file) => {
      totalSize += file.size ?? 0;
    });
    setTotalFileSize(totalSize);
  };

  useUppyEvent(uppy, "file-added", (file) => {
    syncFileData();
    onFileAdd(file.data);
  });

  useUppyEvent(uppy, "file-removed", (file) => {
    syncFileData();
    onFileRemove(file.data);
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
      <Dashboard uppy={uppy} hideUploadButton />

      {/* Metadata */}
      <div className="flex w-full flex-row items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Total Size: {totalFileSize}
        </p>
        <p className="text-muted-foreground text-sm">
          File Count: {numberOfFiles}
        </p>
      </div>
    </div>
  );
}
