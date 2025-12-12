"use client";
import { usePathname } from "next/navigation";

export default function AuthWrapper({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/auth")) return null;
  return children;
}
