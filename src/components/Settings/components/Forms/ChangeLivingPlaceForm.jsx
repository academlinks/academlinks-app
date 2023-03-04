/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableLivingPlace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";
import { VALID_COUNTRIES } from "../../../../lib/config";

import styles from "../styles/detailed.module.scss";
import UpdateButtons from "./UpdateButtons";
import { Input, Error, BlockSpinner, Select } from "../../../Layouts";

function ChangeLivingPlaceForm() {
  const {
    livingPlace,
    updateState: { loading, error, message },
  } = useSelector(selectUpdateableLivingPlace);

  const { handleResetLivingplace, handleCancel } = useSettings();
  const { addLivingPlaceQuery, livingPlaceError, setLivingPlaceError } =
    useSettingsQuery();

  useEffect(() => {
    return () => handleResetLivingplace();
  }, []);

  return (
    <form className={styles.formsContainer} onSubmit={addLivingPlaceQuery}>
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
              label: livingPlace.country || "country",
              value: livingPlace.country || "country",
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
          defaultValue={livingPlace.city}
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
          className={styles.inpField}
          id="city"
        />
      </div>

      {loading && <BlockSpinner />}
      {error && <Error msg={message} />}

      <UpdateButtons
        cancelHandler={() => handleCancel(handleResetLivingplace)}
        updaterType="submit"
      />
    </form>
  );
}

export default ChangeLivingPlaceForm;
