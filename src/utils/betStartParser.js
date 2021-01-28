import moment from "moment";

export const parseDate = (date) => {
  // const mom = moment(date);

  // switch (mom) {
  //   case mom.isAfter(moment(), "day"):
  //     if (mom.isSame(moment().add(1, "day"), "day")) {
  //       return `Tomorrow at ${moment(date).format("HH:mm ")}`;
  //     } else return mom.format("DD-MM-YYYY HH:mm");
  //   case mom.isSame(moment(), "day"):
  //     if (moment(date).isBefore(moment())) return `LIVE ${parseMinutes(date)}`;
  //     else return mom.fromNow();
  // }
  if (moment(date).isAfter(moment(), "day")) {
    if (moment(date).isSame(moment().add(1, "day"), "day")) {
      return `Tomorrow at ${moment(date).format("HH:mm ")}`;
    } else return moment(date).format("DD-MM-YYYY HH:mm");
  } else if (moment(date).isSame(moment(), "day")) {
    if (moment(date).isBefore(moment())) {
      return `LIVE ${parseMinutes(date)}`;
    } else return moment(date).fromNow();
  }
};

const parseMinutes = (date) => {
  let minutes = moment.duration(moment().diff(date)).asMinutes();
  if (minutes < 45) return minutes.toFixed(0);
  else if (minutes < 60) return "Half Time";
  else return (minutes - 15).toFixed(0);
};
