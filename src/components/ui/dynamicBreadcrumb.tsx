import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

interface IDynamicBreadcrumbProps {
  className: string;
  text: string;
  link: string;
}

export default function DynamicBreadcrumb({
  className,
  text,
  link,
}: IDynamicBreadcrumbProps) {
  const texts = text.split(", ");
  const links = link.split(", ");
  const router = useRouter();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {texts.map((text, index) => (
          <section
            key={index + "s"}
            className='flex-row flex w-content'>
            {index < texts.length - 1 && (
              <BreadcrumbItem key={index + "i"}>
                <BreadcrumbLink
                  className={className}
                  href={links[index]}
                  key={index + "l"}>
                  {text}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < texts.length - 1 && (
              <BreadcrumbSeparator
                className={className + "mt-[3px] ml-1.5"}
                key={index + "s"}
              />
            )}
            {index === texts.length - 1 && (
              <BreadcrumbItem key={index + "ii"}>
                <BreadcrumbLink
                  className={className}
                  key={index + "li"}>
                  {text}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </section>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
