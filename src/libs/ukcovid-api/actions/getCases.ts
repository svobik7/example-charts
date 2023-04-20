import { fetchData, type ApiResponse } from '..';

type SexCasesByAge = { age: string; rate: number; value: number };
type DayCases = {
  date: string;
  femaleCases: SexCasesByAge[];
  maleCases: SexCasesByAge[];
};

export type CasesSummary = {
  year: string;
  femaleCases: number;
  maleCases: number;
};

function getSexSummary(data: SexCasesByAge[]) {
  return data.reduce((acc, item) => acc + item.value, 0);
}

function getSummary(data: DayCases[]): CasesSummary[] {
  const grouped = data.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    const yearData = acc[year] || { year, femaleCases: 0, maleCases: 0 };
    yearData.femaleCases += getSexSummary(item.femaleCases);
    yearData.maleCases += getSexSummary(item.maleCases);
    acc[year] = yearData;
    return acc;
  }, {} as Record<string, CasesSummary>);

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
  )) as ApiResponse<DayCases>;

  return getSummary(response.data);
}
