import { BackIcon, Button, Card, ModalFormComponent } from 'components';
import { TodoContext } from 'context/context'
import React, { Key, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { api, listOfMoves, randomProperty } from 'shared';

const ProductDetailPage = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>({});
  const [imagesProduct, setImagesProduct] = useState<any>({});
  const [showMoveList, setShowMoveList] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalInput, setShowModalInput] = useState(false);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

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
        value: data?.id,
      },
      {
        label: "Name",
        value: data?.name
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
      // {
      //   label: "Moves",
      //   value: <>
      //     <Button mode="tertiary" onClick={() => setShowMoveList(!showMoveList)}>{showMoveList ? "Hide" : "Show"}</Button>
      //     <div className="p-2">
      //       {showMoveList ?
      //         listOfMoves(data)
      //         : ""
      //       }
      //     </div>
      //   </>
      // }
    ]
  ), [data, showMoveList]);

  const handleCatch = useCallback(() => {
    const randomProduct = randomProperty(data?.sprites);
    if (typeof randomProduct === "string") {
      if (randomProduct.includes("shiny")) {
        setIsShiny(true);
        setImagesProduct(randomProduct);
        setShowModal(!showModal);
      }
      else {
        setIsShiny(false);
        setImagesProduct(randomProduct);
        setShowModal(!showModal);
      }
    } else {
      setImagesProduct("");
      setShowModal(!showModal);
    }
  }, [data?.sprites, showModal]);

  const handleSubmit = async () => {
    const body = {
      id: Date.now(),
      nickname: nickname,
      name: data?.name,
      images: imagesProduct,
      types: data?.types,
      moves: data?.moves,
      isShiny,
      url
    }
    const newData = {
      myProduct: [...todos?.myProduct, body]
    }
    setTodos(newData);
    localStorage.setItem("MY-P", btoa(JSON.stringify(newData)));
    navigate("/my-Product-list");
  }

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

      <ModalFormComponent
        show={showModal}
        title={"Gotchaa !!"}
        onHide={() => setShowModal(!showModal)}
      >
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => setShowModal(!showModal)} mode={"danger"}>{imagesProduct === "" ? "Try Again" : "Cancel"}</Button>
        </Modal.Footer>
      </ModalFormComponent>
    </>
  )
}

export default ProductDetailPage