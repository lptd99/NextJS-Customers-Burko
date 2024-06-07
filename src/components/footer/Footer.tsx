import React from "react";
import { Sofia } from "next/font/google";
const s = Sofia({
  subsets: ["latin"],
  weight: ["400"]
  // variable: "--font-s"
});
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={` bg-lblue text-lg text-lpink ${s.className}`}>
      <section className="container flex flex-col justify-center py-2 sm:flex-row sm:py-4 text-center">
        <p>Cake Crafting</p>
        <p> - All rights reserved - </p>
        <p>{currentYear}</p>
      </section>
    </footer>
  );
};

export default Footer;
