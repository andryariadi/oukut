import useGetRecommedProduct from "../hooks/useGetRecommedProduct";
import CardProduct from "./CardProduct";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
  const { isLoading, recommedations } = useGetRecommedProduct();

  if (isLoading) return <LoadingSpinner />;

  console.log(recommedations, "<----dipeopleAlso");

  return (
    <div className="b-amber-700 max-w-2xl flex flex-col gap-7">
      <h3 className="text-2xl font-semibold text-emerald-400">People also bought</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg: grid-col-3 gap-10">
        {recommedations?.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
