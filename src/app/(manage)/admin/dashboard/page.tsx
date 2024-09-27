"use client";
import React from "react";
import OverviewChart from "./overviewChart.chart";
import DateChart from "./dateChart.chart";

const DashboardPage = () => {
  return (
    <div>
      <DateChart />
      <div className="my-2"></div>
      <OverviewChart />
    </div>
  );
};

export default DashboardPage;
