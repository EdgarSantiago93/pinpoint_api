export const validationMessages = {
  required: (field: string) => `${field}_required`,
  minLength: (field: string, min: number) => `${field}_min_length_${min}`,
  maxLength: (field: string, max: number) => `${field}_max_length_${max}`,
  email: (field: string = 'email') => `${field}_invalid`,
  number: (field: string = 'number') => `${field}_is_not_a_number`,
  hasNumber: (field: string = 'number') => `${field}_number_not_found`,
  hasUppercase: (field: string = 'uppercase') => `${field}_uppercase_not_found`,
  hasLowercase: (field: string = 'lowercase') => `${field}_lowercase_not_found`,
  hasSpecialChar: (field: string = 'special_char') =>
    `${field}_special_char_not_found`,
  specialChar: (field: string = 'special_char') =>
    `${field}_is_not_a_special_char`,
  uppercase: (field: string = 'uppercase') =>
    `${field}_is_not_an_uppercase_letter`,
  lowercase: (field: string = 'lowercase') =>
    `${field}_is_not_a_lowercase_letter`,
  match: (field: string = 'match') => `${field}_does_not_match`,
  unique: (field: string = 'unique') => `${field}_is_not_unique`,
  exists: (field: string = 'exists') => `${field}_does_not_exist`,
  notEmpty: (field: string = 'not_empty') => `${field}_is_empty`,
  notNull: (field: string = 'not_null') => `${field}_is_null`,
  internalServerError: () => 'internal_server_error',
};
