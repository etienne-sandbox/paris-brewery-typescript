import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BeerResult, getBeer } from "../logic/api";

type BeerProps = {};

export function Beer({}: BeerProps): JSX.Element | null {
  const { beerId } = useParams<{ beerId: string }>();
  const [data, setData] = useState<BeerResult | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      if (beerId === undefined) {
        return;
      }
      try {
        const beer = await getBeer(beerId, controller.signal);
        setData(beer);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    return () => controller.abort();
  }, [beerId]);

  if (data === null) {
    return (
      <p className="flex flex-col bg-white rounded-md p-4 space-y-4 text-center">
        Loading...
      </p>
    );
  }

  return (
    <div className="bg-white py-4 px-6 shadow-lg rounded-md space-y-4 text-slate-900">
      <h2 className="text-center text-2xl uppercase tracking-wider font-semibold text-slate-700">
        {data.name}
        {data.alcool ? ` - ${data.alcool}°` : ""}
      </h2>
      <p className="text-center text-lg font-semibold">
        Brassé par:{" "}
        <Link className="text-green-700" to={`/brewery/${data.brewery.id}`}>
          {data.brewery.name}
        </Link>
        {" - "}
        Alcool: {data.alcool ?? "-"}° -{" "}
        <a href={data.url} className="text-green-700">
          Détails
        </a>
      </p>
      <div className="text-lg space-y-2">
        {data.description.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </div>
    </div>
  );
}
