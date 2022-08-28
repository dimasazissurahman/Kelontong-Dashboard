import { IMyProductTable } from "shared";


export const MyProductTable = (props: IMyProductTable) => {
  const { myProduct, onClick, showModal, setShowModal } = props;
  return (
    <table>
      <tbody style={{ columns: "2 auto" }}>
        {myProduct.map((el: any, i: number) => {
          return (
            <tr key={i}>
              {i % 2 === 0
                &&
                <>
                  <td style={{ textAlign: "center" }} onClick={() => { setShowModal(!showModal); onClick(myProduct[i]) }}>
                    <img className={myProduct[i]?.isShiny === true ? "shiny" : ""} alt="Product" src={myProduct[i]?.images} />
                    {myProduct[i]?.nickname || ""}
                  </td>
                  {myProduct[i + 1] ?
                    <td style={{ textAlign: "center" }} onClick={() => { setShowModal(!showModal); onClick(myProduct[i + 1]) }}>
                      <img className={myProduct[i + 1]?.isShiny === true ? "shiny" : ""} alt="Product" src={myProduct[i + 1]?.images} />
                      <span>
                        {myProduct[i + 1]?.nickname || ""}
                      </span>
                    </td>
                    :
                    <td></td>
                  }
                </>
              }
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}