import { useEmployee } from "@/app/hooks/useEmployee";

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const { currentPage, setCurrentPage } = useEmployee();
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
