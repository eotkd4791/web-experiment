import {
  type ReactNode,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type PropsWithChildren,
  useMemo,
} from "react";

type FileUploadProps = FormHTMLAttributes<HTMLFormElement>;
type FileUploadBoxProps = InputHTMLAttributes<HTMLInputElement>;
type FileUploadPreviewItemProps = {
  file: File;
  w?: number;
  h?: number;
};
type FileUploadPreviewTriggerProps = {
  children?: ReactNode;
  asChild?: boolean;
  as?: ReactNode;
};

function FileUpload({ children, ...formAttrs }: PropsWithChildren<FileUploadProps>) {
  return <form {...formAttrs}>{children}</form>;
}

function FileUploadBox({ ...fileInputAttrs }: FileUploadBoxProps) {
  return (
    <label>
      <input type="file" {...fileInputAttrs} />
    </label>
  );
}

function FileUploadPreview({ children }: PropsWithChildren) {
  return <ol>{children}</ol>;
}

function FileUploadPreviewItem({ children, file, w, h }: PropsWithChildren<FileUploadPreviewItemProps>) {
  const imageUrl = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <li>
      <img src={imageUrl} alt="" width={w} height={h} />
      {children}
    </li>
  );
}

function FileUploadPreviewTrigger({ children, asChild, as }: FileUploadPreviewTriggerProps) {
  return asChild ? <button>{children}</button> : <>{as}</>;
}

function FileUploadAction({ children }: PropsWithChildren) {
  return <>{children}</>;
}

FileUpload.Box = FileUploadBox;
FileUpload.Preview = FileUploadPreview;
FileUpload.PreviewItem = FileUploadPreviewItem;
FileUpload.PreviewTrigger = FileUploadPreviewTrigger;
FileUpload.Action = FileUploadAction;

export default FileUpload;
