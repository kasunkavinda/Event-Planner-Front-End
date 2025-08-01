'use client';

import { useSearchParams, useRouter } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const navigateToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    router.push(`?${newParams.toString()}`);
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => navigateToPage(page)}
      className={`px-3 py-1 rounded-md  ${
        currentPage === page
          ? 'bg-blue-shade text-white'
          : 'bg-white text-gray-800 hover:bg-gray-100'
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="flex gap-2 mt-6 items-center justify-center">
      <button
        onClick={() => navigateToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => {
          return (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          );
        })
        .map((page, i, arr) => {
          const previousPage = arr[i - 1];
          if (previousPage && page - previousPage > 1) {
            return <span key={`gap-${page}`}>...</span>;
          }
          return renderPageButton(page);
        })}

      <button
        onClick={() => navigateToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
