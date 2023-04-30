import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { Button, Form, FormGroup, FormText } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { setTimeOfAidDelivering } from "../../actions/mapActions";

function MapInterfaceDatePicker({ SelectedDate }) {
  //const todayAtNoon = dayjs().set("hour", 12).startOf("hour");
  const dispatch = useDispatch();
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const todayAt9AM = dayjs(date).set("hour", 8);
  const today = dayjs(Date.now());
  const valCon = (value) => {
    console.log(value);
    dispatch(setTimeOfAidDelivering(value));
  };
  const [value, setValue] = useState(dayjs(Date.now()).toISOString());
  //console.log(value);
  return (
    <Form
      className="text-center mt-3"
      onSubmit={(e) => {
        e.preventDefault();
        valCon(value);
      }}
    >
      <FormGroup>
        {" "}
        <DesktopDateTimePicker
          label="Pick the time of delivering"
          value={dayjs(value)}
          onChange={(newValue) => setValue(newValue)}
          maxDateTime={todayAt9AM}
          minDateTime={today}
          format="YYYY/MM/DD HH:mm"
          onAccept={() => {
            valCon(value);
          }}
        />
        <FormText className="text-center">
          {SelectedDate ? SelectedDate.toString() : "There is no selected date"}
        </FormText>
        <Button type="submit">Choose the time</Button>
      </FormGroup>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  SelectedDate: state.mapPoints.timeOfDelivering,
});

export default connect(mapStateToProps)(MapInterfaceDatePicker);
