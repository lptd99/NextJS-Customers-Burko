import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GoBack from "@/components/btns/GoBack";
import { Sofia } from "next/font/google";

const s = Sofia({
  subsets: ["latin"],
  weight: ["400"]
  // variable: "--font-s"
});

const Page = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 lg:text-left">
          About Cake Crafting
        </h1>
        <p className="text-lg font-semibold lg:text-left">
          Welcome to Cake Crafting!
        </p>
        <p className="text-lg font-semibold lg:text-left">
          {" "}
          We're delighted to share our sweet story with you.
        </p>
      </section>
      <section className=" flex flex-col lg:flex-row justify-center items-center ">
        <section className="flex flex-shrink-0 mb-8">
          <Image
            src={"/images/sofia.jpg"}
            width={300}
            height={300}
            alt="Photo of Sofia, the owner of Cake Crafting, holding cupcakes"
            className="rounded-lg"
          />
        </section>
        <section className="text-lg lg:w-full leading-relaxed max-w-2xl mx-auto lg:ml-8 lg:items-center">
          <p className="mb-4">
            Meet Sofia, the heart and soul behind Cake Crafting. Sofia's journey
            into the world of baking began in her childhood, in a cozy kitchen
            filled with the warm, inviting aroma of freshly baked cakes and
            pastries. From a young age, Sofia spent countless hours by her
            mother's side, learning the art of baking. She watched in awe as her
            mother transformed simple ingredients into delightful confections,
            and soon enough, Sofia was rolling up her sleeves and joining in the
            fun.
          </p>
          <p className="mb-4">
            Sofia's mother, a talented home baker, taught her the importance of
            patience, precision, and love in baking. These early experiences
            ignited Sofia's passion for creating beautiful and delicious treats.
            Over the years, her skills flourished, transforming a cherished
            hobby into a lifelong passion. Driven by her love for baking and a
            desire to share her creations, Sofia decided to open her own
            business, bringing joy and sweetness to her clients.
          </p>
        </section>
        <section className="hidden lg:block ">
          <Image
            src={"/images/cakespile.png"}
            width={200}
            height={200}
            alt="Photo of Sofia, the owner of Cake Crafting, holding cupcakes"
            className="rounded-lg lg:mr-[150px] "
          />
        </section>
      </section>
      <section className="flex justify-center">
        <Button
          className={`${s.className} text-center mt-8 bg-lblue text-lpink border-2 border-lpink hover:bg-rose hover:text-white`}
        >
          {/* <Button onClick={handleLogout}></Button> */}
          {/* <LogOut className="mr-1 bg-lpink hover:bg-dblue hover:text-lpink" /> */}
          <GoBack />
        </Button>
      </section>
    </section>
  );
};

export default Page;
