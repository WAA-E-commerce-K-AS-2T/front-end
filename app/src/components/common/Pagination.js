import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <ReactPaginate
        containerClassName={"pagination flex space-x-2"}
        pageClassName={"page-item px-3 py-1"}
        activeClassName={"bg-black text-white rounded-full"}
        onPageChange={(event) => onPageChange(event.selected)}
        pageCount={pageCount}
        breakLabel="..."
        previousLabel={
          <ChevronDoubleLeftIcon className="w-5 h-5 mt-2 text-black" />
        }
        nextLabel={
          <ChevronDoubleRightIcon className="w-5 h-5 text-black mt-2" />
        }
      />
    </div>
  );
};

export default Pagination;
