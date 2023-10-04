import React, { useEffect } from "react";

import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ErrorMessage from "./ErrorMessage";
import countries from "../../data/countries.json";

interface ISelectMuiProps {
  errors?: string | string[];
  setSelectedCountry: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCountry: string[];
  setIsSelectedCountry: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectedCountry: boolean;
}

const Input = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 50,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: "1rem",
    fontLine: "1.5rem",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: ["Figtree", "sans-serif"],
    "&:focus": {
      borderRadius: 50,
    },
  },
}));

const SelectMuiCountry: React.FunctionComponent<ISelectMuiProps> = ({
  errors,
  setSelectedCountry,
  selectedCountry,
  setIsSelectedCountry,
  isSelectedCountry,
}) => {
  useEffect(() => {
    if (selectedCountry.length > 1) setIsSelectedCountry(true);
  }, []);
  return (
    <FormControl sx={{ width: "100%", mb: 3 }}>
      <Select
        data-testid="select"
        displayEmpty
        value={selectedCountry.length === 0 ? "" : selectedCountry[1]}
        onChange={(e) => {
          setSelectedCountry(
            countries.find((country) => country[1] === e.target.value)
          );

          setIsSelectedCountry(true);
        }}
        input={<Input />}
        renderValue={() => {
          if (isSelectedCountry !== true) {
            return <em>Country</em>;
          }
          return <em>{selectedCountry[1]}</em>;
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {countries.map((country) => (
          <MenuItem key={country[0]} value={country[1]}>
            {country[1]}
          </MenuItem>
        ))}
      </Select>
      {errors && <ErrorMessage errors={errors} className={`mt-2 ml-2`} />}
    </FormControl>
  );
};

export default SelectMuiCountry;
