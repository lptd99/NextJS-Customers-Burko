"use client";

import {
  ICustomer,
  IPaginatedCustomerResponse,
} from "@/app/interfaces/interfaces";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/ui/dynamic-breadcrumb";
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
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [firstPage, setFirstPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [customerResponse, setCustomerResponse] =
    useState<IPaginatedCustomerResponse | null>(null);

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const store = useStore();

  const updatePageFromHash = () => {
    const hash = window.location.hash;
    const pageNumber = parseInt(hash.replace("#", ""), 10);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      setPage(pageNumber);
    } else {
      setPage(1); // Default to page 1 if hash is invalid
    }
  };

  async function fetchCustomers(page: number, perPage: number) {
    setLoadingCustomers(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(
        `http://localhost:4000/customers?_page=${page}&_per_page=${perPage}`
      );
      setCustomerResponse(response.data);
      setFirstPage(response.data.first);
      setLastPage(response.data.last);
      setCustomers(response.data.data);
    } catch (error) {
      console.log("Error fetching customers.");
    }
    setLoadingCustomers(false);
  }

  useEffect(() => {
    updatePageFromHash();
    window.addEventListener("hashchange", updatePageFromHash);
    fetchCustomers(page, perPage);
    return () => {
      window.removeEventListener("hashchange", updatePageFromHash);
    };
  }, [page, perPage, router, lastPage]);

  async function handleDialogDeleteConfirm(id: number) {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:4000/customers/${id}`);
      await fetchCustomers(page, perPage);
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
        <DynamicBreadcrumb
          className=''
          text='Dashboard, Lista de Clientes'
          link='/dashboard'
        />
        <section className='flex flex-row justify-between mt-5'>
          <Button
            disabled={loadingCustomers}
            className='text-lg'
            onClick={() => fetchCustomers(page, perPage)}>
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
                  <PaginationItem hidden={page === firstPage}>
                    <PaginationPrevious href={`#${page - 1}`} />
                  </PaginationItem>
                  <PaginationItem hidden={page - 1 <= firstPage}>
                    <PaginationLink
                      className='text-md text-gray-300'
                      href={"#" + firstPage}>
                      {firstPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem
                    className='text-gray-300'
                    hidden={page - 2 <= firstPage}>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem hidden={page === firstPage}>
                    <PaginationLink
                      className='text-gray-300'
                      href={
                        page - 1 < firstPage ? "#" + page : "#" + (page - 1)
                      }>
                      {page > firstPage ? page - 1 : "-"}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      className='font-bold text-lg'
                      href={"#" + page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem hidden={page === lastPage}>
                    <PaginationLink
                      className='text-sm text-gray-300'
                      href={
                        page + 1 > lastPage ? "#" + page : "#" + (page + 1)
                      }>
                      {page < lastPage ? page + 1 : "-"}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem
                    className='text-gray-300'
                    hidden={page + 2 >= lastPage}>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem hidden={page + 1 >= lastPage}>
                    <PaginationLink
                      className='text-sm  text-gray-300'
                      href={"#" + lastPage}>
                      {lastPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem hidden={page === lastPage}>
                    <PaginationNext href={`#${page + 1}`} />
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
