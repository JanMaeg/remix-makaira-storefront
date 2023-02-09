import type { loader, MakairaData } from "~/route-containers/entry.server";
import { useLoaderData } from "@remix-run/react";
import LandingPage from "~/pages/LandingPage";
import ListingPage, { links as listingPageLinks } from "~/pages/ListingPage";
import type { FunctionComponent } from "react";
import type { DynamicLinksFunction } from "remix-utils";
import type { SerializeFrom } from "@remix-run/node";
import Header, { links as headerLinks } from "~/components/Header/Header";

let dynamicLinks: DynamicLinksFunction<SerializeFrom<typeof loader>> = ({
  data,
}) => {
  if (data.page.type === "category") {
    return [...listingPageLinks()];
  }
  return [];
};

export const links = () => [...headerLinks()];

export let handle = { dynamicLinks };

export interface PageProperties {
  data: MakairaData;
}

interface PageMapping {
  page: FunctionComponent<PageProperties>;
  category: FunctionComponent<PageProperties>;
}

const PAGES: PageMapping = {
  page: LandingPage,
  category: ListingPage,
};

function Page() {
  const makaira = useLoaderData<typeof loader>();

  const Component = PAGES[makaira.page.type];

  const data = makaira.page.data;

  return (
    <div>
      <Header menu={makaira.menu} />

      <Component data={data} />
    </div>
  );
}
export default Page;
