"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card } from "@tremor/react";
import ReactTooltip from "react-tooltip";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

import "react-tooltip/dist/react-tooltip.css";
import { BlockTitle } from "../../common/BlockTitle";
import { EnglishIcon } from "../../../assets/icons/EnglishIcon";
import { PolishIcon } from "../../../assets/icons/PolishIcon";
import { UnitedStatesIcon } from "../../../assets/icons/UnitedStatesIcon";
import { FranceIcon } from "../../../assets/icons/FranceIcon";
import { NorwayIcon } from "../../../assets/icons/NorwayIcon";
import { AustraliaIcon } from "../../../assets/icons/AustraliaIcon";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const HIGHLIGHT_COLOR = "rgb(59, 130, 246)";

const countryIconMap: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
} = {
  "United States of America": UnitedStatesIcon,
  France: FranceIcon,
  "United Kingdom": EnglishIcon,
  Norway: NorwayIcon,
  Australia: AustraliaIcon,
  Poland: PolishIcon,
};

interface Country {
  name: string;
  price: number;
}

interface RevenuePerCountryProps {
  revenuePerCountryData: Country[];
}
export const RevenuePerCountry = ({
  revenuePerCountryData,
}: RevenuePerCountryProps) => {
  const dataWithIcons = revenuePerCountryData.map((country) => ({
    ...country,
    FlagIcon: countryIconMap[country.name],
  }));

  return (
    <Card className="h-full relative overflow-hidden">
      <BlockTitle title="Revenue per country" />
      <div className="flex -ml-12 gap-16 max-h-[25rem] pt-8 mt-4 ">
        <ComposableMap width={800} height={440}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                if (countryName === "Antarctica") {
                  return null;
                }
                const countryData = revenuePerCountryData.find(
                  (s) => s.name === countryName
                );
                const tooltipContent = countryData
                  ? `${countryName} - ${countryData.price}$`
                  : `${countryName}`;

                return (
                  <Tooltip
                    placement="top"
                    overlay={<span>{tooltipContent}</span>}
                    key={geo.rsmKey}
                  >
                    <Geography
                      geography={geo}
                      fill={countryData ? HIGHLIGHT_COLOR : "#D6D6DA"}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: HIGHLIGHT_COLOR, outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        </ComposableMap>
        <div className="flex flex-col p-0 overflow-auto min-w-[18rem] gap-3 overflow-hidden -mt-8 px-2">
          <div className="w-full flex justify-between">
            <h3 className="font-semibold text-primaryText dark:text-primaryTextDark">Country</h3>
            <h3 className="font-semibold text-primaryText dark:text-primaryTextDark">Sales</h3>
          </div>
          {dataWithIcons.map((data, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-1 border-t dark:border-mainBorderDark border-mainBorder pt-4"
            >
              <div className="flex items-center space-x-3">
                <div className="flex ">
                  {data.FlagIcon && <data.FlagIcon />}
                </div>
                <span className="text-sm text-primaryText dark:text-primaryTextDark">
                  {data.name === "United States of America"
                    ? "United States"
                    : data.name}
                </span>
              </div>
              <span className="font-semibold text-sm text-primaryText dark:text-primaryTextDark">${data.price}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
