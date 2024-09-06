import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ITEMS_PER_PAGE } from "../../app/constants";

export default function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="flex items-center justify-between border-t border-purple-400 bg-white px-4 py-3 sm:px-6">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between w-full">
        <div className="sm:flex-1 text-center sm:text-left">
          <p className="text-sm text-purple-700">
            Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems ? totalItems : page * ITEMS_PER_PAGE}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div className="sm:flex-1 flex justify-center sm:justify-end mt-2 sm:mt-0">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-purple-400 hover:text-white ring-1 ring-inset ring-purple-300 hover:bg-purple-400 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5 cursor-pointer" aria-hidden="true" />
            </div>
            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={() => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 cursor-pointer inline-flex items-center${
                  index + 1 === page ? ' bg-purple-600 text-white' : ' text-gray-400'
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600`}
              >
                {index + 1}
              </div>
            ))}
            <div
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-purple-400 hover:text-white ring-1 ring-inset ring-purple-300 hover:bg-purple-400 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5 cursor-pointer" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

              
              