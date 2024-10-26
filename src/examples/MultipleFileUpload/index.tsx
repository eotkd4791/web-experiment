/* eslint-disable react-hooks/exhaustive-deps */

import { type ChangeEvent, type DragEvent, useCallback } from "react";
import FileUpload from "./FileUpload";
import { Trash2 as DeleteIcon } from "lucide-react";
import useFileUpload from "./FileUpload/useFileUpload";

export default function MultipleFileUpload() {
  const { files, convertListToArray, addFiles, deleteFile } = useFileUpload();

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const uploadedFiles = convertListToArray(files);
      addFiles(uploadedFiles);
    }
  }, []);

  const onSubmit = useCallback(() => {
    // 업로드 API 호출 로직
  }, []);

  const onDrop = useCallback((event: DragEvent<HTMLInputElement>) => {
    const { files } = event.dataTransfer;
    if (files) {
      const uploadedFiles = convertListToArray(files);
      addFiles(uploadedFiles);
    }
  }, []);

  const onDelete = useCallback((file: File) => () => deleteFile(file), []);

  return (
    <FileUpload onSubmit={onSubmit}>
      <FileUpload.Box multiple onChange={onChange} onDrop={onDrop} onInvalid={console.log} accept="image/*, .pdf" />
      {files.length > 0 ? (
        <FileUpload.Preview>
          {files.map((file) => (
            <FileUpload.PreviewItem key={file.name} file={file} w={64} h={64}>
              <FileUpload.PreviewTrigger as={<DeleteIcon onClick={onDelete(file)} />} />
            </FileUpload.PreviewItem>
          ))}
        </FileUpload.Preview>
      ) : null}
      <FileUpload.Action>
        <button>업로드</button>
      </FileUpload.Action>
    </FileUpload>
  );
}
