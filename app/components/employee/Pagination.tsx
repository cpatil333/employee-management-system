type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePrevious}
        className="w-25 bg-blue-600 m-1 p-1 text-white"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {currentPage} of {totalPages || 1}
      <button
        onClick={handleNext}
        className="w-25 bg-blue-600 m-1 p-1 text-white"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
