// components/common/ImageComponent.tsx
import Image from 'next/image';
import React from 'react';

// Define the props for your ImageComponent
interface ImageComponentProps {
  alt: string; // Required alt text for accessibility
  src: string; // The source URL or path for the image
  width?: number; // Optional width, defaults to a common size if not provided
  height?: number; // Optional height, defaults to a common size if not provided
  className?: string; // Optional CSS classes for styling
  priority?: boolean; // Optional, for LCP images
  sizes?: string; // Optional sizes attribute for responsive images
}

const CommonImage: React.FC<ImageComponentProps> = ({
  alt,
  src,
  width = 1000, // Default width
  height = 1000, // Default height
  className = 'aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2', // Default styling
  priority = false, // Default to false
  sizes, // Pass sizes if provided
}) => {
  // Logic to determine the final image source
  const finalSrc =
    src && src !== 'N/A' && src.startsWith('http')
      ? src
      : '/placeholder-image.webp'; // Your placeholder image path

  return (
    <Image
      alt={alt}
      src={finalSrc}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes} // Apply sizes attribute
    />
  );
};

export default CommonImage;
