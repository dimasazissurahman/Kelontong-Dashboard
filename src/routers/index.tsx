import { LayoutRouter } from 'components/layout/router/layout-router.component';
import ProductDetailPage from 'pages/product-detail.page';
import ProductListPage from 'pages/product-list.page';
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const MainRouter = () => {
  return (
    <Fragment>
      <Router>
        <LayoutRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/product-list" />} />
            <Route path="/product-list" element={<ProductListPage />} />
            <Route path="/product-detail" element={<ProductDetailPage />} />
          </Routes>
        </LayoutRouter>
      </Router>
    </Fragment>
  )
}

export default MainRouter