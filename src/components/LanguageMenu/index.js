import React, { useState } from "react"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useTranslation } from "react-i18next"

import ptLogo from "../../../assets/pt.png"
import enLogo from "../../../assets/en.png"

const LanguageMenu = (props) => {
  const { t, i18n } = useTranslation()
  
  const [values, setValues] = useState({
    language: 'pt'
  });

  function handleChange(event) {
    i18n.changeLanguage(event.target.value)

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return(
    <Select
      value={values.language}
      onChange={(e) => handleChange(e)}
      disableUnderline
      inputProps={{
        name: 'language'
      }}
    >
      <MenuItem value={'en'}><img src={enLogo} alt="EN" /></MenuItem>
      <MenuItem value={'pt'}><img src={ptLogo} alt="PT" /></MenuItem>
    </Select>
  )
}

export default LanguageMenu