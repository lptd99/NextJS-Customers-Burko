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
  texts: string[];
  links: string[];
}

export default function DynamicBreadcrumb({
  className,
  texts,
  links,
}: IDynamicBreadcrumbProps) {
  const router = useRouter();
  return (
    <section className='mb-2 items-left ml-4'>
      <Breadcrumb>
        <BreadcrumbList>
          {texts.map((text, index) => (
            <>
              {index < texts.length - 1 && (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink
                    className={className}
                    href={links[index]}>
                    {text}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {index < texts.length - 1 && (
                <BreadcrumbSeparator className={className} />
              )}
              {index === texts.length - 1 && (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink className={className}>{text}</BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}
