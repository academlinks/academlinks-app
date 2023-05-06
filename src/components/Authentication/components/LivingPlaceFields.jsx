import { VALID_COUNTRIES } from "lib/config";

import { Select, Input } from "components/Layouts";
import styles from "./styles/livingPlaceFields.module.scss";

function LivingPlaceFields({
  heading,
  // country
  countryName,
  countryError,
  countryMessage,
  resetCountryErrorHandler,
  // city
  cityName,
  cityError,
  cityMessage,
  resetCityErrorHandler,
}) {
  return (
    <div className={styles.livingPlaceFieldsContainer}>
      <span data-registration-form-heading>{heading}</span>

      <div className={styles.livingPlaceFields}>
        <Select
          name={countryName}
          label="country"
          error={countryError}
          message={countryMessage}
          data={{
            values: VALID_COUNTRIES,
            default: {
              label: "country",
              value: "country",
            },
          }}
          handler={() => resetCountryErrorHandler()}
        />

        <Input
          name={cityName}
          label="city"
          placeholder="city"
          error={cityError}
          message={cityMessage}
          onChange={() => resetCityErrorHandler()}
        />
      </div>
    </div>
  );
}

export default LivingPlaceFields;
