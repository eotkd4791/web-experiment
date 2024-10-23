import {
  type ReactNode,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type PropsWithChildren,
  useEffect,
  useMemo,
} from "react";

type FileUploadProps = FormHTMLAttributes<HTMLFormElement>;
function FileUpload({ children, ...formAttrs }: PropsWithChildren<FileUploadProps>) {
  return <form {...formAttrs}>{children}</form>;
}

type FileUploadDropZoneProps = InputHTMLAttributes<HTMLInputElement>;
function FileUploadDropZone({ ...fileInputAttrs }: FileUploadDropZoneProps) {
  return (
    <label>
      <input type="file" {...fileInputAttrs} />
    </label>
  );
}

function FileUploadPreview({ children }: PropsWithChildren) {
  return <ol>{children}</ol>;
}

type FileUploadPreviewItemProps = {
  file: File;
  w?: number;
  h?: number;
};
function FileUploadPreviewItem({ children, file, w = 64, h = 64 }: PropsWithChildren<FileUploadPreviewItemProps>) {
  const imageUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <li>
      <img src={imageUrl} alt="" width={w} height={h} />
      {children}
    </li>
  );
}

type FileUploadPreviewTriggerProps = {
  children?: ReactNode;
  asChild?: boolean;
  as?: ReactNode;
};
function FileUploadPreviewTrigger({ children, asChild, as }: FileUploadPreviewTriggerProps) {
  return asChild ? <button>{children}</button> : <>{as}</>;
}

FileUpload.DropZone = FileUploadDropZone;
FileUpload.Preview = FileUploadPreview;
FileUpload.PreviewItem = FileUploadPreviewItem;
FileUpload.PreviewTrigger = FileUploadPreviewTrigger;

export default FileUpload;
