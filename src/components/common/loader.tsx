interface LoaderProps {
  className?: string;
}

export default function Loader({ className = 'h-10 w-10' }: LoaderProps) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        className={`animate-spin rounded-full border-t-4 border-complementary border-solid ${className}`}
      />
    </div>
  );
}
