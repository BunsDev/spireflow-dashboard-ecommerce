"use client";

import { OrderType, useOrders } from "./useOrders";
import { OrdersDateRange } from "./OrdersDateRange";
import { OrderSelects } from "./OrdersSelects";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import { useState } from "react";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Input } from "../../forms/Input";

interface OrdersViewProps {
  ordersData: OrderType[];
}

export const OrdersView = ({ ordersData }: OrdersViewProps) => {
  const {
    table,
    searchQuery,
    setSearchQuery,
    getFilter,
    setFilter,
    filtersForSelectFields,
    nextPage,
    prevPage,
    goToPage,
    totalPage,
    currentPage,
    setItemsPerPage,
    itemsPerPage,
    setCurrentPage,
    resetFilters,
  } = useOrders({ orders: ordersData });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-between flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/4 mb-4 relative min-w-[15rem]">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            placeholder="Search orders..."
            icon={<SearchIcon />}
          />
        </div>
        <OrdersDateRange
          startDate={getFilter("startDate") as string | null}
          setStartDate={(value) => setFilter("startDate", value)}
          endDate={getFilter("endDate") as string | null}
          setEndDate={(value) => setFilter("endDate", value)}
        />
      </div>
      <div className="flex w-full gap-4 mt-2">
        <OrderSelects
          filters={filtersForSelectFields}
          setFilter={setFilter}
          ordersData={ordersData}
        />
      </div>
      <div className="w-full overflow-auto">
        <OrdersTable
          table={table}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="flex justify-between flex-wrap pb-4">
        <div className="w-36 mt-8 sm:mb-0">
          <OutlinedButton handleClick={resetFilters} text="Clear Filters" />
        </div>
        <OrdersPagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPage={totalPage}
          setItemsPerPage={setItemsPerPage}
          goToPage={goToPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
