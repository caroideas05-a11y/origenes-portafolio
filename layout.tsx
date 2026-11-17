import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORÍGENES — Estudio creativo",
  description: "Contenido, estrategia, diseño y producción audiovisual para marcas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
