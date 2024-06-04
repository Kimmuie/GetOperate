import Image from "next/image";
import Link from "next/link";
import {
	PageActions,
	PageHeader,
	PageHeaderHeading,
	PageHeaderDescription,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { GoCard, GoCardHorizontal } from "@/components/go-card";
import { Category, ResponseCategories } from "@/lib/strapi/category.types";
import { fetchAppBySlug, fetchRandomApps } from "@/lib/strapi/actions";

interface GoCardAttr {
  category?: ResponseCategories;
}

export async function generateMetadata(props: { params: { locale: string } }) {
	return {
		title: "getOperate - Application",
		description:
			"The solution for building internal operation tools including jobs, workflows, data pipelines, api endpoints, and UIs.",
	};
}

const App = async ({ params }: { params: { app_slug: string } }) => {
	const apps = await fetchRandomApps();
	const app = await fetchAppBySlug(params.app_slug);
  const description = app?.attributes?.description;
	const actions = app?.attributes?.actions?.data ?? [];
	return (
		<>
			<div className="container relative pb-20">
				<div className="flex flex-col xl:flex-row">
					<PageHeader className="w-full items-start">
						<nav className="flex items-center gap-2 text-sm mb-6">
							<Link
								href="/"
								className={cn(
									"transition-colors hover:text-foreground/80 text-foreground/60"
								)}
							>
								Home
							</Link>
							<Separator
								className="mx-2 h-4"
								orientation="vertical"
							/>
							<Link
								href="/apps"
								className={cn(
									"transition-colors hover:text-foreground/80 text-foreground/60"
								)}
							>
								Apps
							</Link>
							<Separator
								className="mx-2 h-4"
								orientation="vertical"
							/>
							<span>{app?.attributes?.title}</span>
						</nav>
						<PageHeaderHeading className="max-w-4xl text-left">
							{app?.attributes?.title} integrations
						</PageHeaderHeading>
						<PageHeaderDescription className="mt-3 text-left">
              <div className="descriptionblock shrink-0 flex gap-20 max-w-2xl">
					    	<div className="markdownformat text-paragraph max-w-2xl break-normal">
					    		{/*max-w-4xl */}
					    		<Markdown>{description}</Markdown>
					    	</div>
					    </div>
							{/* Create and automate workflows effortlessly with{" "}
              {app?.attributes?.title} integrations, connecting to over 1,500+
              apps through triggers and action events. For custom solutions, you
              can write code in Python, TypeScript, or SQL to integrate any app
              or API in seconds. */}
						</PageHeaderDescription>
						<PageActions className="lg:justify-start mt-6">
							<Link
								target="_blank"
								href="https://docs.getoperate.com/overview"
								className={cn(
									buttonVariants({ variant: "outline" })
								)}
							>
								Resources
							</Link>
							<Link
								href="https://crpuugh42kf.typeform.com/to/i7DoziQy"
								className={cn(buttonVariants())}
							>
								Contact Sales
							</Link>
						</PageActions>
					</PageHeader>
					<PageHeader className="w-full gap-0 flow-sample justify-center lg:pt-0">
						<Image
							src={`https://go-app-images.s3.ap-southeast-1.amazonaws.com/${app?.attributes?.slug}.png`}
							alt="icon"
							width={300}
							height={300}
							className="rounded-lg"
						/>
					</PageHeader>
				</div>
				<div className="flex flex-col gap-8">
					<PageHeader className="w-full mx-auto lg:py-10 lg:pt-0">
						<PageHeaderHeading className="max-w-4xl md:text-4xl">
							Automate your {app?.attributes?.title} workflow with
							premade actions
						</PageHeaderHeading>
						<PageHeaderDescription className="mt-3">
							Quickly integrate {app?.attributes?.title} with
							thousands of apps for automated workflows using our
							no-code toolkit or AI copilot for custom actions.
						</PageHeaderDescription>
					</PageHeader>
					<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
						{/* {JSON.stringify(app?.attributes?.actions.data)} */}
						{actions.map((action, index) => (
							<GoCardHorizontal
								key={action.id || index}
								link={`/apps/${app?.attributes?.slug}/actions/${action.attributes?.slug}`}
								title={action.attributes?.title}
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
								{action.attributes?.description.replace(/[#`_*~>]/g, "").replace(/<u>/g, "").replace(/<\/u>/g, "")}
							</GoCardHorizontal>
						))}
					</div>
					{/* <div className="w-full">
            <button
              className={cn(buttonVariants(), "mt-6 block mx-auto px-20")}
            >
              Load more
            </button>
          </div> */}
				</div>
				<div className="flex flex-col gap-8">
					<PageHeader className="w-full mx-auto lg:pt-20 lg:pb-4">
						<PageHeaderHeading className="max-w-4xl md:text-4xl">
							Connect any app with {app?.attributes?.title}
						</PageHeaderHeading>

						<PageHeaderDescription className="mt-3">
							With our workflow automation, you can now integrate
							with any application.
						</PageHeaderDescription>

						{/* <div className="lg:w-1/3 mx-auto mt-6 flex gap-1">
              <Input
                placeholder="Search Application . . ."
                className="w-full"
              />
              <a href="#" className={cn(buttonVariants(), "block")}>
                Search
              </a>
            </div> */}
					</PageHeader>
				</div>
				<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
					{apps.map((app, index) => (
						<GoCard
							key={index}
							link={`/apps/${app.attributes?.slug}`}
							title={app.attributes?.title}
              category={
                app.attributes?.categories as any as ResponseCategories
              }
              categorylink={"/apps?category="}
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
					{/* <GoCardHorizontal
            link="/apps/newpage"
            title="Line"
            icon={
              <Image
                src="/icon-line.png"
                alt="icon"
                width={32}
                height={32}
                className="rounded-lg"
              />
            }
          >
            Efficiently reach out to your closed-won deals by using round-robin
            tasks. Efficiently reach out to your closed-won deals by using
            round-robin tasks. Efficiently reach out to your closed-won deals by
            using round-robin tasks.
          </GoCardHorizontal>
          <GoCardHorizontal
            link="#"
            title="Add closed deals to MixMax with AI and Slack"
            icon={
              <Image
                src="/icon-line.png"
                alt="icon"
                width={32}
                height={32}
                className="rounded-lg"
              />
            }
          >
            Elevate your sales strategy with this AI-powered triage template and
            seamlessly integrate with MixMax for timely engagement with won
            deals.
          </GoCardHorizontal>
          <GoCardHorizontal
            link="#"
            title="Won deal summary"
            icon={
              <Image
                src="/icon-pgsql.png"
                alt="icon"
                width={32}
                height={32}
                className="rounded-lg"
              />
            }
          >
            Set up a workflow that uses AI to outline your won deal and provide
            insight on what works in your sales strategy.
          </GoCardHorizontal>
          <GoCardHorizontal
            link="#"
            title="Customer renewal date autofill"
            icon={
              <Image
                src="/icon-rss.png"
                alt="icon"
                width={32}
                height={32}
                className="rounded-lg"
              />
            }
          >
            Fill in customer renewal dates without fault to keep your Customer
            Success List up to date.
          </GoCardHorizontal>
          <GoCardHorizontal
            link="#"
            title="Won deal summary"
            icon={
              <Image
                src="/icon-openai.png"
                alt="icon"
                width={32}
                height={32}
                className="rounded-lg"
              />
            }
          >
            Set up a workflow that uses AI to outline your won deal and provide
            insight on what works in your sales strategy.
          </GoCardHorizontal>

          <GoCardHorizontal
            link="#"
            title="Won deal summary"
            icon={
              <Image
                src="/icon-openai.png"
                alt="icon"
                width={32}
                height={32}
                className="rounded-lg"
              />
            }
          >
            Set up a workflow that uses AI to outline your won deal and provide
            insight on what works in your sales strategy.
          </GoCardHorizontal> */}
				</div>
				<div className="w-full">
					<button
						className={cn(
							buttonVariants(),
							"mt-6 block mx-auto px-20"
						)}
					>
						<Link href={`/apps`}>View All Applications</Link>
					</button>
				</div>
				{/* <div className="flex flex-col gap-8">
          <PageHeader className="w-full mx-auto lg:pt-20 lg:pb-4">
            <PageHeaderHeading className="max-w-4xl md:text-4xl">
              Popular Line workflows.
            </PageHeaderHeading>
            <PageHeaderDescription className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit impedit, dolorem consequatur laboriosam,
            </PageHeaderDescription>
            <div className="lg:w-1/3 mx-auto mt-6 flex gap-1">
              <Input
                placeholder="Search Application . . ."
                className="w-full"
              />
              <a href="#" className={cn(buttonVariants(), "block")}>
                Search
              </a>
            </div>
          </PageHeader>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <GoCard
              link="/templates/newpage"
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
              round-robin tasks. Efficiently reach out to your closed-won deals
              by using round-robin tasks. Efficiently reach out to your
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
              Fill in customer renewal dates without fault to keep your Customer
              Success List up to date.
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
              Fill in customer renewal dates without fault to keep your Customer
              Success List up to date.
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
              round-robin tasks. Efficiently reach out to your closed-won deals
              by using round-robin tasks. Efficiently reach out to your
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
              Fill in customer renewal dates without fault to keep your Customer
              Success List up to date.
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
              round-robin tasks. Efficiently reach out to your closed-won deals
              by using round-robin tasks. Efficiently reach out to your
              closed-won deals by using round-robin tasks.
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
              Fill in customer renewal dates without fault to keep your Customer
              Success List up to date.
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
              round-robin tasks. Efficiently reach out to your closed-won deals
              by using round-robin tasks. Efficiently reach out to your
              closed-won deals by using round-robin tasks.
            </GoCard>
          </div>
        </div>
        <div className="w-full">
          <button className={cn(buttonVariants(), "mt-6 block mx-auto px-20")}>
            Load more
          </button>
        </div> */}
			</div>
		</>
	);
};

export default App;

