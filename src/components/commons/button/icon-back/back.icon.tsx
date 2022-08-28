import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import styles from "./back.icon.module.css";

export const BackIcon = (props: any) => {
  const navigate = useNavigate();

  return (
    <BiArrowBack
      onClick={() => navigate(-1)}
      className={styles.backIcon}
      {...props}
    />
  );
};
