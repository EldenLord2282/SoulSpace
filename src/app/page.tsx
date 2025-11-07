"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/page2");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="h-screen flex flex-col justify-center items-center relative bg-cover bg-center"
      style={{ backgroundImage: "url('/welcom.png')",
              filter: "brightness(120%)"
       }} // ✅ direct from /public
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center">
      </div>
    </div>
  );
}
