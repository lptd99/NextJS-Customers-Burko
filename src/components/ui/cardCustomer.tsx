import { ICustomer } from "@/app/interfaces/interfaces";
import { cn } from "@/lib/utils";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./button";

interface ICardCustomerProps {
  customer: ICustomer;
  className?: string;
}

export default function CardCustomer(props: ICardCustomerProps) {
  return (
    <Card
      className={cn(
        props.customer.inactive === true ? "!border-red-500" : "",
        props.className,
        "relative w-full border border-primary/15 rounded-xl p-4 "
      )}>
      {props.customer.inactive === true && (
        <section className='absolute top-4 right-4 bg-red-500 text-sm text-white rounded-md px-3 py-1'>
          Inativo
        </section>
      )}
      <CardHeader className='flex gap-3 items-start'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          className='!opacity-100 mt-1'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex items-start flex-col'>
          <p className='text-md'>{props.customer.name}</p>
          <p className='text-small text-default-500'>
            {props.customer.city}, {props.customer.state}
          </p>
        </div>
      </CardHeader>
      <Divider className='bg-divider h-[1px] mt-2' />
      <CardBody className='py-4 flex-row justify-between text-sm'>
        <section>{props.customer.cpf}</section>
        <section>{props.customer.commodity}</section>
      </CardBody>
      <Divider className='bg-divider h-[1px]' />
      <CardFooter className='flex pt-4 w-full flex-row'>
        {/*// Inactive tag made alone, before code-through.
           // Commented for future reference, unused because the other option is better
        <section className='flex justify-start w-full'>
          {props.customer.inactive ? (
            <p className='flex font-bold text-red-500 ml-6'>Inativo</p>
          ) : (
            <></>
          )}
        </section>
        */}
        <section className='flex justify-end gap-2 w-full'>
          <Button
            variant='outline'
            className='h-content w-15'>
            <Pencil />
          </Button>
          <Button
            className='h-content w-15'
            variant='destructive'>
            <Trash2 />
          </Button>
        </section>
      </CardFooter>
    </Card>
  );
}
