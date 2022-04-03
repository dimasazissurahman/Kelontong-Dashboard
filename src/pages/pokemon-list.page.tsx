import { Card, ListTableComponent } from 'components';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { api } from 'shared';

const PokemonListPage = () => {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const fetchListPokemon = async () => {
    const res = await api.get('pokemon');
    setData(res.data.results);
  }
  useEffect(() => {
    fetchListPokemon();
  }, []);

  const handleClick = (data: any) => {
    navigate('/pokemon-detail');
    localStorage.setItem("P-DATA", btoa(JSON.stringify(data)));
  }

  return (
    <div>
      <Card>
        <h1>Pokemon</h1>
        <ListTableComponent data={data || []} onClick={(data: any) => handleClick(data)} />
      </Card>
    </div>
  )
}

export default PokemonListPage