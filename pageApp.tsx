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
  fetchPaginationAppsByCategory,
} from "@/lib/strapi/actions";
import Link from "next/link";
import PageLimit from "@/components/pagelimit";
import SearchPP from "@/components/searchpp";
import SortSelect from "@/components/sortselect";
import AppPagenation from "@/components/apppagination";
import { Category, ResponseCategories } from "@/lib/strapi/category.types";
import { redirect } from "next/navigation";

interface GoCardAttr {
  category?: ResponseCategories;
}

export async function generateMetadata(props: { params: { locale: string } }) {
  return {
    title: "getOperate - Applications",
    description:
      "The solution for building internal operation tools including jobs, workflows, data pipelines, api endpoints, and UIs.",
  };
}

const Apps = async ({
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
  if (!categories) return null;
  // if page and appsPerPage are not numbers, reset the query
  if (isNaN(Number(page)) || isNaN(Number(appsPerPage)))
    return redirect("/apps");
  const apps = await fetchPaginationAppsByCategory(
    Number(page),
    category,
    Number(appsPerPage),
    String(search),
    String(sort)
  );

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
          {/* <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium mx-auto">
            📝
            <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span>Over 6,000 templates, Explore now</span>
          </div> */}
          <PageHeaderHeading className="max-w-xl mx-auto">
            Accelerate your app integration process
          </PageHeaderHeading>
          <PageHeaderDescription className="mt-3 mx-auto">
            Quickly integrate apps with or without coding.
            <br />
            Save time and streamline your workflow with just a few clicks.
          </PageHeaderDescription>
          {/* <div className="lg:w-1/3 mx-auto mt-6 flex gap-1">
            <Input placeholder="Search Application . . ." className="w-full" />
            <a href="#" className={cn(buttonVariants(), "block")}>
              Search
            </a>
          </div> */}
        </PageHeader>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-1/3 lg:w-1/5 pr-5">

            <h1 className="any-device text-base font-bold tracking-tighter leading-[1.1] my-3">
              <Link href="/apps">App Categories</Link>
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
                        pathname: "/apps",
                        query: { category: role },
                      }}
                      scroll={false}
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
                          {/* <a href="#">{item.attributes.title}</a> */}
                          <Link
                            href={{
                              pathname: "/apps",
                              query: { category: item?.attributes?.slug },
                            }}
                            scroll={false}
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
              <AccordionItem value="app-cate" className="border-0">
                <AccordionTrigger className="text-base font-bold py-2 hover:no-underline text-left">
                  <Link href="/apps">App Categories</Link>
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
                              pathname: "/apps",
                              query: { category: role },
                            }}
                            scroll={false}
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
                                {/* <a href="#">{item.attributes.title}</a> */}
                                <Link
                                  href={{
                                    pathname: "/apps",
                                    query: { category: item?.attributes?.slug },
                                  }}
                                  scroll={false}
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
                {category === "ALL" ? "Integrated Apps" : slugToTitle(category)}
              </h1>
              <div className="flex flex-col-reverse sm:flex-row gap-3 items-left sm:items-center  justify-between w-full">
                <div>
                  <p className="text-primary text-sm">
                    Showing {apps.data.length} results from{" "}
                    {apps.meta.pagination?.total} total apps
                  </p>
                </div>
                <div className="flex gap-5 items-end">
                  <PageLimit pagination={apps.meta.pagination} />
                  <SortSelect />
                  <SearchPP />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {apps.data.map((app, index) => (
                <GoCard
                  link={`/apps/${app.attributes?.slug}`}
                  title={app.attributes?.title}
                  category={
                    app.attributes?.categories as any as ResponseCategories
                  }
                  categorylink={"/apps?category="}
                  key={index}
                  icon={
                    <>
                      <Image
                        src={`https://go-app-images.s3.ap-southeast-1.amazonaws.com/${app?.attributes?.slug}.png`}
                        alt="icon"
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                    </>
                  }
                >
                  {app.attributes?.description.replace(/[#`_*~>]/g, "").replace(/<u>/g, "").replace(/<\/u>/g, "")}
                </GoCard>
              ))}
              {/* <GoCard
                link="/apps/newpage"
                title="Line"
                icon={
                  <>
                    <Image
                      src="/icon-line.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  </>
                }
              >
                Efficiently reach out to your closed-won deals by using
                round-robin tasks. Efficiently reach out to your closed-won
                deals by using round-robin tasks. Efficiently reach out to your
                closed-won deals by using round-robin tasks.
              </GoCard>
              <GoCard
                link="#"
                title="Add closed deals to MixMax with AI and Slack"
                icon={
                  <>
                    <Image
                      src="/icon-line.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  </>
                }
              >
                Elevate your sales strategy with this AI-powered triage template
                and seamlessly integrate with MixMax for timely engagement with
                won deals.
              </GoCard>
              <GoCard
                link="#"
                title="Won deal summary"
                icon={
                  <>
                    <Image
                      src="/icon-pgsql.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  </>
                }
              >
                Set up a workflow that uses AI to outline your won deal and
                provide insight on what works in your sales strategy.
              </GoCard>
              <GoCard
                link="#"
                title="Customer renewal date autofill"
                icon={
                  <>
                    <Image
                      src="/icon-rss.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  </>
                }
              >
                Fill in customer renewal dates without fault to keep your
                Customer Success List up to date.
              </GoCard>
              <GoCard
                link="#"
                title="Won deal summary"
                icon={
                  <>
                    <Image
                      src="/icon-openai.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  </>
                }
              >
                Set up a workflow that uses AI to outline your won deal and
                provide insight on what works in your sales strategy.
              </GoCard> */}
            </div>
            <div className="w-full flex items-center justify-center my-10">
              <AppPagenation pagination={apps.meta.pagination} />
            </div>
            {/* <div className="w-full">
              <button
                className={cn(buttonVariants(), "mt-6 block mx-auto px-20")}
              >
                Load more
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Apps;
