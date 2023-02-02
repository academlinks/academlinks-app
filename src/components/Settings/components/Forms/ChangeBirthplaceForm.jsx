/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUpdateableBirthPlace } from "../../../../store/selectors/settingsSelector";
import { useSettings, useSettingsQuery } from "../../../../hooks";

import { Input, Error, BlockSpinner } from "../../../Layouts";
import UpdateButtons from "./UpdateButtons";
import styles from "../styles/detailed.module.scss";

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
        <Input
          type="text"
          name="country"
          label="country"
          placeholder="country"
          defaultValue={birthPlace.country || ""}
          className={styles.inpField}
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
          id="country"
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
