export interface NanocolorOptions {
  lastNameUpperCase?: boolean;
}

export function nanocolor(firstName: string, lastName: string, options?: NanocolorOptions) {
  if (options?.lastNameUpperCase) {
    return firstName + ' ' + lastName.toLocaleUpperCase();
  }
  return firstName + ' ' + lastName;
}
