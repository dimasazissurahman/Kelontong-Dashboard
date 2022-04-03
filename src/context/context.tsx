import React, { useEffect } from 'react'

export interface ITodo {
    myPokemon?: [] | any;
}

const useValue = () => {
    const [todos, setTodos] = React.useState<ITodo>({ myPokemon: [] })

    useEffect(() => {
        const data: any = localStorage.getItem("MY-P");
        const generate = data ? JSON.parse(atob(data)) : "";
        const { myPokemon } = generate;
        setTodos({ myPokemon: myPokemon ? myPokemon : [] });
    }, [])

    return {
        todos,
        setTodos
    }
}

export const TodoContext = React.createContext({} as ReturnType<typeof useValue>)

export const TodoProvider: React.FC<{}> = (props) => {
    return (
        <TodoContext.Provider value={useValue()}>
            {props.children}
        </TodoContext.Provider>
    )
}