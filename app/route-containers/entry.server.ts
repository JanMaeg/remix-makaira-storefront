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

export interface MakairaData {
  product: {
    items: [MakairaProduct];
  };
}

export interface MakairaResponse {
  data: {
    data: MakairaData;

    type: "page" | "category";
  };
}

export async function loader({
  request,
}: {
  request: Request;
}): Promise<MakairaResponse> {
  const url = new URL(request.url);

  const res = await fetch("https://demo.makaira.io/enterprise/page", {
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

  if (res.status === 404) {
    throw json("Page not found", { status: 404 });
  }

  const resJSON = (await res.json()) as MakairaResponse;

  return resJSON;
}
