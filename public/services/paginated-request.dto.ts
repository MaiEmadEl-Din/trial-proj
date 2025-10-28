export class SortModel {
    colId!: string;

    sort!: 'asc' | 'desc';
}

export class NumberColumnFilter {
    filterType: string = 'number';

    operator?: 'and' | 'or' = 'and';
    type:
        | 'equal'
        | 'notEqual'
        | 'greaterThan'
        | 'greaterThanOrEqual'
        | 'lessThan'
        | 'lessThanOrEqual'
        | 'inRange' = 'inRange';

    filter?: number;
    filterTo?: number;
}

export class DateColumnFilter {
    filterType: string = 'date';

    operator: 'and' | 'or' = 'and';

    type:
        | 'equal'
        | 'notEqual'
        | 'greaterThan'
        | 'greaterThanOrEqual'
        | 'lessThan'
        | 'lessThanOrEqual'
        | 'date'
        | 'inRange' = 'inRange';

    dateFrom!: string;

    dateTo?: string;
}
export class TextColumnFilter {
    filterType: string = 'text';

    operator: 'and' | 'or' = 'and';

    type:
        | 'contains'
        | 'notContains'
        | 'equals'
        | 'notEqual'
        | 'startsWith'
        | 'endsWith' = 'contains';

    filter!: string;
}

export class SetColumnFilter {
    filterType: string = 'set';

    values!: string[] | number[];
}

export class FilterModel {
    // Remove the @ApiProperty() decorator
    [colId: string]:
        | TextColumnFilter
        | DateColumnFilter
        | NumberColumnFilter
        | SetColumnFilter;
}

export class SearchBy {
    colIds!: string[];

    filter!: string | number;
}

export class EscPaginatedRequest {
    pageSize: number = 10;
    startRow: number = 0;
    sortModel!: SortModel[];
    filterModel!: FilterModel;
    searchBy?: SearchBy;
}
