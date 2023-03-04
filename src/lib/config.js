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

export const VALID_COUNTRIES = [
  "afghanistan",
  "aland islands",
  "albania",
  "algeria",
  "american samoa",
  "andorra",
  "angola",
  "anguilla",
  "antigua",
  "argentina",
  "armenia",
  "aruba",
  "australia",
  "austria",
  "azerbaijan",
  "bahamas",
  "bahrain",
  "bangladesh",
  "barbados",
  "belarus",
  "belgium",
  "belize",
  "benin",
  "bermuda",
  "bhutan",
  "bolivia",
  "bosnia",
  "botswana",
  "bouvet island",
  "brazil",
  "british virgin islands",
  "brunei",
  "bulgaria",
  "burkina faso",
  "burma",
  "burundi",
  "caicos islands",
  "cambodia",
  "cameroon",
  "canada",
  "cape verde",
  "cayman islands",
  "central african republic",
  "chad",
  "chile",
  "china",
  "christmas island",
  "cocos islands",
  "colombia",
  "comoros",
  "congo",
  "congo brazzaville",
  "cook islands",
  "costa rica",
  "cote divoire",
  "croatia",
  "cuba",
  "cyprus",
  "czech republic",
  "denmark",
  "djibouti",
  "dominica",
  "dominican republic",
  "ecuador",
  "egypt",
  "el salvador",
  "england",
  "equatorial guinea",
  "eritrea",
  "estonia",
  "ethiopia",
  "europeanunion",
  "falkland islands",
  "faroe islands",
  "fiji",
  "finland",
  "france",
  "french guiana",
  "french polynesia",
  "french territories",
  "gabon",
  "gambia",
  "georgia",
  "germany",
  "ghana",
  "gibraltar",
  "greece",
  "greenland",
  "grenada",
  "guadeloupe",
  "guam",
  "guatemala",
  "guinea",
  "guinea-bissau",
  "guyana",
  "haiti",
  "heard island",
  "honduras",
  "hong kong",
  "hungary",
  "iceland",
  "india",
  "indian ocean territory",
  "indonesia",
  "iran",
  "iraq",
  "ireland",
  "israel",
  "italy",
  "jamaica",
  "jan Mayen",
  "japan",
  "jordan",
  "kazakhstan",
  "kenya",
  "kiribati",
  "kuwait",
  "kyrgyzstan",
  "laos",
  "latvia",
  "lebanon",
  "lesotho",
  "liberia",
  "libya",
  "liechtenstein",
  "lithuania",
  "luxembourg",
  "macau",
  "macedonia",
  "madagascar",
  "malawi",
  "malaysia",
  "maldives",
  "mali",
  "malta",
  "marshall islands",
  "martinique",
  "mauritania",
  "mauritius",
  "mayotte",
  "mexico",
  "micronesia",
  "moldova",
  "monaco",
  "mongolia",
  "montenegro",
  "montserrat",
  "morocco",
  "mozambique",
  "namibia",
  "nauru",
  "nepal",
  "netherlands",
  "netherlandsantilles",
  "new caledonia",
  "new guinea",
  "new zealand",
  "nicaragua",
  "niger",
  "nigeria",
  "niue",
  "norfolk island",
  "north korea",
  "northern mariana islands",
  "norway",
  "oman",
  "pakistan",
  "palau",
  "palestine",
  "panama",
  "paraguay",
  "peru",
  "philippines",
  "pitcairn islands",
  "poland",
  "portugal",
  "puerto rico",
  "qatar",
  "reunion",
  "romania",
  "russia",
  "rwanda",
  "saint helena",
  "saint kitts and nevis",
  "saint lucia",
  "saint pierre",
  "saint vincent",
  "samoa",
  "san marino",
  "sandwich islands",
  "sao tome",
  "saudi arabia",
  "scotland",
  "senegal",
  "serbia",
  "serbia",
  "seychelles",
  "sierra leone",
  "singapore",
  "slovakia",
  "slovenia",
  "solomon islands",
  "somalia",
  "south africa",
  "south korea",
  "spain",
  "sri lanka",
  "sudan",
  "suriname",
  "swaziland",
  "sweden",
  "switzerland",
  "syria",
  "taiwan",
  "tajikistan",
  "tanzania",
  "thailand",
  "timorleste",
  "togo",
  "tokelau",
  "tonga",
  "trinidad",
  "tunisia",
  "turkey",
  "turkmenistan",
  "tuvalu",
  "U.A.E.",
  "uganda",
  "ukraine",
  "united kingdom",
  "united states",
  "uruguay",
  "US minor islands",
  "US virgin islands",
  "uzbekistan",
  "vanuatu",
  "vatican City",
  "venezuela",
  "vietnam",
  "wales",
  "wallis and Futuna",
  "western Sahara",
  "yemen",
  "zambia",
  "zimbabwe",
];

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
