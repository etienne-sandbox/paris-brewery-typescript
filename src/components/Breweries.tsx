import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BreweriesResult, getBreweries } from "../logic/api";

type BreweriesProps = {};

export function Breweries({}: BreweriesProps): JSX.Element | null {
  const [data, setData] = useState<BreweriesResult | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        const breweries = await getBreweries(controller.signal);
        setData(breweries);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    return () => controller.abort();
  }, []);

  if (data === null) {
    return (
      <p className="flex flex-col bg-white rounded-md p-4 space-y-4">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-md p-4 space-y-4">
      <h2 className="text-center text-2xl uppercase tracking-wider font-semibold text-slate-700">
        List des Microbrasseries
      </h2>
      <div className="overflow-hidden rounded-md flex flex-col items-stretch">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/brewery/${item.id}`}
              className="bg-slate-100 odd:bg-slate-200 text-lg px-2 py-2 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
