import store from "../store";

export default function(to, from, next) {
  if (!localStorage.getItem("user")) next("/login");
  else next();
}
