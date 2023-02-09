import SearchInput, {
  links as searchLinks,
} from "~/components/Header/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import headerStyles from "~/components/Header/header.css";
import type { MakairaMenuEntry } from "~/route-containers/entry.server";

export const links = () => [
  ...searchLinks(),
  { rel: "stylesheet", href: headerStyles },
];

const Header = ({ menu }: { menu: [MakairaMenuEntry] }) => {
  return (
    <header>
      <div className="header__main">
        <SearchInput />

        <div className="header__logo">
          <h1>MAKAIRA</h1>
        </div>

        <div className="header__actions">
          <FontAwesomeIcon icon={faCartShopping} />

          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>

      <div className="header__navigation">
        <ul className="header__menu">
          {menu.map((entry) => {
            return (
              <li key={entry.uuid}>
                <a href={entry.link.de}>{entry.text.de}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
