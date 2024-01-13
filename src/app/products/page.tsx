import { PageWrapper } from "../../components/common/PageWrapper";
import { ProductCategory, ProductsView } from "../../components/views/products/ProductsView";
import { getData } from "../../services/getData";

const Products = async () => {
  const productsData = await getData("products");

  return (
    <PageWrapper className="px-0 flex-row">
      <ProductsView products={productsData} />
    </PageWrapper>
  );
};

export default Products;
