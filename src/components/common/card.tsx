import React from 'react';
import Heading from '../ui/heading';

const Card = ({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="bg-accent p-2 rounded-t-xl">{title}</div>
      <div className="bg-primary border-b-2 border-x-2 border-accent">
        {children}
      </div>
    </div>
  );
};

export default Card;
