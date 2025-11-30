export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    const fullURL = pageURL ? pageURL : PokeAPI.baseURL + "/location-area";
    // console.log(fullURL);
    const rawResponse = await fetch(fullURL, {
      method: "GET",
    });
    const response = await rawResponse.json();
    return response;
  }

  async fetchLocation(locationName: string): Promise<void> {
    //   Promise<Location>
    // implement this
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  // add properties here
};
