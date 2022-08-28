import { Button } from 'components/commons/button/button.common';
import React from 'react'
import { Link } from 'react-router-dom';
import styles from './header.module.css';

export const HeaderComponent = () => {
  return (
    <header className={styles['header']}>
      <div className={styles['header-content']}>
        <div className={styles['header-left']}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h3>Tru<span style={{ color: "#00d6cb" }}>Trip</span></h3>
          </Link>
        </div>
        <div className={styles['header-right']}>
          {/* <Link to="/my-Product-list">
            <Button>My Product</Button>
          </Link> */}
          <h5>Hi, Admin</h5>
        </div>
      </div>
    </header>
  )
}
