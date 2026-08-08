type ErrorMessageProps = {
  message?: string;
};

export default function ErrorMessage({
  message = "Unable to load data.",
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-2">
      <span className="text-3xl">⚠️</span>

      <p className="text-red-600 font-medium">{message}</p>
    </div>
  );
}
