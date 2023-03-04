/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableBirthPlace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";
import { VALID_COUNTRIES } from "../../../../lib/config";

import styles from "../styles/detailed.module.scss";
import UpdateButtons from "./UpdateButtons";
import { Input, Error, BlockSpinner, Select } from "../../../Layouts";

function ChangeBirthplaceForm() {
  const {
    birthPlace,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableBirthPlace);

  const { handleResetBirthplace, handleCancel } = useSettings();

  const { addBirthPlaceQuery, livingPlaceError, setLivingPlaceError } =
    useSettingsQuery();

  useEffect(() => {
    return () => handleResetBirthplace();
  }, []);

  return (
    <form className={styles.formsContainer} onSubmit={addBirthPlaceQuery}>
      <div className={`${styles.form} ${styles.livingPlaceForm}`}>
        <Select
          name="country"
          label="country"
          id="country"
          error={livingPlaceError.country.hasError}
          message={livingPlaceError.country.message}
          data={{
            values: VALID_COUNTRIES,
            default: {
              label: birthPlace.country || "country",
              value: birthPlace.country || "country",
            },
          }}
          handler={() => {
            livingPlaceError.country.hasError &&
              setLivingPlaceError((prev) => ({
                ...prev,
                country: {
                  hasError: false,
                  message: "",
                },
              }));
          }}
        />

        <Input
          type="text"
          name="city"
          label="city"
          placeholder="city"
          defaultValue={birthPlace.city || ""}
          className={styles.inpField}
          error={livingPlaceError.city.hasError}
          message={livingPlaceError.city.message}
          onChange={() =>
            livingPlaceError.city.hasError &&
            setLivingPlaceError((prev) => ({
              ...prev,
              city: {
                hasError: false,
                message: "",
              },
            }))
          }
          id="city"
        />
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetBirthplace)}
        updaterType="submit"
      />
    </form>
  );
}

export default ChangeBirthplaceForm;
