import type { Metadata } from "next";
import { Anton, Poppins, Caveat } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trancetta Pizza House | La Pizza Autrement — En Tranche & En Plateau",
  description:
    "Trancetta Pizza House, spécialiste de la pizza rectangulaire vendue en tranche ou en grand plateau à partager. Qualité premium, ingrédients frais, cuisson maîtrisée. Composez votre plateau sur mesure !",
  keywords:
    "pizza trancetta, pizza rectangulaire, pizza en tranche, plateau pizza, pizza à partager, pizza house, pizzeria",
  openGraph: {
    title: "Trancetta Pizza House | La Pizza Autrement",
    description:
      "Spécialiste de la pizza rectangulaire en tranche et en plateau. Composez votre plateau sur mesure.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${anton.variable} ${poppins.variable} ${caveat.variable}`}>
      <body className="font-poppins bg-cream text-text-primary antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
