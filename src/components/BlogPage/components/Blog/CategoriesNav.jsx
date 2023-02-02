import { useLocation, NavLink } from "react-router-dom";
import { uid } from "uid";

import styles from "./styles/categoriesNav.module.scss";
import { MultiCarousel } from "../../../Layouts";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 8,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1280, min: 960 },
    items: 6,
    slidesToSlide: 3,
  },
  tablet_portrate: {
    breakpoint: { max: 960, min: 480 },
    items: 4,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};

const routes = [
  "economics",
  "business",
  "law",
  "medicine",
  "psychology",
  "philosophy",
  "politics",
  "natural sciences",
  "exact sciences",
  "other",
];

function CategoriesNav() {
  const { state: pathState } = useLocation();

  return (
    <div className={styles.categories}>
      <MultiCarousel
        responsiveness={responsive}
        autoPlay={false}
        arrows={true}
        draggable={true}
        swipeable={true}
        className={styles.slider}
      >
        {routes.map((route) => (
          <NavLink
            className={styles.listItemLink}
            state={{
              ...pathState,
              category: pathState?.category
                ? pathState.category.includes(route)
                  ? pathState.category.filter((r) => r !== route)
                  : [...pathState.category, route]
                : [route],
            }}
            to={""}
            key={uid(16)}
          >
            <span
              className={`${styles.listItem}   ${
                pathState?.category?.includes(route) ? styles.active : ""
              }`}
            >
              {route}
            </span>
          </NavLink>
        ))}
      </MultiCarousel>
    </div>
  );
}

export default CategoriesNav;
