import Image from "next/image";
import Link from "next/link";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GoCard } from "@/components/go-card";
// import { GoNode, GoNodeEnd, GoNodeStatus } from "@/components/go-node";
import {
  fetchTemplateBySlug,
  fetchRandomTemplates,
  fetchCategories,
  fetchPaginationTemplatesByCategory,
} from "@/lib/strapi/actions";
import Markdown from "react-markdown";
import Reactflow from "@/components/reactflow";

export async function generateMetadata(props: { params: { locale: string } }) {
  return {
    title: "Template",
    description: "",
  };
}

const Template = async ({ params }: { params: { slug: string } }) => {
  const template = await fetchTemplateBySlug(params.slug);
  const description = template?.attributes?.description;
  // const categories = await fetchCategories();
  // const templates = await fetchPaginationTemplatesByCategory();
  return (
    <div className="container relative">
      <div className="flex flex-col xl:flex-row">
        <PageHeader className="w-full items-start">
          <nav className="mb-6 flex items-center gap-2 text-sm">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60"
              )}
            >
              Home
            </Link>
            <Separator className="mx-2 h-4" orientation="vertical" />
            <Link
              href="/templates"
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60"
              )}
            >
              Templates
            </Link>
            <Separator className="mx-2 h-4" orientation="vertical" />
            <span>{template?.attributes?.title}</span>
          </nav>
          <PageHeaderHeading className="max-w-4xl text-left">
            {template?.attributes?.title} templates
          </PageHeaderHeading>
          <PageActions className="mt-6 lg:justify-start">
            <Link
              target="_blank"
              href="https://docs.getoperate.com/overview"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Template Document
            </Link>
            <Link href="#" className={cn(buttonVariants())}>
              Use Template
            </Link>
          </PageActions>
          <div className="descriptionblock shrink-0 flex gap-20 max-w-2xl">
            <div className="markdownformat text-paragraph max-w-2xl break-normal">
              {/*max-w-4xl */}
              <Markdown>{description}</Markdown>
            </div>
          </div>
        </PageHeader>

        <div className="sticky top-16 left-10 max-w-[1280px] flex-col h-[80vh] items-center gap-2 w-full justify-between overscroll-auto">
        {/* mt-16 ml-10 */}
          <Reactflow />
        </div>
      </div>
      <div className="mb-12 mt-20 text-center">
        <PageHeaderHeading className="mx-auto max-w-4xl">
          Create your first workflow
        </PageHeaderHeading>
        <PageHeaderDescription className="mt-3">
          Quickly automate workflows with [Google Sheets] and [Trello] using
          getOperate's templates.
        </PageHeaderDescription>
      </div>
      <div className="mb-12 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {/* {templates.data.map((template, index) => (
                <GoCard
                link={`/templates/${template.attributes?.slug}`}
                title={template.attributes?.title}
                category={
                  template.attributes.categories as any as ResponseCategories
                }
                categorylink={{
                  pathname: "/templates",
                  // query: category
                }}
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
                {template.attributes.description.replace(/#/g, '')}
              </GoCard>
              ))} */}
      </div>
    </div>
  );
};

export default Template;
