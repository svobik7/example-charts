import { fetchData, type ApiResponse } from '..';

type SexDataByAge = { age: string; rate: number; value: number };
type DayDataBySex = {
  date: string;
  femaleCases: SexDataByAge[];
  maleCases: SexDataByAge[];
};

function getSexSummary(data: SexDataByAge[]) {
  return data.reduce((acc, item) => acc + item.value, 0);
}

function getSummary(data: DayDataBySex[]) {
  const grouped = data.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    const yearData = acc[year] || { year, femaleCases: 0, maleCases: 0 };
    yearData.femaleCases += getSexSummary(item.femaleCases);
    yearData.maleCases += getSexSummary(item.maleCases);
    acc[year] = yearData;
    return acc;
  }, {} as Record<string, { year: string; femaleCases: number; maleCases: number }>);

  return Object.values(grouped);
}

export async function getCasesBySex() {
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
  )) as ApiResponse<DayDataBySex>;
  return getSummary(response.data);
}
