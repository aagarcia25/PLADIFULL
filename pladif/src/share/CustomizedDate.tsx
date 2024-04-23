import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const CustomizedDate = ({
  value,
  label,
  onchange,
  disabled,
}: {
  value: any;
  label: string;
  onchange: Function;
  disabled: boolean;
}) => {
  const handleDateChange = (selectedDate: any) => {
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD HH:mm:ss");
    onchange(formattedDate);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography sx={{ fontFamily: "sans-serif" }}>{label}:</Typography>
        <DatePicker
          value={value}
          format="DD/MM/YYYY"
          onChange={handleDateChange}
          disabled={disabled}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomizedDate;
