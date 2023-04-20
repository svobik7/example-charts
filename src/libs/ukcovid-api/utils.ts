export function groupByYear(
  data: Array<{
    date: string;
    newCasesByPublishDate: string;
    newDeathsByDeathDate: string;
  }>,
) {
  const grouped = data.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    const yearData = acc[year] || { year, cases: 0, deaths: 0 };
    yearData.cases += Number(item.newCasesByPublishDate);
    yearData.deaths += Number(item.newDeathsByDeathDate);
    acc[year] = yearData;
    return acc;
  }, {} as Record<string, { year: string; cases: number; deaths: number }>);

  return Object.values(grouped);
}
