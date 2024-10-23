/* eslint-disable react-hooks/exhaustive-deps */

import { type ChangeEvent, type DragEvent, useCallback } from "react";
import FileUpload from "./FileUpload";
import { Trash2 as DeleteIcon } from "lucide-react";
import useFileUpload from "./FileUpload/useFileUpload";

export default function MultipleFileUpload() {
  const { files, addFiles, deleteFile, convertListToArray } = useFileUpload();

  const onSubmit = useCallback(() => {}, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = convertListToArray(event.target.files);
      addFiles(uploadedFiles);
    }
  }, []);

  const onDrop = useCallback((event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const uploadedFiles = convertListToArray(event.dataTransfer.files);
      addFiles(uploadedFiles);
    }
  }, []);

  const onDelete = useCallback((file: File) => () => deleteFile(file), []);

  return (
    <FileUpload onSubmit={onSubmit}>
      <FileUpload.DropZone
        multiple
        onChange={onChange}
        onDrag={(event) => event.preventDefault()}
        onDrop={onDrop}
        onInvalid={console.log}
        accept="image/*, .pdf"
      />
      {files.length > 0 ? (
        <FileUpload.Preview>
          {files.map((file) => (
            <FileUpload.PreviewItem key={file.name} file={file}>
              <FileUpload.PreviewTrigger as={<DeleteIcon onClick={onDelete(file)} />} />
            </FileUpload.PreviewItem>
          ))}
        </FileUpload.Preview>
      ) : null}
      <button>업로드</button>
    </FileUpload>
  );
}
