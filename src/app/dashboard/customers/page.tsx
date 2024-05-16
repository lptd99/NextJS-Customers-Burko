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
import { ICustomer } from "@/interfaces";
import { useStore } from "@/stores";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import axios from "axios";
import { MoveLeft, Pencil, Plus, RotateCw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Customers() {
  const [customers, setCustomers] = useState<ICustomer[] | null>([]);
  const [loadingCustomers, setLoadingCustomers] = useState<boolean>(false);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [customerToDelete, setCustomerToDelete] = useState<number>(-1);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const store = useStore();

  async function fetchCustomers() {
    setLoadingCustomers(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(`http://localhost:4000/customers`);
      setLoadingCustomers(false);
      setCustomers(response.data);
    } catch (error) {
      console.log("Error fetching customers.");
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function handleDialogDeleteConfirm(id: number) {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:4000/customers/${id}`);
      await fetchCustomers();
      toast.success("Cliente excluído com sucesso.");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao excluir Cliente.");
    }
    setDialogIsOpen(false);
    setIsDeleting(false);
  }

  function handleDeleteClick(id: number) {
    setDialogIsOpen(true);
    setCustomerToDelete(id);
  }

  function handleEditClick(customer: ICustomer) {
    store.setCustomerToUpdate(customer);
    router.push("/dashboard/customers/edit");
  }

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
            className='text-lg'
            onClick={() => fetchCustomers()}>
            <RotateCw className='mr-2' />
            Recarregar Clientes
          </Button>
          <Link href='/dashboard/customers/add'>
            <Button className='text-2xl font-semibold'>
              <Plus className='text-lg'></Plus>
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
                  <TableRow className='items-center'>
                    <TableHead className='w-[100px] font-bold'>#</TableHead>
                    <TableHead className='font-bold'>Nome</TableHead>
                    <TableHead className='font-bold'>Cidade/UF</TableHead>
                    <TableHead className='w-[4rem] font-bold text-center'>
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers ? (
                    customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.city}</TableCell>
                        <TableCell className='w-content flex flex-col justify-center gap-[.5rem]'>
                          <Button
                            variant='outline'
                            className='h-content w-content'
                            onClick={() => handleEditClick(customer)}>
                            <Pencil />
                          </Button>
                          <Button
                            className='h-content w-content'
                            variant='destructive'
                            onClick={() => handleDeleteClick(customer.id)}>
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

      <Transition
        show={dialogIsOpen}
        enter='duration-500 ease-out'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='duration-500 ease-out'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        <Dialog
          open={dialogIsOpen}
          onClose={() => setDialogIsOpen(false)}
          className='relative z-50'>
          <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
            <DialogPanel className='max-w-lg space-y-4 border bg-white p-12'>
              <DialogTitle className='font-bold text-2xl'>
                Excluir registro?
              </DialogTitle>
              <Description className='font-semibold'>
                Esta ação não pode ser desfeita.
              </Description>
              <p>
                Você tem certeza que deseja excluir este registro do banco de
                dados?
              </p>
              <div className='flex gap-4 justify-between'>
                <Button
                  disabled={isDeleting}
                  onClick={() => setDialogIsOpen(false)}>
                  <MoveLeft className='mr-2' /> Cancelar
                </Button>
                <Button
                  disabled={isDeleting}
                  onClick={() => handleDialogDeleteConfirm(customerToDelete)}
                  className='w-40'
                  variant='destructive'>
                  {isDeleting ? (
                    <Spinner />
                  ) : (
                    <>
                      Tenho certeza! <Trash2 className='ml-2' />
                    </>
                  )}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer />
    </main>
  );
}
