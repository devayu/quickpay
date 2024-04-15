export function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
