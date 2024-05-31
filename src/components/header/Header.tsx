import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { Sofia } from "next/font/google";

const s = Sofia({
  subsets: ["latin"],
  weight: ["400"]
  // variable: "--font-s"
});

const Header = () => {
  return (
    <header className="bg-lblue w-full">
      {" "}
      <section className="container h-20 py-4 px-12 flex text-3xl  text-white justify-between">
        <section id="LOGO" className="h-full flex items-center w-fit ">
          {/* <Image
            src="/next-white.svg"
            width={150}
            height={50}
            alt="Logo NextJS"
            className=""
            priority
          /> */}
          <Link href="/">
            <p className={s.className}>Cake Crafting</p>
          </Link>
        </section>
        <section
          id="MENU"
          className="hidden lg:flex flex-1  items-center text-lpink justify-center"
        >
          <ul className={` font-semibold text-xl flex gap-10 ${s.className}`}>
            <li className="hover:text-white">
              <Link href="/products">Cakes</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/contact">Contact</Link>
            </li>

            {/* <li className="hover:text-white">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/dashboard/customers">Clientes</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/dashboard/users">Usuários</Link>
            </li>
            <li className="hover:text-white">
              <Link href="/dashboard/my-account">Minha conta</Link>
            </li> */}
          </ul>
        </section>
        <section
          id="MENU-MOBILE"
          className="flex lg:hidden h-full items-center"
        >
          <Menu className="text-lpink" />
        </section>
        <section id="LOGOUT" className="hidden items-center lg:flex">
          <Link href="/login">
            <Button
              className={`${s.className} bg-transparent text-lpink border-2 border-lpink hover:bg-rose hover:text-white`}
            >
              {/* <Button onClick={handleLogout}></Button> */}
              {/* <LogOut className="mr-1 bg-lpink hover:bg-dblue hover:text-lpink" /> */}
              Login
            </Button>
          </Link>
        </section>
      </section>
    </header>
  );
};

export default Header;
