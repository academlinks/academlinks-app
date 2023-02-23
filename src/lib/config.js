// Query Content Count Constants
export const FEED_POSTS_COUNT_PER_REQ = 10;

export const PROFILE_POSTS_COUNT_PER_REQ = 10;

export const BOOKMARKS_POSTS_COUNT_PER_REQ = 10;

export const BLOG_POSTS_COUNT_PER_REQ = 10;

export const BLOG_POSTS_TOP_RATED_POSTS_COUNT = 5;

export const BLOG_POSTS_TOP_RATED_PUBLISHERS_COUNT = 8;

// User Info Constants
export const USER_WORKPLACE_POSITIONS = [
  "professor",
  "associate professor",
  "assistant professor",
  "researcher",
  "administrative personnel",
  "phd student",
  "post-doc-fellow",
];

export const USER_GENDER = ["male", "female"];

export const VALID_BLOG_POST_CATEGORIES = [
  "education",
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

export const VALID_DEGREES = ["bachelor", "master", "doctor"];

export function getAPI_EndPoint() {
  const DEV_API_END_POINT = process.env.REACT_APP_DEV_API_END_POINT;
  const TEST_PROD_API_END_POINT = process.env.REACT_APP_TEST_PROD_API_END_POINT;
  const PROD_API_END_POINT = process.env.REACT_APP_PROD_API_END_POINT;

  const ENV_MODE = process.env.REACT_APP_ENV_MODE;

  return ENV_MODE === "DEV"
    ? DEV_API_END_POINT
    : ENV_MODE === "TEST_PROD"
    ? TEST_PROD_API_END_POINT
    : ENV_MODE === "PROD"
    ? PROD_API_END_POINT
    : "";
}

export function getAPI_Origin() {
  const DEV_END_POINT_ORIGIN = process.env.REACT_APP_DEV_END_POINT_ORIGIN;
  const TEST_PROD_END_POINT_ORIGIN =
    process.env.REACT_APP_TEST_PROD_END_POINT_ORIGIN;
  const PROD_END_POINT_ORIGIN = process.env.REACT_APP_PROD_END_POINT_ORIGIN;

  const ENV_MODE = process.env.REACT_APP_ENV_MODE;

  return ENV_MODE === "DEV"
    ? DEV_END_POINT_ORIGIN
    : ENV_MODE === "TEST_PROD"
    ? TEST_PROD_END_POINT_ORIGIN
    : ENV_MODE === "PROD"
    ? PROD_END_POINT_ORIGIN
    : "";
}

export function getApp_Origin() {
  const DEV_APP_ORIGIN = process.env.REACT_APP_DEV_APP_ORIGIN;
  const TEST_PROD_APP_ORIGIN = process.env.REACT_APP_TEST_PROD_APP_ORIGIN;
  const APP_ORIGIN = process.env.REACT_APP_ORIGIN;

  const ENV_MODE = process.env.REACT_APP_ENV_MODE;

  return ENV_MODE === "DEV"
    ? DEV_APP_ORIGIN
    : ENV_MODE === "TEST_PROD"
    ? TEST_PROD_APP_ORIGIN
    : ENV_MODE === "PROD"
    ? APP_ORIGIN
    : "";
}
