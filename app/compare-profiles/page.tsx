"use client";

import { useState } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import CompareProfiles from "@/components/CompareProfiles";

export default function CompareProfilesPage() {
  const router = useRouter();
  const [showComparison, setShowComparison] = useState(true);

  const handleBack = () => {
    router.push("/");
  };

  if (!showComparison) {
    return null;
  }

  return (
    <div>
      <CompareProfiles onBack={handleBack} />
    </div>
  );
}
