import {
  type ReactNode,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type PropsWithChildren,
  useEffect,
  memo,
  useState,
} from "react";

type FileUploadProps = FormHTMLAttributes<HTMLFormElement>;
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

type FileUploadPreviewItemProps = {
  file: File;
  w?: number;
  h?: number;
};
const FileUploadPreviewItem = memo(function ({
  children,
  file,
  w = 64,
  h = 64,
}: PropsWithChildren<FileUploadPreviewItemProps>) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(URL.createObjectURL(file));
    return () => {
      URL.revokeObjectURL(imageUrl);
      setImageUrl("");
    };
  }, []);

  return (
    <li>
      <img src={imageUrl} alt="" width={w} height={h} />
      {children}
    </li>
  );
});

type FileUploadPreviewTriggerProps = {
  children?: ReactNode;
  asChild?: boolean;
  as?: ReactNode;
};
function FileUploadPreviewTrigger({ children, asChild, as }: FileUploadPreviewTriggerProps) {
  return asChild ? <button>{children}</button> : <>{as}</>;
}

FileUpload.Box = FileUploadBox;
FileUpload.Preview = FileUploadPreview;
FileUpload.PreviewItem = FileUploadPreviewItem;
FileUpload.PreviewTrigger = FileUploadPreviewTrigger;

export default FileUpload;
