import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";

import {
  ArrowLeftRectingle,
  HomeIcon,
  FeedIcon,
  TagIcon,
} from "../Icons/icons";
import { Avatar } from "../";
import styles from "./sideBar.module.scss";

function SideBar({ className, children }) {
  const [open, setOpen] = useState(false);

  const { userName, email, _id, image } = useSelector(
    selectActiveUserShortInfo
  );

  return (
    <>
      <input
        type="checkbox"
        defaultChecked={false}
        name="sideBarBtn"
        id="sideBarBtn"
        className={styles.sideBarBtnInp}
      />
      <div className={`${styles.sideBarLeft} ${className}`}>
        <label htmlFor="sideBarBtn" className={styles.sideBarBtn}>
          <ArrowLeftRectingle />
        </label>
        {/* MENU */}
        <Link
          to={`/profile/${_id}/posts`}
          className={`${styles["col-wrapper"]} ${styles.user}`}
        >
          <Avatar img={image} className={styles["col-1"]} />
          <h3 className={`${styles["col-2"]} ${styles.userName}`}>
            {userName}
          </h3>
          <p className={`${styles["col-2"]} ${styles.email}`}>{email}</p>
        </Link>
        <div className={`${styles["col-1"]} ${styles.menuCaption}`}>Menu</div>
        <div className={styles["col-wrapper"]}>
          <HomeIcon className={styles["col-1"]} />
          <span className={styles["col-2"]}>home</span>
        </div>
        <div className={styles["col-wrapper"]}>
          <FeedIcon className={styles["col-1"]} />
          <span className={styles["col-2"]}>newsfeed</span>
        </div>
        <div
          className={`${styles["col-1"]} ${styles.menuCaption}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          Labels
        </div>
        <div className={styles["col-wrapper"]} title="economics">
          {/* <TagIcon className={styles['col-1']} /> */}
          <span className={styles["col-1"]}>All</span>
          {/* <span className={styles['col-2']}>economics</span> */}
        </div>
        <div className={styles["col-wrapper"]} title="economics">
          <TagIcon className={styles["col-1"]} />
          <span className={styles["col-2"]}>economics</span>
        </div>
        <div className={styles["col-wrapper"]} title="medicine">
          <TagIcon className={styles["col-1"]} />
          <span className={styles["col-2"]}>medicine</span>
        </div>
        {/* CHILDREN */}
        <div className={styles["col-wrapper"]}>
          {/* <FeedIcon className={styles['col-1']} /> */}
          <span className={styles["col-2"]}>{children}</span>
        </div>
      </div>
      {/* {open && <BlogLabelsPopUp setOpen={setOpen} />} */}
    </>
  );
}

export default SideBar;
