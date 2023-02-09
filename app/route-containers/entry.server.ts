import { json } from "@remix-run/node";

export interface MakairaProduct {
  id: string;
  fields: {
    datatype: string;
    title: string;
    images: [string];
    price: number;
  };
}

export interface MakairaMenuEntry {
  uuid: string;
  text: {
    de: string;
    en: string;
  };
  link: {
    de: string;
    en: string;
  };
}

export interface MakairaData {
  product: {
    items: [MakairaProduct];
  };
}

export interface MakairaResponse {
  page: {
    data: MakairaData;

    type: "page" | "category";
  };
  menu: [MakairaMenuEntry];
}

export async function loader({
  request,
}: {
  request: Request;
}): Promise<MakairaResponse> {
  const url = new URL(request.url);

  const pageRequest = fetch("https://demo.makaira.io/enterprise/page", {
    method: "POST",
    body: JSON.stringify({
      url: url.pathname,
      count: 50,
      constraints: {
        "query.language": "de",
        "query.shop_id": "1",
      },
    }),
    headers: {
      "x-makaira-instance": "storefront",
    },
  });

  const menuRequest = fetch("https://demo.makaira.io/enterprise/menu", {
    method: "GET",
    headers: {
      "x-makaira-instance": "storefront",
    },
  });

  const [pageRes, menuRes] = await Promise.all([pageRequest, menuRequest]);

  if (pageRes.status === 404) {
    throw json("Page not found", { status: 404 });
  }

  const resJSON = await pageRes.json();
  const menuJSON = await menuRes.json();

  return { page: resJSON, menu: menuJSON.menu };
}
