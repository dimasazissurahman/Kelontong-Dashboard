import React from 'react'
import styles from './card.module.css';

export const Card = (props: any) => {
  return (
    <div className={styles.card} {...props.rest}>
      {props.children}
    </div>
  )
}
