"use client";
import { DataTable } from "@/components/custom/data-table";
import { DrawerDialog } from "@/components/custom/drawer-dialog";
import CategoryForm from "@/components/forms/category-form";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useRef } from "react";
import { columns } from "./columns";

const CategoryDataTable = ({
  data,
  categoryId = "",
}: {
  data: any;
  categoryId?: string;
}) => {
  const drawerRef = useRef<any>(null); // Reference to DrawerDialog

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.close(); // Close drawer via ref
    }
  };
  return (
    <div>
      <DataTable columns={columns} data={data}>
        <DrawerDialog
          ref={drawerRef}
          rowText="Add"
          title="Add Category"
          button={
            <Button variant="outline" size="sm" className="h-8 px-3">
              <CirclePlus />
              Add
            </Button>
          }
        >
          <CategoryForm
            className="px-4"
            action="add"
            onClose={closeDrawer}
            categoryId={categoryId}
          />
        </DrawerDialog>
      </DataTable>
    </div>
  );
};

export default CategoryDataTable;
