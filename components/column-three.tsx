import { ConfirmDialogCard } from "./confirm-dialog-card";
import { FileUploadCard } from "./file-upload-card";

export function ColumnThree() {
  return (
    <div className="flex w-[360px] flex-col gap-5">
      <ConfirmDialogCard />
      <FileUploadCard />
    </div>
  );
}