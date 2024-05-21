"use client";

import { ICommodity } from "@/app/interfaces/interfaces";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommodityCombobox from "@/components/ui/commodityCombobox";
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
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";

export default function CustomersEdit() {
  const store = useStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPostalCode, setLoadingPostalCode] = useState<boolean>(false);
  type Inputs = z.infer<typeof CustomerZodSchema>;
  const router = useRouter();
  const [render, setRender] = useState<boolean>();

  const success = (text: string) => toast.success(text);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(CustomerZodSchema),
  });
  const registerWithMask = useHookFormMask(register);

  const postal_code = watch("postal_code");
  const country = watch("country")?.toLowerCase().trim();

  const getPostalCode: any = useCallback(async () => {
    if (country === "brasil" || country === "brazil" || country === "br") {
      if (postal_code?.length === 9 && !postal_code.includes("_")) {
        try {
          setLoadingPostalCode(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const response = await axios.get(
            `https://viacep.com.br/ws/${postal_code.replace("-", "")}/json`
          );
          if (response.status === 200) {
            setLoadingPostalCode(false);
            if (response.data.erro) {
              setError("postal_code", {
                message: "CEP inválido",
              });
            } else {
              setError("postal_code", {
                message: "",
              });
              setValue(
                "address",
                response.data.logradouro + ", " + response.data.bairro
              );
              setValue("city", response.data.localidade);
              setValue("state", response.data.uf);
            }
          }

          //setAddress(response);
        } catch (error) {
          console.log("Erro ao processar CEP");
        }
      } else {
        setError("postal_code", {
          message: "CEP inválido",
        });
      }
    }
    setLoadingPostalCode(false);
  }, [postal_code, country, setError, setValue]);

  useEffect(() => {
    getPostalCode();
  }, [postal_code, getPostalCode]);

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

  function handleCommodityChange(commodity: ICommodity) {
    setValue("commodity", commodity.name);
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
                        className='text-gray-500'>
                        Nome
                      </Label>
                      <Input
                        // disabled={true}
                        readOnly
                        type='text'
                        id='text'
                        className='text-gray-400'
                        placeholder='Digite o nome'
                        {...register("name")}
                        defaultValue={store.customerToUpdate?.name}
                      />
                      <p
                        className={`text-gray-500 text-xs font-semibold text-center mt-1`}>
                        Não pode ser alterado
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
                      <p className='text-error text-xs font-semibold text-center mt-1'>
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
                        {...registerWithMask("phone", ["(99) [9]9999-9999"], {
                          required: true,
                        })}
                        defaultValue={store.customerToUpdate?.phone}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-1'>
                        {errors.phone?.message}
                      </p>
                    </section>
                    <section>
                      <Label
                        htmlFor='CPF'
                        className={errors.phone?.message ? "text-error" : ""}>
                        CPF
                      </Label>
                      <Input
                        type='text'
                        id='text'
                        className={errors.phone?.message ? "border-error" : ""}
                        placeholder='Digite o CPF'
                        {...registerWithMask("cpf", ["999.999.999-99"])}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-1'>
                        {errors.cpf?.message}
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
                      <p className='text-error text-xs font-semibold text-center mt-1'>
                        {errors.country?.message}
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
                      <section className='relative'>
                        <Input
                          type='text'
                          id='text'
                          className={
                            errors.postal_code?.message ? "border-error" : ""
                          }
                          placeholder='Digite o CEP'
                          {...registerWithMask("postal_code", ["99999-999"])}
                          defaultValue={store.customerToUpdate?.postal_code}
                        />
                        {loadingPostalCode && (
                          <section className='absolute top-0.5 right-1'>
                            <Spinner />
                          </section>
                        )}
                      </section>
                      <p className='text-error text-xs font-semibold text-center mt-1'>
                        {errors.postal_code?.message}
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
                        readOnly
                        className={
                          errors.address?.message ? "border-error" : ""
                        }
                        placeholder='Digite o CEP'
                        {...register("address")}
                        defaultValue={store.customerToUpdate?.address}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-1'>
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
                        readOnly
                        className={errors.city?.message ? "border-error" : ""}
                        placeholder='Digite o CEP'
                        {...register("city")}
                        defaultValue={store.customerToUpdate?.city}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-1'>
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
                        readOnly
                        className={errors.state?.message ? "border-error" : ""}
                        placeholder='Digite o CEP'
                        {...register("state")}
                        defaultValue={store.customerToUpdate?.state}
                      />
                      <p className='text-error text-xs font-semibold text-center mt-1'>
                        {errors.state?.message}
                      </p>
                    </section>
                    <section>
                      <Label>Tipo de Commodity</Label>
                      <CommodityCombobox
                        handleCommodityChange={handleCommodityChange}
                      />
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
