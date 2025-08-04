"use client";

import { useTableContext } from "@/context/TableContext";
import { useTable } from "@/hooks/useTable";
import { ColumnDef } from "../../../interfaces/table.interface";
import cx from "@/libs/cx";
import { useEffect, useState } from "react";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
}

export default function Table<T>({ columns, className, data }: TableProps<T>) {
  const { data: contextData, refresh } = useTableContext<T>();

  const table = useTable({ columns, data: contextData });

  useEffect(() => {
    refresh(data);
  }, [data]);

  return (
    <div
      className={cx(
        "rounded-lg border border-gray-200 overflow-x-auto dark:bg-gray-800  dark:border-gray-700",
        className
      )}
    >
      <table className={cx("w-full")}>
        <thead>
          <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors dark:border-gray-700 dark:hover:bg-gray-700">
            {table.getHeaders().map((header, i) => {
              return (
                <th
                  key={i}
                  className="font-medium text-sm text-gray-500 text-left p-4 dark:text-gray-400"
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {table.getCells().map((row, index) => {
            return (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
              >
                {row.map((cell, i) => {
                  return (
                    <td
                      key={i}
                      className={cx(
                        "p-4 border-gray-200 border-b dark:border-gray-700"
                      )}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            {table.getFooter().map((footer, i) => {
              return <td key={i}>{footer}</td>;
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
