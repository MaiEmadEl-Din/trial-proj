export class Page {
  size!: number;
  number!: number;
  totalElements!: number;
  totalPages!: number;
}

export class IPaginationResponse<T> {
  content!: T[];
  size!: number;
  number!: number;
  totalElements!: number;
  totalPages!: number;
}

