import { SearchFiltersProps } from '../interfaces/SearchFiltersProps'
import '../styles/SearchFilters.css'

const SearchFilters = ({
  query,
  email,
  phoneNumber,
  onQueryChange,
  onEmailChange,
  onPhoneNumberChange,
  onSearch,
}: SearchFiltersProps) => {
  return (
    <div className="searchFilters">
      <input
        className="searchInput"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <input
        className="searchInput"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        className="searchInput"
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
      />
      <button className="searchButton" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchFilters
