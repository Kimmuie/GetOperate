'use client'

import Link from "next/link";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Category, ResponseCategories } from "@/lib/strapi/category.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GoCardAttr {
  title?: string;
  children?: ReactNode;
  category?: ResponseCategories;
  icon?: ReactNode;
  link: string;
  categorylink: string;
  className?: string;
}

function GoCard({
  categorylink,
  className,
  title,
  category,
  icon,
  link,
  children,
  ...props
}: GoCardAttr) {
  // var numToShow = 3
  const cardRef = useRef<HTMLDivElement>(null);
  const [numToShow, setNumToShow] = useState(0);

  useEffect(() => {
    const updateNumToShow = () => {
      if (cardRef.current && cardRef.current.parentElement) {
        const cardWidth = cardRef.current.offsetWidth;
        // const cardsContainerWidth = cardRef.current.parentElement.offsetWidth;
        const cardsPerRow = Math.floor(cardWidth / 150);
        setNumToShow(cardsPerRow);
      }
    };

    updateNumToShow();
    window.addEventListener("resize", updateNumToShow);
    return () => {
      window.removeEventListener("resize", updateNumToShow);
    };
  }, []);
  // const [numToShow, setNumToShow] = useState(0);
  // useEffect(() => {
  //   const updateNumToShow = () => {
  //     const screenWidth = window.innerWidth;

  //     if (screenWidth <= 470) {
  //       setNumToShow(3);
  //     } else if (screenWidth <= 768) {
  //       setNumToShow(5);
  //     } else if (screenWidth <= 1023) {
  //       setNumToShow(6);
  //     }else if (screenWidth <= 1370) {
  //       setNumToShow(2);
  //     } else {
  //       setNumToShow(3);
  //     } 
  //   };
  //   updateNumToShow();
  //   window.addEventListener("resize", updateNumToShow);
  //   return () => {
  //     window.removeEventListener("resize", updateNumToShow);
  //   };
  // }, []);

  return (  
    <>
      <Link href={link} className="flex">
        <div
          ref={cardRef}
          className={cn(
            "w-full border border-gray-200 rounded-2xl p-5 flex flex-col bg-white hover:bg-gray-50 dark:bg-[#222] dark:hover:bg-black transition-all",
            className
          )}
          {...props}
        >
          <div className="flex gap-3 items-center">{icon}</div>
          <h1 className="text-xl font-semibold tracking-tighter leading-[1.1] mt-6 mb-2 line-clamp-2">
            {title}
          </h1>
          <p className="text-sm font-medium line-clamp-3">{children}</p>
          <div className="mt-auto">
          <div className="h-10 text-sm px-1qr border-t border-t-grey-lighter flex items-center justify-between mt-2">
            <div className="flex flex-auto items-center justify-between overflow-clip">
              <div className="order-2 flex flex-auto items-center py-qr gap-x-qr justify-start text-sm font-medium gap-2" >
                {category?.data.slice(0, numToShow).map((cat: Category) => (
              <Link href={categorylink+cat.attributes?.slug}>
                <div key={cat.id} className="mt-2 flex items-center rounded-2px border border-[#c0c0c0] border-opacity-30 leading-none shadow-xs overflow-clip bg-[#c0c0c0] hover:bg-opacity-40 bg-opacity-10 rounded-lg">
                    <div className="px-qr p-1 max-w-24 hover:max-w-full text-xs truncate ~">{/* hover:max-w-96 */}
                      <span key={cat.id}>{cat.attributes?.title}</span>
                    </div>
                </div>
                
              </Link>
              ))}
              {category?.data.length > numToShow && (
                <TooltipProvider>
                < Tooltip>
                    <TooltipTrigger>
                      <div className="mt-2 flex items-center rounded-2px border border-[#c0c0c0] border-opacity-30 leading-none shadow-xs overflow-clip bg-[#c0c0c0] hover:bg-opacity-40 bg-opacity-10 rounded-lg">
                          <div className="px-qr p-1 max-w-24 text-xs truncate ~">
                            <span>+{category.data.length - numToShow}</span>
                          </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                    {category?.data.slice(numToShow, category.data.length).map((cat: Category) => (
                      <p key={cat.id}>{cat.attributes?.title}</p> 
                    ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </Link>
    </>
  );
}

function GoCardHorizontal({
  className,
  title,
  icon,
  link,
  children,
  ...props
}: GoCardAttr) {
  return (
    <>
      <Link href={link} className="flex">
        <div
          className={cn(
            "w-full border border-gray-200 rounded-2xl p-6 pt-0 grid grid-cols-6 bg-white hover:bg-gray-50 dark:bg-[#222] dark:hover:bg-black transition-all",
            className
          )}
          {...props}
        >
          <div className="flex items-center">{icon}</div>
          <div className="col-span-5">
            <h1 className="text-xl font-semibold tracking-tighter leading-[1.1] mt-6 mb-2 line-clamp-2">
              {title}
            </h1>
            <p className="text-sm font-medium line-clamp-3">{children}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export { GoCard, GoCardHorizontal };
