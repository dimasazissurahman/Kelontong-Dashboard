import { IMyPokemonTable } from "shared";


export const MyPokemonTable = (props: IMyPokemonTable) => {
  const { myPokemon, onClick, showModal, setShowModal } = props;
  return (
    <table>
      <tbody style={{ columns: "2 auto" }}>
        {myPokemon.map((el: any, i: number) => {
          return (
            <tr key={i}>
              {i % 2 === 0
                &&
                <>
                  <td style={{ textAlign: "center" }} onClick={() => { setShowModal(!showModal); onClick(myPokemon[i]) }}>
                    <img className={myPokemon[i]?.isShiny === true ? "shiny" : ""} alt="pokemon" src={myPokemon[i]?.images} />
                    {myPokemon[i]?.nickname || ""}
                  </td>
                  {myPokemon[i + 1] ?
                    <td style={{ textAlign: "center" }} onClick={() => { setShowModal(!showModal); onClick(myPokemon[i + 1]) }}>
                      <img className={myPokemon[i + 1]?.isShiny === true ? "shiny" : ""} alt="pokemon" src={myPokemon[i + 1]?.images} />
                      <span>
                        {myPokemon[i + 1]?.nickname || ""}
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