import React from 'react';

export const listOfMoves = (data: any) => data?.moves?.map((el: any) => <li>{el?.move?.name}</li>);

export const randomProperty = (obj: any) => {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}