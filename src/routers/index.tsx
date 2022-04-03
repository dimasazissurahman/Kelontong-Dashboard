import { LayoutRouter } from 'components/layout/router/layout-router.component';
import { TodoContext } from 'context/context';
import MyPokemonListPage from 'pages/mypokemon-list.page';
import PokemonDetailPage from 'pages/pokemon-detail.page';
import PokemonListPage from 'pages/pokemon-list.page';
import React, { Fragment, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const MainRouter = () => {
  return (
    <Fragment>
      <Router>
        <LayoutRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/pokemon-list" />} />
            <Route path="/pokemon-list" element={<PokemonListPage />} />
            <Route path="/pokemon-detail" element={<PokemonDetailPage />} />
            <Route path="/my-pokemon-list" element={<MyPokemonListPage />} />
          </Routes>
        </LayoutRouter>
      </Router>
    </Fragment>
  )
}

export default MainRouter