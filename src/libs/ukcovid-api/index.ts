const API_URL = 'https://api.coronavirus.data.gov.uk/v1/data';

export type ApiResponse<T> = { data: T[] };

export type QueryStructure = {
  [key: string]: string;
};

export type QueryFilter = {
  name: string;
  value: string;
};

function getUrl(structure: QueryStructure, filters?: QueryFilter[]) {
  const url = new URL(API_URL);

  url.searchParams.append('structure', JSON.stringify(structure));

  if (filters) {
    url.searchParams.append(
      'filters',
      filters.map((f) => `${f.name}=${f.value}`).join(';'),
    );
  }

  return url;
}

export async function fetchData(
  structure: QueryStructure,
  filters?: QueryFilter[],
) {
  const url = getUrl(structure, filters);
  return fetch(url).then((res) => res.json());
}
