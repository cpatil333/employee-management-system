import { useEffect } from "react";
import { selectTotalPages } from "../../features/employee/employeeSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  nextPage,
  previousPage,
  setCurrentPage,
} from "@/app/features/employee/employeeSlice";

export default function Pagination() {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.employee.currentPage);
  const totalPages = useAppSelector(selectTotalPages);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  const handleNext = () => {
    dispatch(nextPage());
  };

  const handlePrevious = () => {
    dispatch(previousPage());
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
