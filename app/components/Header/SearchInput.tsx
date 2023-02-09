import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "~/components/Header/searchInput.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

const SearchInput = () => {
  return (
    <div className="search-input">
      <input placeholder="Search anything…" />

      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
};

export default SearchInput;
