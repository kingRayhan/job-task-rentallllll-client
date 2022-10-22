export interface Pagination {
  total: number;
  current: number;
  limit: number;
}

export interface Meta {
  pagination: Pagination;
  resourceCount: number;
}

export interface PaginatedResponse<DataModel> {
  contents: DataModel[];
  meta: Meta;
}
