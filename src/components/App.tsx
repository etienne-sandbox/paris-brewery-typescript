import { Link, Route, Routes } from "react-router-dom";
import { Beer } from "./Beer";
import { Breweries } from "./Breweries";
import { Brewery } from "./Brewery";
import { NotFound } from "./NotFound";

export function App() {
  return (
    <div className="mx-auto max-w-4xl pt-6 space-y-6">
      <header className="bg-white py-4 px-6 shadow-lg rounded-md">
        <h1 className="text-4xl tracking-wide text-green-900 hover:text-green-800 hover:underline">
          <Link to="/">Paris Microbrasseries</Link>
        </h1>
      </header>
      <Routes>
        <Route path="/" element={<Breweries />} />
        <Route path="/brewery/:breweryId" element={<Brewery />} />
        <Route path="/beer/:beerId" element={<Beer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
