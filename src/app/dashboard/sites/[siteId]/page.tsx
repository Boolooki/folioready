// src/app/dashboard/sites/[siteId]/page.tsx
import { useParams } from 'next/navigation';

export default function SitePage() {
  const { siteId } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Portfolio Site: {siteId}</h1>
      <p>This page dynamically renders the portfolio details.</p>
    </div>
  );
}