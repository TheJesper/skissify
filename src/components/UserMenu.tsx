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
      <div className="w-8 h-8 rounded-full bg-neutral-700 animate-pulse" />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs font-medium transition-colors"
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
            className="w-8 h-8 rounded-full border-2 border-neutral-700 hover:border-blue-500 transition-colors"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            {session.user?.name?.[0] ?? "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl z-50 py-1">
          <div className="px-3 py-2 border-b border-neutral-700">
            <p className="text-sm font-medium text-white truncate">
              {session.user?.name}
            </p>
            <p className="text-xs text-neutral-400 truncate">
              {session.user?.email}
            </p>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-700 transition-colors"
          >
            My Sketches
          </Link>
          <Link
            href="/editor"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-700 transition-colors"
          >
            New Sketch
          </Link>
          <hr className="border-neutral-700 my-1" />
          <button
            onClick={() => signOut()}
            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-neutral-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
