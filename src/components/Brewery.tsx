import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BreweryResult, getBrewery } from "../logic/api";

type BreweryProps = {};

export function Brewery({}: BreweryProps): JSX.Element | null {
  const { breweryId } = useParams<{ breweryId: string }>();
  const [data, setData] = useState<BreweryResult | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      if (breweryId === undefined) {
        return;
      }
      try {
        const brewery = await getBrewery(breweryId, controller.signal);
        setData(brewery);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    return () => controller.abort();
  }, [breweryId]);

  if (data === null) {
    return (
      <p className="flex flex-col bg-white rounded-md p-4 space-y-4 text-center">
        Loading...
      </p>
    );
  }

  return (
    <Fragment>
      <div className="bg-white py-4 px-6 shadow-lg rounded-md space-y-4 text-slate-900">
        <h2 className="text-center text-2xl uppercase tracking-wider font-semibold text-slate-700">
          {data.name}
        </h2>
        <p className="text-center text-lg">
          Site web:{" "}
          <a className="text-green-700" href={data.website}>
            {data.website}
          </a>
        </p>
        <div className="space-y-2 text-lg">
          {data.description.map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </div>
      </div>
      <div className="bg-white py-4 px-6 shadow-lg rounded-md space-y-4 text-slate-900">
        <h3 className="text-xl uppercase tracking-wider font-semibold text-slate-700">
          Liste des bières
        </h3>
        <div className="overflow-hidden rounded-md flex flex-col items-stretch">
          {data.beers.map((beer) => (
            <Link
              key={beer.id}
              to={`/beer/${beer.id}`}
              className="bg-slate-100 odd:bg-slate-200 text-lg px-2 py-2 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              {beer.name}
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
