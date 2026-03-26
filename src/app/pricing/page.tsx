"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PLANS } from "@/lib/stripe";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleUpgrade = async () => {
    if (!session) {
      router.push("/auth/signin?callbackUrl=/pricing");
      return;
    }

    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-12">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-400"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
          <span className="text-xl font-bold text-white">
            Skiss<span className="text-blue-400">ify</span>
          </span>
        </Link>

        <h1 className="text-4xl font-bold text-white mb-4">
          Choose your plan
        </h1>
        <p className="text-neutral-400 mb-12">
          Start free. Upgrade for private sketches and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-left">
            <h3 className="text-xl font-bold text-white mb-2">{PLANS.free.name}</h3>
            <div className="text-3xl font-bold text-white mb-6">
              $0<span className="text-sm font-normal text-neutral-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              {PLANS.free.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-neutral-300">
                  <span className="text-green-400">+</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/editor"
              className="block text-center px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
            >
              Get started
            </Link>
          </div>

          <div className="bg-neutral-900 border-2 border-blue-600 rounded-xl p-8 text-left relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
              POPULAR
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{PLANS.pro.name}</h3>
            <div className="text-3xl font-bold text-white mb-6">
              &euro;5<span className="text-sm font-normal text-neutral-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              {PLANS.pro.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-neutral-300">
                  <span className="text-blue-400">+</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpgrade}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
