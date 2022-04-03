import React, { Key } from 'react'
import { Button } from '../button/button.common'
interface ITableProduct {
  data?: any;
  onClick?: any;
}
export const DetailTableComponent = (props: ITableProduct) => {
  const { data, onClick } = props;
  const columnHead = [
    {
      label: "Name",
    },
    {
      label: "Action",
    }
  ]
  return (
    <table>
      <thead>
        <tr>
          {columnHead.map((data: any, i: Key) => <th key={i} style={data?.style}>{data?.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((data: any, i: Key) => (
          <tr key={i}>
            <td>{data?.name || "-"}</td>
            <td className="w-25">
              {data?.name ?
                <>
                  <Button onClick={() => onClick(data)} style={{ marginRight: "10px" }}>Detail</Button>
                </>
                :
                "-"
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
