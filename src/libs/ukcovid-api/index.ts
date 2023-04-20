const API_URL = 'https://api.coronavirus.data.gov.uk/v1/data';

export type ApiResponse<T> = { data: T[] };

export type QueryStructure = {
  [key: string]: string;
};

export type QueryFilter = {
  name: string;
  value: string;
};

export async function fetchData(
  structure: QueryStructure,
  filters?: QueryFilter[],
) {
  const endpoint = new URL(API_URL);

  endpoint.searchParams.append('structure', JSON.stringify(structure));

  if (filters) {
    endpoint.searchParams.append(
      'filters',
      filters.map((f) => `${f.name}=${f.value}`).join(';'),
    );
  }

  return fetch(endpoint).then((res) => res.json());
}
