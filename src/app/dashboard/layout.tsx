"use client";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [render, setRender] = useState<boolean>(false);
  const router = useRouter();
  function handleLogout() {
    router.push("/");
    localStorage.removeItem("customersApp_token");
  }

  useEffect(() => {
    !localStorage.getItem("customersApp_token")
      ? router.push("/")
      : setRender(true);
  }, [router]);

  return (
    <main className='flex flex-col h-screen'>
      {render && (
        <>
          <section className='bg-black h-14 w-full p-4 flex text-white justify-between'>
            <section
              id='LOGO'
              className='h-full flex items-center w-fit'>
              <Image
                src='/next-white.svg'
                width={150}
                height={50}
                alt='Logo NextJS'
                className=''
              />
            </section>
            <section
              id='MENU'
              className='hidden lg:flex flex-1 items-center justify-center'>
              <ul className='text-sm font-semibold flex gap-10'>
                <li>
                  <Link href='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link href='/dashboard/customers'>Clientes</Link>
                </li>
                <li>
                  <Link href='/dashboard/users'>Usuários</Link>
                </li>
                <li>
                  <Link href='/dashboard/my-account'>Minha conta</Link>
                </li>
              </ul>
            </section>
            <section
              id='MENU-MOBILE'
              className='flex lg:hidden h-full items-center'>
              <Menu />
            </section>
            <section
              id='LOGOUT'
              className='hidden items-center lg:flex'>
              <Button onClick={handleLogout}>
                <LogOut />
                Sair
              </Button>
            </section>
          </section>
          {children}
        </>
      )}
    </main>
  );
}
