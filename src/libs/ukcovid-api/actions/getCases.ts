import { fetchData, type ApiResponse } from '..';

type Value = { age: string; rate: number; value: number };
type DailyValues = {
  date: string;
  femaleCases: Value[];
  maleCases: Value[];
};

export type Summary = {
  year: string;
  femaleCases: number;
  maleCases: number;
};

// Sum up the value of all cases and ignores age
function sumValue(data: Value[]) {
  return data.reduce((acc, item) => acc + item.value, 0);
}

// Group cases by year and sum up the values
function getSummary(data: DailyValues[]): Summary[] {
  const grouped = data.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    const yearData = acc[year] || { year, femaleCases: 0, maleCases: 0 };
    yearData.femaleCases += sumValue(item.femaleCases);
    yearData.maleCases += sumValue(item.maleCases);
    acc[year] = yearData;
    return acc;
  }, {} as Record<string, Summary>);

  return Object.values(grouped);
}

export async function getCases() {
  const structure = {
    date: 'date',
    femaleCases: 'femaleCases',
    maleCases: 'maleCases',
  };

  const filters = [
    { name: 'areaType', value: 'nation' },
    { name: 'areaName', value: 'England' },
  ];

  const response = (await fetchData(
    structure,
    filters,
  )) as ApiResponse<DailyValues>;

  return getSummary(response.data);
}
