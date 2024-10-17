"use client";

import { DashboardGuard } from './DashboardGuard';
import { DashboardClient } from './DashboardClientComponent';

// If you used default export in DashboardClient.tsx, use this instead:
// import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  return (
    <DashboardGuard>
      <DashboardClient />
    </DashboardGuard>
  );
}
