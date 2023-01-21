import moment from "moment";

export const useParseDate = (datetime: string) => {
  const isLive = moment(datetime).isBefore(moment());
  const isTomorrow = moment(datetime).isSame(moment().add(1, "day"), "day");
  const isToday = moment(datetime).isSame(moment(), "day");
  const date = isToday
    ? "Today"
    : isTomorrow
    ? "Tomorrow"
    : moment(datetime).format("DD-MM-YY");
  const time = isLive
    ? parseMinutes(datetime)
    : moment(datetime).format("HH:mm");
  return {
    date,
    time,
    isLive,
  };
};

const parseMinutes = (date: string) => {
  let minutes = moment.duration(moment().diff(date)).asMinutes();
  if (minutes < 45) return minutes.toFixed(0);
  else if (minutes < 60) return "Half Time";
  else return (minutes - 15).toFixed(0);
};
