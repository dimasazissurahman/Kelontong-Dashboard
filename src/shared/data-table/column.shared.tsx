
export const columnProduct: any = [
  {
    name: "Id",
    selector: (row: any) => row?._id,
    sortable: true,
    center: true,
  },
  {
    name: "Name",
    selector: (row: any) => row?.f_name,
    sortable: true,
    center: true,
  },
  {
    name: "Category Name",
    selector: (row: any) => row?.categoryName,
    sortable: true,
    center: true,
  },
]