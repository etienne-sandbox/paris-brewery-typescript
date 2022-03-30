import { z } from "zod";

const BASE_URL = "https://paris-brewery-api.herokuapp.com";

const BreweriesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export type BreweriesResult = z.infer<typeof BreweriesSchema>;

export async function getBreweries(
  signal?: AbortSignal
): Promise<BreweriesResult> {
  const res = await fetch(`${BASE_URL}/brewery`, { signal });
  if (!res.ok) {
    throw res;
  }
  return BreweriesSchema.parse(await res.json());
}

const BrewerySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.array(z.string()),
  website: z.string(),
  beers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type BreweryResult = z.infer<typeof BrewerySchema>;

export async function getBrewery(
  breweryId: string,
  signal?: AbortSignal
): Promise<BreweryResult> {
  const res = await fetch(`${BASE_URL}/brewery/${breweryId}`, { signal });
  if (!res.ok) {
    throw res;
  }
  return BrewerySchema.parse(await res.json());
}

const BeerSchema = z.object({
  id: z.string(),
  name: z.string(),
  alcool: z.number().nullable(),
  url: z.string(),
  description: z.array(z.string()),
  brewery: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type BeerResult = z.infer<typeof BeerSchema>;

export async function getBeer(
  beerId: string,
  signal?: AbortSignal
): Promise<BeerResult> {
  const res = await fetch(`${BASE_URL}/beer/${beerId}`, { signal });
  if (!res.ok) {
    throw res;
  }
  return BeerSchema.parse(await res.json());
}
