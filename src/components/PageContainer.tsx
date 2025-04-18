
import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageContainer({ title, description, children }: PageContainerProps) {
  return (
    <div className="p-6 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h1>
        {description && (
          <p className="text-zinc-400 mt-2">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
