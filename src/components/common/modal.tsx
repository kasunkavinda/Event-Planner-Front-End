// 'use client';

// import React, { ReactNode } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';

// interface FormModalProps {
//   openCreate: boolean;
//   setOpen: (open: boolean) => void;
//   buttonName?: string;
//   title: string;
//   description: string;
//   children: ReactNode;
// }

// const FormModal = ({
//   openCreate,
//   setOpen,
//   buttonName,
//   title,
//   description,
//   children,
// }: FormModalProps) => {
//   return (
//     <Dialog open={openCreate} onOpenChange={setOpen}>
//       {buttonName ? (
//         <DialogTrigger asChild>
//           <Button variant="outline">{buttonName}</Button>
//         </DialogTrigger>
//       ) : null}

//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">{children}</div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FormModal;
