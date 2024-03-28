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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { GoCard } from "@/components/go-card";
import { Separator } from "@/components/ui/separator";
import { Announcement } from "@/components/announcement";
import {
  fetchCategories,
  fetchAppsByCategory,
  fetchPaginationTemplatesByCategory,
} from "@/lib/strapi/actions";
import Link from "next/link";

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
  const filter = searchParams.filter ?? "ALL";
  const categories = await fetchCategories();
  const templates = await fetchPaginationTemplatesByCategory(1, filter, 18);
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
            Not sure how to use getOperate's workflows? <br />
            Start easily with our collection of ready-to-use templates.
          </PageHeaderDescription>

          <div className="lg:w-1/3 mx-auto mt-6 flex gap-1">
            <Input placeholder="Search Template . . ." className="w-full" />
            <a href="#" className={cn(buttonVariants(), "block")}>
              Search
            </a>
          </div>
        </PageHeader>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-1/3 lg:w-1/5 pr-5">
            {/* <h1 className="text-base font-semibold tracking-tighter leading-[1.1] mb-3">
              Sort Template By
            </h1>
            <div className="flex flex-col gap-1">
              <a
                className="text-sm font-medium tracking-tighter leading-[1.1] pl-6 py-2 rounded transition-all hover:bg-go-blue-hover dark:hover:text-black bg-go-blue-10 text-black"
                href="#"
              >
                Top 100 Template
              </a>
              <a
                className="text-sm font-medium tracking-tighter leading-[1.1] pl-6 py-2 rounded transition-all hover:bg-go-blue-hover dark:hover:text-black"
                href="#"
              >
                Beta
              </a>
              <a
                className="text-sm font-medium tracking-tighter leading-[1.1] pl-6 py-2 rounded transition-all hover:bg-go-blue-hover dark:hover:text-black"
                href="#"
              >
                Recently Launched
              </a>
            </div> */}
            <h1 className="any-device text-base font-bold tracking-tighter leading-[1.1] my-3">
              <Link href="/templates">
                    Template Categories
              </Link>
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
                        query: { filter: role },
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
                              query: { filter: item?.attributes?.slug },
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
            <Accordion type="single" collapsible className="phone-device w-full border-0">
              <AccordionItem value="template-cate" className="border-0">
                <AccordionTrigger className="text-base font-bold py-2 hover:no-underline text-left">
                  <Link href="/templates">
                    Template Categories
                </Link>
                </AccordionTrigger>
                <AccordionContent>
            {Object.entries(categories).map(([role, items], index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full border-0"
              >
                <AccordionItem value={`item-${index}`} className="border-0">
                  <AccordionTrigger className="py-2 hover:no-underline text-left">
                    <Link
                      href={{
                        pathname: "/templates",
                        query: { filter: role },
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
                              query: { filter: item?.attributes?.slug },
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
            <div className="justify-between flex items-baseline">
              <h1 className="text-4xl font-bold tracking-tighter leading-[1.1] mb-6">
                {filter === "ALL" ? "Template Families" : slugToTitle(filter)}
              </h1>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              {templates.map((template, index) => (
                <GoCard
                  link={`/templates/${template.attributes?.slug}`}
                  title={template.attributes?.title}
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
                  {template.attributes.description}
                </GoCard>
              ))}

              {/* <GoCard
                link="#"
                title="Round-robin tasks outreach"
                icon={
                  <>
                    <Image
                      src="/icon-salesforce.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-line.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-pgsql.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-rss.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
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
                      src="/icon-pgsql.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
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
                title="Round-robin tasks outreach"
                icon={
                  <>
                    <Image
                      src="/icon-salesforce.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-line.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-pgsql.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-rss.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
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
                Efficiently reach out to your closed-won deals by using
                round-robin tasks. Efficiently reach out to your closed-won
                deals by using round-robin tasks. Efficiently reach out to your
                closed-won deals by using round-robin tasks.
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
                title="Round-robin tasks outreach"
                icon={
                  <>
                    <Image
                      src="/icon-salesforce.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-line.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-pgsql.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <Image
                      src="/icon-rss.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
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
                Efficiently reach out to your closed-won deals by using
                round-robin tasks. Efficiently reach out to your closed-won
                deals by using round-robin tasks. Efficiently reach out to your
                closed-won deals by using round-robin tasks.
              </GoCard>
            </div> */}
            </div>

            <div className="w-full">
              <button
                className={cn(buttonVariants(), "mt-6 block mx-auto px-20")}
              >
                Load more
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Templates;
