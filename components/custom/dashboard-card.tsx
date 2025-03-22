"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserX } from "lucide-react";
import CountUp from "react-countup";

const DashboardCard = ({ data }: { data: any }) => {
  return (
    data && (
      <Card className="w-full rounded-2xl bordeshadow-md">
        <CardHeader className="pb-4">
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            {data?.title}
          </CardDescription>
          <CardTitle className="text-4xl max-md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            <CountUp start={0} end={data?.total} duration={0.5} separator="," />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Active Users */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                <CountUp
                  start={0}
                  end={data?.active}
                  duration={0.5}
                  separator=","
                />
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-green-600 dark:text-green-400 border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full"
            >
              Active
            </Badge>
          </div>

          {/* Inactive Users */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                <CountUp
                  start={0}
                  end={data?.inActive}
                  duration={0.5}
                  separator=","
                />
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-red-600 dark:text-red-400 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full"
            >
              Inactive
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default DashboardCard;
