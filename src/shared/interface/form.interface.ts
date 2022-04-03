import { ReactNode } from "react";

export interface IMyPokemonTable {
  myPokemon: any;
  onClick: (data: any) => void;
  showModal: boolean;
  setShowModal: any;
}

export interface IModalFormComponent {
  show: boolean;
  onHide?: () => void;
  title?: string;
  children: ReactNode;
}