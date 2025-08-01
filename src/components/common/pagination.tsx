// import React from 'react';
// import { Button } from '../ui/button';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const handlePageClick = (page: number) => {
//     if (page !== currentPage) {
//       onPageChange(page);
//     }
//   };

//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="flex items-center justify-between mt-4">
//       <Button onClick={handlePrevious} disabled={currentPage === 1}>
//         Previous
//       </Button>

//       <div className="flex space-x-2">
//         {pageNumbers.map(page => (
//           <Button
//             key={page}
//             className={`px-4 py-2 ${
//               page === currentPage ? 'bg-slate-800' : 'bg-slate-400'
//             } text-white rounded`}
//             onClick={() => handlePageClick(page)}
//           >
//             {page}
//           </Button>
//         ))}
//       </div>

//       <Button onClick={handleNext} disabled={currentPage === totalPages}>
//         Next
//       </Button>
//     </div>
//   );
// };

// export default Pagination;
