"use client";
import React from "react";
import Image from "next/image";
import { Sofia } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const s = Sofia({
  subsets: ["latin"],
  weight: ["400"]
  // variable: "--font-s"
});

const page = () => {
  return (
    <section
      className={`container text-7xl justify-center text-center  text-lblue mt-24 font-semibold ${s.className}`}
    >
      <section className="z-50 mt-30 relative font-semibold">
        <p>Welcome to Cake Crafting</p>
        <Link href="/products">
          <Button className="bg-lblue hover:bg-rose mt-24 text-xl">
            Shop now
          </Button>
        </Link>
      </section>
      <section className="flex justify-center gap-7 ">
        <section className=" h-sreen">
          <Image
            alt={"ImageProduct"}
            src="/images/cakes0.png"
            width={600}
            height={900}
            className="-mt-44"
          />
        </section>
        <section className="-mt-44">
          <Image
            alt={"ImageProduct"}
            src="/images/cakes0.png"
            width={600}
            height={900}
            className=" "
          />
        </section>
      </section>
    </section>
  );
};

export default page;
