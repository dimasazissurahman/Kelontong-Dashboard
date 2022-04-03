import { Button } from 'components/commons/button/button.common';
import { Card } from 'components/commons/card/card.component'
import { ModalFormComponent } from 'components/commons/modal/modal.card';
import { MyPokemonTable } from 'components/pages/mypokemon-list.page';
import { TodoContext } from 'context/context';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { listOfMoves } from 'shared/function/general.function';

const MyPokemonListPage = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { myPokemon } = todos;
  const [selected, setSelected] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [showMoveList, setShowMoveList] = useState(false);

  const handleOnDelete = async (data: any) => {
    let arr = myPokemon;
    const findIndex = myPokemon.findIndex((el: any) => el.id === data.id);
    if (findIndex !== -1) {
      arr.splice(findIndex, 1);
      const body = {
        myPokemon: await arr
      }
      setTodos(body);
      localStorage.setItem("MY-P", btoa(JSON.stringify(body)));
    }
  }

  const tableContent = useMemo(() => (
    [
      {
        label: "Images",
        value: <img className={selected?.isShiny === true ? "shiny" : ""} alt="pokemon" src={selected?.images} />
      },
      {
        label: "Nickname",
        value: selected?.nickname
      },
      {
        label: "Name",
        value: selected?.name
      },
      {
        label: "Types",
        value: selected?.types?.map((el: any) => el.type?.name + " "),
      },
      {
        label: "Moves",
        value: <>
          <Button mode="tertiary" onClick={() => setShowMoveList(!showMoveList)}>{showMoveList ? "Hide" : "Show"}</Button>
          <div className="p-2">
            {showMoveList ?
              listOfMoves(selected)
              : ""
            }
          </div>
        </>
      }
    ]
  ), [selected, showMoveList]);


  return (
    <>
      <h1>My Pokedex</h1>
      <Card>
        {myPokemon.length > 0 ?
          <MyPokemonTable
            showModal={showModal}
            setShowModal={(data: any) => setShowModal(data)}
            onClick={(data:any) => setSelected(data)}
            myPokemon={myPokemon}
          />
          :
          "You dont have a pokemon"
        }
      </Card>

      <ModalFormComponent
        title={`Detail Pokemon`}
        onHide={() => setShowModal(!showModal)}
        show={showModal}
      >
        <Modal.Body>
          <table style={{ marginBottom: "1.5rem" }}>
            <tbody>
              {tableContent.map((data: any, i: number) => (
                <tr key={i}>
                  <td>{data.label}</td>
                  <td>{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleOnDelete(selected)} mode="danger">Release</Button>
        </Modal.Footer>
      </ModalFormComponent>
    </>
  )
}

export default MyPokemonListPage