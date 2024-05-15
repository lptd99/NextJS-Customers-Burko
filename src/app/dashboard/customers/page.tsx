"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ICustomer {
  id: number;
  name: string;
  city: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  postal_code: string;
  country?: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<ICustomer[] | null>([]);
  const [loadingCustomers, setLoadingCustomers] = useState<boolean>(false);
  const tableFont = "small";

  async function fetchfromDB(route: string) {
    setLoadingCustomers(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await axios.get(`http://localhost:4000/${route}`);
      if (route === "customers") {
        setLoadingCustomers(false);
        setCustomers(response.data);
      }
      if (route === "login") {
      }
    } catch (error) {
      console.log("Error fetching customers.");
    }
  }

  useEffect(() => {
    fetchfromDB("customers");
  }, []);

  return (
    <main className='flex min-h-screen flex-col p-8 gap-4'>
      <section className='mb-2 items-left ml-4'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard/customers'>
                Lista de Clientes
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <section className='flex flex-row justify-between mt-5'>
          <Button
            disabled={loadingCustomers}
            className=''
            onClick={() => fetchfromDB("customers")}>
            Recarregar Clientes
          </Button>
          <Link href='/dashboard/customers/add'>
            <Button className='text-2xl font-semibold'>
              <Plus></Plus>
            </Button>
          </Link>
        </section>
        {loadingCustomers ? (
          <section className='flex flex-col items-center h-screen mt-[10rem]'>
            <section className='flex flex-row p-[5rem] items-center'>
              <Spinner></Spinner>
              <p className='p-[1rem]'>Carregando Clientes, aguarde...</p>
            </section>
          </section>
        ) : (
          <>
            <section className='mt-6 overflow-x-auto'>
              <Table className='w-full min-w-[800px]'>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>#</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cidade/UF</TableHead>
                    <TableHead className='w-[4rem] text-center'>
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers ? (
                    customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className='text-xl'>{customer.id}</TableCell>
                        <TableCell className='text-xl'>
                          {customer.name}
                        </TableCell>
                        <TableCell className='text-xl'>
                          {customer.city}
                        </TableCell>
                        <TableCell className='w-content flex flex-col justify-center gap-[.5rem]'>
                          <Button className='h-content w-content'>
                            <Pencil />
                          </Button>
                          <Button className='h-content w-content bg-error'>
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className='justify-center flex'>
                        Não existem Clientes neste banco
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </section>
            <section className='mt-10'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href='#' />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href='#'>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href='#' />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
