import { Button, Card, ModalFormComponent } from 'components';
import { TodoContext } from 'context/context'
import React, { Key, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { api, listOfMoves, randomProperty } from 'shared';

const PokemonDetailPage = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>({});
  const [imagesPokemon, setImagesPokemon] = useState<any>({});
  const [showMoveList, setShowMoveList] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalInput, setShowModalInput] = useState(false);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data: any = localStorage.getItem("P-DATA");
    const generate = data ? JSON.parse(atob(data)) : "";
    setUrl(generate?.url || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPokemonById = async () => {
    const res = await api.get(url);
    setData(res.data);
  }

  useEffect(() => {
    if (url) {
      fetchPokemonById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);


  const tableContent = useMemo(() => (
    [
      {
        label: "Name",
        value: data?.name
      },
      {
        label: "Types",
        value: data?.types?.map((el: any) => el.type?.name + " "),
      },
      {
        label: "Images",
        value: <img alt="pokemon" src={data?.sprites?.front_default} />
      },
      {
        label: "Moves",
        value: <>
          <Button mode="tertiary" onClick={() => setShowMoveList(!showMoveList)}>{showMoveList ? "Hide" : "Show"}</Button>
          <div className="p-2">
            {showMoveList ?
              listOfMoves(data)
              : ""
            }
          </div>
        </>
      }
    ]
  ), [data, showMoveList]);

  const handleCatch = useCallback(() => {
    const randomPokemon = randomProperty(data?.sprites);
    if (typeof randomPokemon === "string") {
      if (randomPokemon.includes("shiny")) {
        setIsShiny(true);
        setImagesPokemon(randomPokemon);
        setShowModal(!showModal);
      }
      else {
        setIsShiny(false);
        setImagesPokemon(randomPokemon);
        setShowModal(!showModal);
      }
    } else {
      setImagesPokemon("");
      setShowModal(!showModal);
    }
  }, [data?.sprites, showModal]);

  const handleSubmit = async () => {
    const body = {
      id: Date.now(),
      nickname: nickname,
      name: data?.name,
      images: imagesPokemon,
      types: data?.types,
      moves: data?.moves,
      isShiny,
      url
    }
    const newData = {
      myPokemon: [...todos?.myPokemon, body]
    }
    setTodos(newData);
    localStorage.setItem("MY-P", btoa(JSON.stringify(newData)));
    navigate("/my-pokemon-list");
  }

  return (
    <>
      <Card className="p-2">
        {data ?
          <>
            <table style={{ marginBottom: "1.5rem" }}>
              <tbody>
                {tableContent.map((data: any, i: Key) => (
                  <tr key={i}>
                    <td>{data.label}</td>
                    <td>{data.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button onClick={() => handleCatch()}>Catch</Button>
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
          {imagesPokemon === "" ?
            <>
              <h3>You Miss The Pokemon</h3>
              <h2>Lets try to catch again</h2>
            </>
            :
            <>
              {isShiny && <h2>PERFECT!! YOU JUST GOT A SHINY !!</h2>}
              <h3>{`Yes You Catched A ${data?.name}`}</h3>
              <img className={isShiny === true ? "shiny" : ""} alt="pokemon" src={imagesPokemon} />
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          {imagesPokemon !== "" &&
            <Button type="submit" onClick={() => { setShowModalInput(!showModalInput); setShowModal(!showModal) }} mode={"primary"} >Save</Button>
          }
          <Button type="button" onClick={() => setShowModal(!showModal)} mode={"danger"}>{imagesPokemon === "" ? "Try Again" : "Cancel"}</Button>
        </Modal.Footer>
      </ModalFormComponent>

      <ModalFormComponent
        title={"Add Your Pokemon To Pokedex"}
        show={showModalInput}
        onHide={() => setShowModalInput(!showModalInput)}
      >
        <Modal.Body>
          <label>Nickname</label>
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSubmit()} mode={"primary"} >Save</Button>
          <Button onClick={() => setShowModalInput(!showModalInput)} mode={"danger"}>Cancel</Button>
        </Modal.Footer>
      </ModalFormComponent>
    </>
  )
}

export default PokemonDetailPage