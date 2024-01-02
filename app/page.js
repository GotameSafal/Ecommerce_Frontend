import { FilterSection, MainBody } from "@components/clients";
import axios from "axios";
import queryString from "query-string";
import Loading from "./loading";
export const getProducts = async (searchParams = "") => {
  let urlparams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "avg_rating[gte]": searchParams.ratings,
  };
  let searchQuery = queryString.stringify(urlparams);

  let data = await axios.get(
    `${process.env.BACKEND_URL}/product?${searchQuery}`
  );
  return data;
};
export default async function HomePage({ searchParams }) {
  let { data } = await getProducts(searchParams);
  return (
    <>
      <div className="flex lg:w-[80%] mx-auto min-h-[80vh]  gap-x-1">
        {data ? (
          <>
            <FilterSection classname={"sm:block hidden"} />
            <MainBody data={data} />
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
