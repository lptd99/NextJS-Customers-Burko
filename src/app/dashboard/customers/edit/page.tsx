"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DynamicBreadcrumb from "@/components/ui/dynamic-breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { CustomerZodSchema } from "@/schemas/CustomerZodSchema";
import { useStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

export default function CustomersEdit() {
  const store = useStore();
  const [loading, setLoading] = useState<boolean>(false);
  type Inputs = z.infer<typeof CustomerZodSchema>;
  const router = useRouter();
  const [render, setRender] = useState<boolean>();

  const success = (text: string) => toast.success(text);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(CustomerZodSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      if (store.customerToUpdate) {
        const response = await axios.put(
          `http://localhost:4000/customers/${store.customerToUpdate.id}`,
          data
        );
      }
      success("Cliente alterado com sucesso!");
      setLoading(false);
      reset();
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      store.setCustomerToUpdate(null);
    } catch (error) {}
  };

  function hasAnyError() {
    return (
      errors.name?.message ||
      errors.email?.message ||
      errors.phone?.message ||
      errors.address?.message ||
      errors.city?.message ||
      errors.state?.message ||
      errors.postal_code?.message ||
      errors.country?.message
    );
  }

  useEffect(() => {
    store.customerToUpdate
      ? setRender(true)
      : router.push("/dashboard/customers");
  }, [store.customerToUpdate, router]);

  return (
    <main className='flex min-h-screen flex-col p-8 gap-4'>
      {render && (
        <section className='mb-2 items-left ml-4'>
          <DynamicBreadcrumb
            className=''
            text='Dashboard, Lista de Clientes, Alterar Cliente'
            link='/dashboard, /dashboard/customers'
          />
          <section className='flex flex-col items-center pb-14'>
            <form onSubmit={handleSubmit(processForm)}>
              <Card className='w-full mt-10'>
                <CardHeader className='w-full items-center gap-1'>
                  <CardTitle>Alterar Cliente</CardTitle>
                  <CardDescription>Atualize os dados abaixo</CardDescription>
                </CardHeader>
                <CardContent className=''>
                  <section className='grid grid-cols-1 md:md:grid-cols-2 lg:grid-cols-3 w-full h-200 gap-4'>
                    <section>
                      <Label
                        htmlFor='Name'
                        className={errors.name?.message ? "text-error" : ""}>
                        Nome
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={errors.name?.message ? "border-error" : ""}
                        placeholder='Digite o nome'
                        {...register("name")}
                        defaultValue={store.customerToUpdate?.name}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.name?.message}
                      </p>
                    </section>
                    <section>
                      <Label
                        htmlFor='Email'
                        className={errors.email?.message ? "text-error" : ""}>
                        E-mail
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={errors.email?.message ? "border-error" : ""}
                        placeholder='Digite o e-mail'
                        {...register("email")}
                        defaultValue={store.customerToUpdate?.email}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.email?.message}
                      </p>
                    </section>
                    <section>
                      <Label
                        htmlFor='Phone'
                        className={errors.phone?.message ? "text-error" : ""}>
                        Telefone/Celular
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={errors.phone?.message ? "border-error" : ""}
                        placeholder='Digite o telefone/celular'
                        {...register("phone")}
                        defaultValue={store.customerToUpdate?.phone}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.phone?.message}
                      </p>
                    </section>
                    <section>
                      <Label
                        htmlFor='Address'
                        className={errors.address?.message ? "text-error" : ""}>
                        Endereço
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={
                          errors.address?.message ? "border-error" : ""
                        }
                        placeholder='Digite o endereço'
                        {...register("address")}
                        defaultValue={store.customerToUpdate?.address}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.address?.message}
                      </p>
                    </section>
                    <section>
                      <Label
                        htmlFor='City'
                        className={errors.city?.message ? "text-error" : ""}>
                        Cidade
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={errors.city?.message ? "border-error" : ""}
                        placeholder='Digite a cidade'
                        {...register("city")}
                        defaultValue={store.customerToUpdate?.city}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.city?.message}
                      </p>
                    </section>
                    <section>
                      <Label
                        htmlFor='State'
                        className={errors.state?.message ? "text-error" : ""}>
                        Estado
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={errors.state?.message ? "border-error" : ""}
                        placeholder='Digite o estado'
                        {...register("state")}
                        defaultValue={store.customerToUpdate?.state}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.state?.message}
                      </p>
                    </section>
                    <section>
                      <Label
                        htmlFor='PostalCode'
                        className={
                          errors.postal_code?.message ? "text-error" : ""
                        }>
                        CEP
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={
                          errors.postal_code?.message ? "border-error" : ""
                        }
                        placeholder='Digite o CEP'
                        {...register("postal_code")}
                        defaultValue={store.customerToUpdate?.postal_code}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.postal_code?.message}
                      </p>
                    </section>
                    <section className='items-center'>
                      <Label
                        htmlFor='Country'
                        className={errors.country?.message ? "text-error" : ""}>
                        País
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={
                          errors.country?.message ? "border-error" : ""
                        }
                        placeholder='Digite o país'
                        {...register("country")}
                        defaultValue={store.customerToUpdate?.country}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-2'>
                        {errors.country?.message}
                      </p>
                    </section>
                  </section>
                </CardContent>
                <CardFooter className='flex justify-end'>
                  <Button
                    disabled={hasAnyError() ? true : loading}
                    className={
                      hasAnyError()
                        ? "!bg-error w-40"
                        : loading
                        ? "!w-content"
                        : "!w-40"
                    }
                    type='submit'>
                    {hasAnyError() ? (
                      <ShieldAlert />
                    ) : loading ? (
                      <Spinner />
                    ) : (
                      "Salvar alterações"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </section>
          <ToastContainer />
        </section>
      )}
    </main>
  );
}
