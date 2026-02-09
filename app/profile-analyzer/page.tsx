"use client";

import { useState } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileAnalyzer from "@/components/ProfileAnalyzer";

export default function ProfileAnalyzerPage() {
  const router = useRouter();
  const [showAnalyzer, setShowAnalyzer] = useState(true);

  const handleBack = () => {
    router.push("/");
  };

  if (!showAnalyzer) {
    return null;
  }

  return (
    <div>
      <ProfileAnalyzer onBack={handleBack} />
    </div>
  );
}
