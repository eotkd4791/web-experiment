import { useCallback, useState } from "react";

export default function useFileUpload() {
  const [files, _setFiles] = useState<File[]>([]);

  const addFiles = useCallback((files: File[]) => {
    _setFiles((previousFiles) => previousFiles.concat(files));
  }, []);

  const deleteFile = useCallback((file: File) => {
    _setFiles((currentFiles) => currentFiles.filter((f) => f.name !== file.name));
  }, []);

  const convertListToArray = useCallback((fileList: FileList) => Array.from(fileList), []);

  return {
    files,
    addFiles,
    deleteFile,
    convertListToArray,
  };
}
