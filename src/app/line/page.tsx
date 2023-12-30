"use client";

import { Card, Title, BarChart, Subtitle, LineChart } from "@tremor/react";

import { PageContainer } from "../../components/common/PageContainer";
import { CenteredPageWrapper } from "../../components/common/CenteredPageWrapper";

const dragonPopulationInWesteros = [
  {
    year: "0 AC",
    title: "Aegon's Conquest",
    "House Targaryen": 5,
    "House Velaryon": 0,
  },
  {
    year: "60 AC",
    title: "The long reign of Jaehaerys I",
    "House Targaryen": 19,
    "House Velaryon": 2,
  },
  {
    year: "120 AC",
    title: "House of the Dragon series",
    "House Targaryen": 15,
    "House Velaryon": 3,
  },
  {
    year: "180 AC",
    title: "The conquest of Dorne",
    "House Targaryen": 4,
    "House Velaryon": 0,
  },
  {
    year: "240 AC",
    title: "The Blackfyre Rebellions",
    "House Targaryen": 0,
    "House Velaryon": 0,
  },
  {
    year: "300 AC",
    title: "Time of the show/books start",
    "House Targaryen": 3,
    "House Velaryon": 0,
  },
];

export default function Line() {
  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <CenteredPageWrapper>
      <div className="single-chart-title">
        Population of dragons in Westeros
      </div>
      <LineChart
        className="mt-6"
        data={dragonPopulationInWesteros}
        index="year"
        categories={["House Targaryen", "House Velaryon"]}
        colors={["emerald", "gray"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
      <div className="w-full flex justify-between mx-auto mt-8 ml-8">
        {dragonPopulationInWesteros.map((item, index) => (
          <div key={index} className="text-xs">
            {item.title}
          </div>
        ))}
      </div>
    </CenteredPageWrapper>
  );
}
