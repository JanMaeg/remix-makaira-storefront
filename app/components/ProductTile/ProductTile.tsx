import type { MakairaProduct } from "~/route-containers/entry.server";

import styles from "./style.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

const ProductTile = (product: MakairaProduct) => {
  const { fields } = product;

  return (
    <div className="product-tile">
      <img src={fields.images[0]} />

      <p>{fields.title}</p>
      <p>{fields.price}</p>
    </div>
  );
};

export default ProductTile;
