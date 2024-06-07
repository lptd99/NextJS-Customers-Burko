import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface Props {
  page: number | null;
  firstPage: number | null;
  lastPage: number | null;
}

function DynamicPagination(props: Props) {
  const { page, firstPage, lastPage } = props;

  return (
    <>
      {page && firstPage && lastPage ? (
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
                href={page - 1 < firstPage ? "#" + page : "#" + (page - 1)}>
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
                href={page + 1 > lastPage ? "#" + page : "#" + (page + 1)}>
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
      ) : (
        console.log(
          "Error loading pagination. Page: ",
          page,
          " | First Page: ",
          firstPage,
          " | Last Page: ",
          lastPage
        )
      )}
    </>
  );
}

export default DynamicPagination;
