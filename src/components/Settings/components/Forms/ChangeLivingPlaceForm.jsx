/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableLivingPlace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import { Input, Error, BlockSpinner } from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

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
        <Input
          type="text"
          name="country"
          label="country"
          placeholder="country"
          defaultValue={livingPlace.country}
          error={livingPlaceError.country.hasError}
          message={livingPlaceError.country.message}
          onChange={() =>
            livingPlaceError.country.hasError &&
            setLivingPlaceError((prev) => ({
              ...prev,
              country: {
                hasError: false,
                message: "",
              },
            }))
          }
          className={styles.inpField}
          id="country"
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
