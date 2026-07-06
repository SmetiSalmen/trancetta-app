"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center pt-28 pb-16">
        <div className="container-custom flex flex-col items-center text-center">
          {/* Shocked/Scared Mascot (mascotte5) */}
          <div className="w-64 max-w-xs mb-8 animate-float">
            <Image
              src="/images/mascotte/mascotte5.png"
              alt="Mascotte Trancetta Effrayée 404"
              width={260}
              height={280}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-red-primary/10 border border-red-primary/20 rounded-full px-4 py-1.5 mb-5">
            <span className="font-poppins text-red-primary text-xs font-semibold tracking-wider uppercase">
              Erreur 404
            </span>
          </div>

          <h1 className="font-anton text-black-warm mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            MAMMA MIA ! <br />
            <span className="text-red-primary">PAGE INTROUVABLE.</span>
          </h1>

          <p className="font-poppins text-text-secondary text-base max-w-md mx-auto leading-relaxed mb-8">
            La page que vous recherchez a dû être dévorée par notre mascotte, ou elle n&apos;existe plus. 
            Pas de panique, la pizza est toujours chaude !
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M15 11h.01M11 15h.01M16 16h.01m-10.7-3.3C4.2 8.4 8.4 4.2 12.7 5.3c5 1.2 7 6.7 4 10.4-2.2 2.7-6.2 3.3-9.1 1.6l-3.3.9.9-3.2z" />
              </svg>
              Retour à l&apos;accueil
            </Link>
            <Link href="/menu" className="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              Voir le menu
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
