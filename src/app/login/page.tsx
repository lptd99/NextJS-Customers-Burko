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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [hasPasswordError, setHasPasswordError] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setHasEmailError(false);
    setHasPasswordError(false);
  }, [email, password]);

  useEffect(() => {
    localStorage.getItem("customersApp_token")
      ? router.push("/dashboard")
      : setRender(true);
  }, [router]);

  // function handleSubmit2() {
  //   try {
  //     if (validateForm()) router.push("/dashboard");
  //     else console.log("Erros!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handleSubmit() {
    //2 validateForm()
    try {
      const options = {
        method: "POST",
        url: "http://localhost:4000/login",
        headers: {
          "Content-Type": "application/json",
          "api-key": "jkehruiyouiouiryuiy4ui3y719y371y4u32iijfhkjdwgkg",
        },
        body: JSON.stringify({ email: email, password: password }),
      };
      //1   if (validateForm()) {
      //2   if (!hasAnyError()) {
      if (email && password) {
        const response = await fetch(
          "http://localhost:4000/login" /*, options*/
        );
        const data = await response.json();
        if (data.token && !hasAnyError()) {
          console.log(data);
          router.push("/dashboard");
          localStorage.setItem(
            "customersApp_token",
            JSON.stringify(data.token)
          );
        }
      } else {
        validateForm();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function hasAnyError() {
    return hasEmailError || hasPasswordError;
  }

  function validateEmail() {
    setHasEmailError(email.length === 0);
  }

  function validatePassword() {
    setHasPasswordError(password.length === 0);
  }

  function validateForm() {
    validateEmail();
    validatePassword();
    return !hasAnyError();
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-10 gap-8'>
      {render && (
        <>
          <section className='flex w-[16rem] h-[4rem] items-center justify-center'>
            <Image
              src='/next.svg'
              width={300}
              height={100}
              alt='Logo NextJS'
            />
          </section>
          <Card className='w-full sm:w-[30rem]'>
            <CardHeader className='w-full items-center gap-1'>
              <CardTitle>Autenticação</CardTitle>
              <CardDescription>Preencha os dados abaixo</CardDescription>
            </CardHeader>
            <CardContent className='grid w-full items-center gap-8'>
              <section className='grid w-full items-center gap-1'>
                <Label
                  htmlFor='Email'
                  className={hasEmailError ? "text-error" : ""}>
                  E-mail
                </Label>
                <Input
                  type='text'
                  id='text'
                  placeholder='Digite seu e-mail'
                  onBlur={(event) => validateEmail()}
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
                  htmlFor='Password'
                  className={hasPasswordError ? "text-error" : ""}>
                  Senha
                </Label>
                <Input
                  type='password'
                  id='password'
                  placeholder='Digite sua senha'
                  onBlur={(event) => validatePassword()}
                  onChange={(event) => setPassword(event.target.value)}
                  className={hasPasswordError ? "border-error" : ""}
                />
                {hasPasswordError && (
                  <section className='text-error text-xs font-semibold text-center mt-2'>
                    Senha inválida!
                  </section>
                )}
              </section>
            </CardContent>
            <CardFooter>
              <Button
                className={hasAnyError() ? "!bg-error w-full" : "!w-full"}
                onClick={handleSubmit}>
                {hasAnyError() ? <ShieldAlert /> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </main>
  );
}
