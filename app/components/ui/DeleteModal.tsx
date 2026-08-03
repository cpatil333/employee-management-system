import Button from "./Button";
import Modal from "./Modal";

type DeleteModalProps = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};
export default function DeleteModal({
  title = "Delete Confirmation",
  message = "Are you sure you wnat to delete record?",
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div>
      <Modal title={title} className="max-w-md" onClose={onCancel}>
        <p className="text-gray-500">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <Button className="bg-gray-500 hover:bg-gray-600" onClick={onCancel}>
            Cancel
          </Button>

          <Button className="bg-red-600 hover:bg-red-700" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
