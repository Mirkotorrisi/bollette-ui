import { AboutMe } from "../screens/AboutMe";
import { Credits } from "../screens/Credits";
import { Home } from "../screens/Home";
import { LogIn } from "../screens/LogIn";
import Poker from "../screens/Poker";
import { Register } from "../screens/Register";
import { Slot } from "../screens/Slot";
import { UserTickets } from "../screens/UserTickets";

export const routes = [
  {
    path: "/",
    component: Home,
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
