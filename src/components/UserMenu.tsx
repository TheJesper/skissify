"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full animate-pulse" style={{ backgroundColor: "#93a1a1" }} />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
        style={{ backgroundColor: "#073642", color: "#93a1a1" }}
      >
        Sign In
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt=""
            className="w-8 h-8 rounded-full border-2 transition-colors"
            style={{ borderColor: "#93a1a1" }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "#268bd2", color: "#fdf6e3" }}>
            {session.user?.name?.[0] ?? "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl z-50 py-1" style={{ backgroundColor: "#eee8d5", border: "1px solid #93a1a1" }}>
          <div className="px-3 py-2" style={{ borderBottom: "1px solid #93a1a1" }}>
            <p className="text-sm font-medium truncate" style={{ color: "#073642" }}>
              {session.user?.name}
            </p>
            <p className="text-xs truncate" style={{ color: "#657b83" }}>
              {session.user?.email}
            </p>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm transition-colors hover:bg-[#fdf6e3]"
            style={{ color: "#586e75" }}
          >
            My Sketches
          </Link>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm transition-colors hover:bg-[#fdf6e3]"
            style={{ color: "#586e75" }}
          >
            New Sketch
          </Link>
          <hr style={{ borderColor: "#93a1a1" }} className="my-1" />
          <button
            onClick={() => signOut()}
            className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-[#fdf6e3]"
            style={{ color: "#dc322f" }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
