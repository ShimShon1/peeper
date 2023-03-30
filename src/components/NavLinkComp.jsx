import { NavLink } from "react-router-dom";

export default function NavLinkComp({ icon, path, name }) {
  return (
    <NavLink
      aria-label={name}
      to={path}
      className="flex items-center gap-6 font-semibold text-lg hover:bg-gray-300 p-2 rounded-full"
    >
      <img src={icon} alt="" />
      <span className="hidden md:inline-block">{name}</span>
    </NavLink>
  );
}
