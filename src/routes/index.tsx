import { BetList } from "../screens/BetList";
import { LogIn } from "../screens/LogIn";
import { Register } from "../screens/Register";
import { UserTickets } from "../screens/UserTickets";
import { Credits } from "../screens/Credits";
import { AboutMe } from "../screens/AboutMe";
import { Slot } from "../screens/Slot";
import Poker from "../screens/Poker";

export const routes = [
  {
    path: "/",
    component: BetList,
  },
  {
    path: "/login",
    component: LogIn,
  },
  {
    path: "/register",
    component: Register,
  },

  {
    path: "/credits",
    component: Credits,
  },
  {
    path: "/aboutme",
    component: AboutMe,
  },
];

export const protectedRoutes = [
  {
    path: "/tickets",
    component: UserTickets,
  },
  {
    path: "/slot",
    component: Slot,
  },
  {
    path: "/poker",
    component: Poker,
  },
];
