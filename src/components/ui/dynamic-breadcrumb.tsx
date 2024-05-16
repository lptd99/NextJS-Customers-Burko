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
  );
}
