import { Button } from "@/components/ui/button";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <Button
              variant={currentPage === number ? "default" : "outline"}
              onClick={() => paginate(number)}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
