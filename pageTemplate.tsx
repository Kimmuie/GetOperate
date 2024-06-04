import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/page-header";
import { GoCard } from "@/components/go-card";
import { Separator } from "@/components/ui/separator";
import {
  fetchCategories,
  fetchPaginationTemplatesByCategory,
} from "@/lib/strapi/actions";
import Link from "next/link";
import PageLimit from "@/components/pagelimit";
import SearchPP from "@/components/searchpp";
import SortSelect from "@/components/sortselect";
import AppPagenation from "@/components/apppagination";
import { Category, ResponseCategories } from "@/lib/strapi/category.types";

interface GoCardAttr {
  category?: ResponseCategories;
}

export async function generateMetadata(props: { params: { locale: string } }) {
  return {
    title: "Templates",
    description: "",
  };
}

const Templates = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const category = searchParams.category ?? "ALL";
  const page = searchParams.page ?? 1;
  const appsPerPage = searchParams.perPage ?? 9;
  const search = searchParams.search ?? "";
  const sort = searchParams.sort ?? "title";
  const categories = await fetchCategories();
  const templates = await fetchPaginationTemplatesByCategory(
    Number(page),
    category,
    Number(appsPerPage),
    String(search),
    String(sort)
  );
  // console.log(templates)
  function slugToTitle(slug: string): string {
    return slug
      .split("-") // Split the slug by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join them with a space
  }

  return (
    <>
      <div className="container relative mb-20">
        <PageHeader className="w-full items-start">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium mx-auto">
            📝
            <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span>Over 6,000 automation templates</span>
          </div>
          <PageHeaderHeading className="max-w-xl mx-auto">
            Automation Templates
          </PageHeaderHeading>
          <PageHeaderDescription className="mt-3 mx-auto">
            Not sure how to use getOperate&apos;s workflows? <br />
            Start easily with our collection of ready-to-use templates.
          </PageHeaderDescription>
        </PageHeader>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-1/3 lg:w-1/5 pr-5">
            <h1 className="any-device text-base font-bold tracking-tighter leading-[1.1] my-3">
              <Link href="/templates">Template Categories</Link>
            </h1>
            {Object.entries(categories).map(([role, items], index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="any-device w-full border-0"
              >
                <AccordionItem value={`item-${index}`} className="border-0">
                  <AccordionTrigger className="py-2 hover:no-underline text-left">
                    <Link
                      href={{
                        pathname: "/templates",
                        query: { category: role },
                      }}
                    >
                      {role}
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="pl-6 py-1 rounded hover:bg-go-blue-hover dark:hover:text-black"
                        >
                          <Link
                            href={{
                              pathname: "/templates",
                              query: { category: item?.attributes?.slug },
                            }}
                          >
                            {item?.attributes?.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <Accordion
              type="single"
              collapsible
              className="phone-device w-full border-0"
            >
              <AccordionItem value="template-cate" className="border-0">
                <AccordionTrigger className="text-base font-bold py-2 hover:no-underline text-left">
                  <Link href="/templates">Template Categories</Link>
                </AccordionTrigger>
                <AccordionContent>
                  {Object.entries(categories).map(([role, items], index) => (
                    <Accordion
                      key={index}
                      type="single"
                      collapsible
                      className="w-full border-0"
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="border-0"
                      >
                        <AccordionTrigger className="py-2 hover:no-underline text-left">
                          <Link
                            href={{
                              pathname: "/templates",
                              query: { category: role },
                            }}
                          >
                            {role}
                          </Link>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul>
                            {items.map((item) => (
                              <li
                                key={item.id}
                                className="pl-6 py-1 rounded hover:bg-go-blue-hover dark:hover:text-black"
                              >
                                <Link
                                  href={{
                                    pathname: "/templates",
                                    query: { category: item?.attributes?.slug },
                                  }}
                                >
                                  {item?.attributes?.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full">
            <div className="justify-between flex items-baseline flex-col  mb-10">
              <h1 className="text-4xl font-bold tracking-tighter leading-[1.1] mb-6">
                {category === "ALL" ? "Template Families" : slugToTitle(category)}
              </h1>
              <div className="flex flex-col-reverse sm:flex-row gap-3 items-left sm:items-center  justify-between w-full">
                <div>
                  <p className="text-primary text-sm">
                    Showing {templates.data.length ?? 0} results from{" "}
                    {templates.meta.pagination?.total} total templates
                  </p>
                </div>
                <div className="flex gap-5 items-end">
                  <PageLimit pagination={templates.meta.pagination} />
                  <SortSelect />
                  <SearchPP />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {templates.data.map((template, index) => (
                <GoCard
                  link={`/templates/${template.attributes?.slug}`}
                  title={template.attributes?.title}
                  category={
                    template.attributes.categories as any as ResponseCategories
                  }
                    categorylink={"/templates?category="}
                  key={index}
                  icon={template.attributes.apps?.data?.map((app, index) => (
                    <Image
                      src={`https://go-app-images.s3.ap-southeast-1.amazonaws.com/${app?.attributes?.slug}.png`}
                      key={index}
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  ))}
                >
                  <></>
                  {template.attributes.description.replace(/[#`_*~>]/g, "").replace(/<u>/g, "").replace(/<\/u>/g, "")}
                </GoCard>
              ))}
            </div>

            <div className="w-full flex items-center justify-center my-10">
              <AppPagenation pagination={templates.meta.pagination} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Templates;
