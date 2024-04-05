"use client";
import { Pagination as PType } from "@/lib/strapi/app.types";
import {
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Pagination,
} from "./ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function AppPagenation(props: { pagination: PType | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pagination = props.pagination ?? ({} as PType);
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        {(pagination.page ?? 0) > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(pagination.page - 1)}
            />
          </PaginationItem>
        )}
        {/* Page 1 */}
        <PaginationItem>
          <PaginationLink
            className="cursor-pointer"
            isActive={1 === pagination.page}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {/* Page 2 */}
        {(((pagination.page ?? 0) < 5 && pagination.pageCount > 7) ||
            (pagination.pageCount < 8 && pagination.pageCount > 1)) && (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                isActive={2 === pagination.page}
                onClick={() => handlePageChange(2)}
              >
                2
              </PaginationLink>
            </PaginationItem>
          )}
        {/* Page 3 */}
        {(((pagination.page ?? 0) < 5 && pagination.pageCount > 7) ||
            (pagination.pageCount < 8 && pagination.pageCount > 2)) &&(
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={3 === pagination.page}
              onClick={() => handlePageChange(3)}
            >
              3
            </PaginationLink>
          </PaginationItem>
        )}
        {/* Page 4 */}
        {(((pagination.page ?? 0) < 5 && pagination.pageCount > 7 ) ||
        (pagination.pageCount < 8 && pagination.pageCount > 3 )) &&(
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={4 === pagination.page}
              onClick={() => handlePageChange(4)}
            >
              4
            </PaginationLink>
          </PaginationItem>
        )}
        {/* Page 5 */}
        {(((pagination.page ?? 0) < 5 && pagination.pageCount > 7 ) ||
        (pagination.pageCount < 8 && pagination.pageCount > 4 )) &&(
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive={5 === pagination.page}
              onClick={() => handlePageChange(5)}
            >
              5
            </PaginationLink>
          </PaginationItem>
        )}
        {/* ... */}
        {(pagination.page ?? 0) > 4 && pagination.pageCount > 7 && pagination.pageCount - 4 !>= pagination.page &&(
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        {/* Chosen Page - 1*/}
        {(pagination.page ?? 0) > 4 && pagination.pageCount > 7 && pagination.pageCount - 4 !>= pagination.page &&(
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                {pagination.page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
        {/* Chosen Page */}
        {(pagination.page ?? 0) > 4 && pagination.pageCount > 7 && pagination.pageCount - 4 !>= pagination.page &&(
            <PaginationItem>
              <PaginationLink
                isActive={pagination.page === pagination.page}
                onClick={() => handlePageChange(pagination.page)}
              >
                {pagination.page}
              </PaginationLink>
            </PaginationItem>
          )}
        {/* Chosen Page + 1*/}
        {(pagination.page ?? 0) > 4 && pagination.pageCount > 7 && pagination.pageCount - 4 !>= pagination.page &&(
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                {pagination.page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        {/* ... */}
        {(pagination.page ?? 0) > 0 && pagination.pageCount > 7 &&(
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {/* LAST - 4 */}
        {pagination.pageCount - 3 !<= pagination.page && pagination.pageCount > 7 &&(
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                isActive={pagination.pageCount - 4 === pagination.page}
                onClick={() => handlePageChange(pagination.pageCount - 4)}
              >
                {pagination.pageCount - 4}
              </PaginationLink>
            </PaginationItem>
          )}
          {/* LAST - 3 */}
        {pagination.pageCount - 3 !<= pagination.page && pagination.pageCount > 7 &&(
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                isActive={pagination.pageCount - 3 === pagination.page}
                onClick={() => handlePageChange(pagination.pageCount - 3)}
              >
                {pagination.pageCount - 3}
              </PaginationLink>
            </PaginationItem>
          )}
        {/* LAST - 2 */}
        {pagination.pageCount - 3 !<= pagination.page && pagination.pageCount > 7 &&(
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                isActive={pagination.pageCount - 2 === pagination.page}
                onClick={() => handlePageChange(pagination.pageCount - 2)}
              >
                {pagination.pageCount - 2}
              </PaginationLink>
            </PaginationItem>
          )}
        {/* LAST - 1 */}
        {pagination.pageCount - 3 !<= pagination.page && pagination.pageCount > 7 &&(
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                isActive={pagination.pageCount - 1 === pagination.page}
                onClick={() => handlePageChange(pagination.pageCount - 1)}
              >
                {pagination.pageCount - 1}
              </PaginationLink>
            </PaginationItem>
          )}
        {/* LAST */}
        {pagination.pageCount > 5 && (
          <PaginationItem>
            <PaginationLink
              isActive={pagination.pageCount === pagination.page}
              onClick={() => handlePageChange(pagination.pageCount)}
            >
              {pagination.pageCount}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* NEXT */}
        {(pagination.page ?? 0) < pagination.pageCount && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => handlePageChange(pagination.page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default AppPagenation;
