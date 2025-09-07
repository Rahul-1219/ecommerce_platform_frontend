"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, DollarSign, ShoppingCart } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DashboardChartsProps {
  ordersStats?: any;
  paymentStats?: any;
  singleChart?: "orders" | "payments";
}

export default function DashboardCharts({
  ordersStats,
  paymentStats,
  singleChart,
}: DashboardChartsProps) {
  if (singleChart === "orders" && ordersStats) {
    return (
      <Card className="shadow-lg rounded-lg w-full relative">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-2 md:gap-0">
            {/* Title */}
            <div>
              <CardTitle className="text-lg font-semibold">Orders</CardTitle>
              <p className="text-gray-400 text-xs">Last 12 Months</p>
            </div>

            {/* Stats Boxes */}
            <div className="flex flex-wrap gap-2 md:flex-row">
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-0.5 rounded-md shadow-sm text-xs">
                <ShoppingCart className="w-3 h-3 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Total: {ordersStats.totalOrders}
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-100 px-2 py-0.5 rounded-md shadow-sm text-xs">
                <ArrowUp className="w-3 h-3 text-blue-800" />
                <span className="text-blue-900 font-medium">
                  Last Month: {ordersStats.lastMonthOrders}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ordersStats.last12MonthsOrders}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#4f46e5"
                fill="url(#colorOrders)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  if (singleChart === "payments" && paymentStats) {
    return (
      <Card className="shadow-lg rounded-lg w-full relative">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-2 md:gap-0">
            {/* Title */}
            <div>
              <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
              <p className="text-gray-400 text-xs">Last 12 Months</p>
            </div>

            {/* Stats Boxes */}
            <div className="flex flex-wrap gap-2 md:flex-row">
              <div className="flex items-center space-x-1 bg-green-50 px-2 py-0.5 rounded-md shadow-sm text-xs">
                <DollarSign className="w-3 h-3 text-green-600" />
                <span className="text-green-800 font-medium">
                  Total: ₹{paymentStats.totalRevenue}
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-green-100 px-2 py-0.5 rounded-md shadow-sm text-xs">
                <ArrowUp className="w-3 h-3 text-green-800" />
                <span className="text-green-900 font-medium">
                  Last Month: ₹{paymentStats.lastMonthRevenue}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={paymentStats.last12MonthsRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return null;
}
