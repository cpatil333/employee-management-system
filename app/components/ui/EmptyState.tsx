import React from "react";
type EmptyStateProps = {
  message: string;
};
export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex bg-gray-500">
      <p>{message}</p>
    </div>
  );
}
