import { BackIcon, Card } from 'components';
import React, { Key, useEffect, useMemo, useState } from 'react'

const ProductDetailPage = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const data: any = localStorage.getItem("S-DATA");
    const generate = data ? JSON.parse(atob(data)) : "";
    setData(generate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableContent = useMemo(() => (
    [
      {
        label: "Id",
        value: data?._id,
      },
      {
        label: "Name",
        value: data?.f_name
      },
      {
        label: "Category Id",
        value: data?.categoryId
      },
      {
        label: "Category Name",
        value: data?.categoryName
      },
      {
        label: "Sku",
        value: data?.sku
      },
      {
        label: "Descriptiom",
        value: data?.descriptiom
      },
      {
        label: "Weight",
        value: data?.weight
      },
      {
        label: "Width",
        value: data?.width
      },
      {
        label: "Length",
        value: data?.length
      },
      {
        label: "Height",
        value: data?.height
      },
      {
        label: "Images",
        value: <img alt="Product" src={data?.image} />
      },
      {
        label: "Harga",
        value: data?.harga
      },
    ]
  ), [data]);

  return (
    <>
      <Card className="p-2">
        <div style={{ marginBottom: "1rem" }}>
          <BackIcon />
        </div>
        {data ?
          <>
            <table className="table table-hover" style={{ marginBottom: "1.5rem" }}>
              <tbody>
                {tableContent.map((data: any, i: Key) => (
                  <tr key={i}>
                    <td style={{ width: "30%" }}>{data.label}</td>
                    <td>{data.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
          :
          ""}
      </Card>
    </>
  )
}

export default ProductDetailPage