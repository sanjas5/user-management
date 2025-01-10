export interface SearchFiltersProps {
  query: string
  email: string
  phoneNumber: string
  onQueryChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneNumberChange: (value: string) => void
  onSearch: () => void
}
