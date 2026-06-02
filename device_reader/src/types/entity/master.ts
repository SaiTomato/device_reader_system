export interface DropdownItem {

  value: string;

  label: string;

}

export interface DropdownOptions {

  pcStatus?: DropdownItem[];

  pcCategory?: DropdownItem[];

  pcUsage?: DropdownItem[];

  pcDivision?: DropdownItem[];

  pcLocation?: DropdownItem[];

}