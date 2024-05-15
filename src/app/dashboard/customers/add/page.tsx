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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";

export default function CustomersAdd() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [hasNameError, setHasNameError] = useState<boolean>(false);
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [hasPhoneError, setHasPhoneError] = useState<boolean>(false);
  const [hasAddressError, setHasAddressError] = useState<boolean>(false);
  const [hasCityError, setHasCityError] = useState<boolean>(false);
  const [hasStateError, setHasStateError] = useState<boolean>(false);
  const [hasPostalCodeError, setHasPostalCodeError] = useState<boolean>(false);
  const [hasCountryError, setHasCountryError] = useState<boolean>(false);

  function handleSubmit() {
    if (validateForm()) {
      console.log(email + " = email, " + " = password");
    }
  }

  function hasAnyError() {
    return (
      hasNameError ||
      hasEmailError ||
      hasPhoneError ||
      hasAddressError ||
      hasCityError ||
      hasStateError ||
      hasPostalCodeError ||
      hasCountryError
    );
  }

  function validateName() {
    if (name.length === 0) {
      setHasNameError(true);
    } else setHasNameError(false);
  }
  function validateEmail() {
    if (email.length === 0 || !email.includes("@")) {
      setHasEmailError(true);
    } else setHasEmailError(false);
  }
  function validatePhone() {
    if (phone.length === 0) {
      setHasPhoneError(true);
    } else setHasPhoneError(false);
  }
  function validateAddress() {
    if (address.length === 0) {
      setHasAddressError(true);
    } else setHasAddressError(false);
  }
  function validateCity() {
    if (city.length === 0) {
      setHasCityError(true);
    } else setHasCityError(false);
  }
  function validateState() {
    if (state.length === 0) {
      setHasStateError(true);
    } else setHasStateError(false);
  }
  function validatePostalCode() {
    if (postalCode.length === 0) {
      setHasPostalCodeError(true);
    } else setHasPostalCodeError(false);
  }
  function validateCountry() {
    if (country.length === 0) {
      setHasCountryError(true);
    } else setHasCountryError(false);
  }

  function validateForm() {
    validateName();
    validateEmail();
    validatePhone();
    validateAddress();
    validateCity();
    validateState();
    validatePostalCode();
    validateCountry();
    return !hasAnyError();
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard/customers/add'>
                Adicionar Cliente
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className='flex flex-col items-center pb-14'>
        <Card className='h-content w-full sm:w-[30rem] p-4'>
          <CardHeader className='w-full items-center gap-1'>
            <CardTitle>Novo Cliente</CardTitle>
            <CardDescription>Preencha os dados abaixo</CardDescription>
          </CardHeader>
          <CardContent className='grid w-full items-center gap-4'>
            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='Name'
                className={hasNameError ? "text-error" : ""}>
                Nome
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validateName}
                onChange={(event) => setName(event.target.value)}
                className={hasNameError ? "border-error" : ""}
              />
              {hasNameError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  Nome inválido!
                </section>
              )}
            </section>
            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='Email'
                className={hasEmailError ? "text-error" : ""}>
                E-mail
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validateEmail}
                onChange={(event) => setEmail(event.target.value)}
                className={hasEmailError ? "border-error" : ""}
              />
              {hasEmailError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  E-mail inválido!
                </section>
              )}
            </section>
            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='Phone'
                className={hasPhoneError ? "text-error" : ""}>
                Telefone/Celular
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validatePhone}
                onChange={(event) => setPhone(event.target.value)}
                className={hasPhoneError ? "border-error" : ""}
              />
              {hasPhoneError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  Telefone/Celular inválido!
                </section>
              )}
            </section>
            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='Address'
                className={hasAddressError ? "text-error" : ""}>
                Endereço
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validateAddress}
                onChange={(event) => setAddress(event.target.value)}
                className={hasAddressError ? "border-error" : ""}
              />
              {hasAddressError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  Endereço inválido!
                </section>
              )}
            </section>

            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='City'
                className={hasCityError ? "text-error" : ""}>
                Cidade
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validateCity}
                onChange={(event) => setCity(event.target.value)}
                className={hasCityError ? "border-error" : ""}
              />
              {hasCityError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  Cidade inválida!
                </section>
              )}
            </section>

            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='State'
                className={hasStateError ? "text-error" : ""}>
                Estado
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validateState}
                onChange={(event) => setState(event.target.value)}
                className={hasStateError ? "border-error" : ""}
              />
              {hasStateError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  Estado inválido!
                </section>
              )}
            </section>

            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='PostalCode'
                className={hasPostalCodeError ? "text-error" : ""}>
                CEP
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validatePostalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                className={hasPostalCodeError ? "border-error" : ""}
              />
              {hasPostalCodeError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  CEP inválido!
                </section>
              )}
            </section>

            <section className='grid w-full items-center gap-1'>
              <Label
                htmlFor='Country'
                className={hasCountryError ? "text-error" : ""}>
                País
              </Label>
              <Input
                type='text'
                id='text'
                onBlur={validateCountry}
                onChange={(event) => setCountry(event.target.value)}
                className={hasCountryError ? "border-error" : ""}
              />
              {hasCountryError && (
                <section className='text-error text-xs font-semibold text-center mt-2'>
                  País inválido!
                </section>
              )}
            </section>
          </CardContent>
          <CardFooter>
            <Button
              className={hasAnyError() ? "!bg-error w-full" : "!w-full"}
              onClick={handleSubmit}>
              {hasAnyError() ? <ShieldAlert /> : "Adicionar Cliente"}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
