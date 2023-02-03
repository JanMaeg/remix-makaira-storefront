import type { PageProperties } from "~/route-containers/entry.component";
import ProductTile, {
  links as productTileLinks,
} from "~/components/ProductTile/ProductTile";

export function links() {
  return [...productTileLinks()];
}

const ListingPage = ({ data }: PageProperties) => {
  return (
    <div>
      <div>
        {data.product.items.map((product) => (
          <ProductTile key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
