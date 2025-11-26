import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterModel, GridApi, SortChangedEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { IPaginationResponse, Page } from './paginated-response.dto';
import { EscPaginatedRequest } from './paginated-request.dto';
interface GetDataOptions {
    incomingStartRow?: number;
    searchTerm?: string;
    filterModel?: FilterModel;
}
interface InitDataOptions {
    endPoint: string;
    gridApi?: GridApi;
    pageSize: number;
    searchColsIds?: string[];
    form?: FormGroup;
    initWithOutLoad?: boolean;
}
@Injectable({
    providedIn: 'root',
})
export class gridAdvancedPaginationService {
    getAllSubscription!: Subscription;
    exportSubscription!: Subscription;
    private gridApi!: GridApi;
    private endPoint!: string;
    private pageSize: number = 10;
    private meta = {
        totalElements: 0,
        size: 0,
        number: 0,
        totalPages: 0,
    };
    endRow!: number;
    searchColsIds!: string[];
    filterModel!: FilterModel | null;
    private searchTerm!: string | null;
    constructor(private _httpClient: HttpClient) { }
    public initData(data: InitDataOptions) {
        this.pageSize = data.pageSize;
        this.endPoint = data.endPoint;
        this.searchColsIds = data.searchColsIds ?? [];
        if (!data.initWithOutLoad) this.getAdvancedPagination();
    }
    public get meta$(): Page {
        return this.meta;
    }
    set $searchTerm(term: string) {
        this.searchTerm = term;
    }
    set $filterModel(data: any) {
        this.filterModel = data;
    }
    set $gridApi(data: any) {
        this.gridApi = data;
    }
    get _gridApi() {
        return this.gridApi;
    }
    public onScroll(event: any) {
        if (event.top == -1) return;
        const lastDisplayedRow = this.gridApi.getLastDisplayedRowIndex();
        let pageNumber = this.endRow / this.meta.size;
        
        if (this.meta.totalPages > pageNumber && lastDisplayedRow === this.endRow - 1) {
            const newStartRow = lastDisplayedRow + 1;
            this.getAdvancedPagination({ incomingStartRow: newStartRow });
        }
    }
    onSortChanged(event: SortChangedEvent) {
        this.getAdvancedPagination();
    }
    public mapRequest(incomingStartRow = 0): EscPaginatedRequest {
        let sortModel = this.gridApi
            ?.getColumnState()
            ?.filter((col) => col.sort !== undefined && col.sort !== null)
            .map((col) => {
                const colDef = this.gridApi.getColumnDef(col['colId']);
                return { colId: colDef?.field, sort: col.sort };
            });

        let request = {
            sortModel,
            startRow: incomingStartRow || 0,
            pageSize: this.pageSize || 10,
        } as EscPaginatedRequest;

        if (
            this.searchTerm !== null &&
            this.searchTerm !== undefined &&
            this.searchTerm !== ''
        ) {
            request.searchBy = {
                colIds: this.searchColsIds || [],
                filter: !isNaN(Number(this.searchTerm))
                    ? Number(this.searchTerm)
                    : this.searchTerm,
            };
        }

        if (
            this.filterModel !== null &&
            this.filterModel !== undefined &&
            Object.keys(this.filterModel).length > 0
        ) {
            request.filterModel = this.filterModel;
        }
        return request;
    }
    public getAdvancedPagination<T>(options: GetDataOptions = {}) {
        this.gridApi?.showLoadingOverlay();

        let { incomingStartRow = 0 } = options;
        let request = this.mapRequest(incomingStartRow);
        this.getAllSubscription = this._httpClient
            .post<IPaginationResponse<T>>(this.endPoint, request)
            .subscribe(
                (data) => {
                    let page = {
                        size: data.size,
                        number: data.number,
                        totalElements: data.totalElements,
                        totalPages: data.totalPages,
                    };
                    this.meta = page;

                    if (incomingStartRow === 0) {
                        this.gridApi?.setGridOption('rowData', []);
                    }
                    this.gridApi?.applyTransaction({
                        add: data.content,
                        addIndex: incomingStartRow ?? 0,
                    });
                    if (this.meta.number === 0) {
                        this.endRow = this.meta.size;
                    } else {
                        this.endRow = incomingStartRow + this.meta.size;
                    }
                    if (
                        incomingStartRow !== undefined ||
                        incomingStartRow !== null
                    ) {
                        this.gridApi.ensureIndexVisible(incomingStartRow);
                    }
                    // this.gridApi?.hideOverlay();
                },
                (error) => {
                    this.gridApi?.hideOverlay();
                    this.gridApi?.setGridOption('rowData', []);
                }
            );
    }

    exportExcel(endPoint: any, fileName: any) {
        let sortModel = this.gridApi
            ?.getColumnState()
            ?.filter((col) => col.sort !== undefined && col.sort !== null)
            .map((col) => {
                const colDef = this.gridApi?.getColumnDef(col['colId']);
                return { colId: colDef?.field, sort: col.sort };
            });

        let request = {
            sortModel,
        } as EscPaginatedRequest;

        if (
            this.searchTerm !== null &&
            this.searchTerm !== undefined &&
            this.searchTerm !== ''
        ) {
            request.searchBy = {
                colIds: this.searchColsIds || [],
                filter: !isNaN(Number(this.searchTerm))
                    ? Number(this.searchTerm)
                    : this.searchTerm,
            };
        }

        if (
            this.filterModel !== null &&
            this.filterModel !== undefined &&
            Object.keys(this.filterModel).length > 0
        ) {
            request.filterModel = this.filterModel;
        }
        this.exportSubscription = this._httpClient
            .post(endPoint, request, {
                responseType: 'blob',
            })
            .subscribe((res: Blob) => {
                const url = window.URL.createObjectURL(res);
                const a = document.createElement('a');
                a.href = url;
                a.download =
                    fileName +
                    '-' +
                    // moment(new Date()).format('YYYY-MM-DD hh:mm:ss') +
                    '.xlsx'; // Change the file name and extension as needed
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    }
    clearTable() {
        this.searchTerm = '';
        this.filterModel = null;
        this.gridApi?.setGridOption('rowData', []);
        this.getAllSubscription?.unsubscribe();
        this.exportSubscription?.unsubscribe();
        this.meta = {
            totalElements: 0,
            size: 0,
            number: 0,
            totalPages: 0,
        };
    }
    reset() {
        this.searchTerm = null;
        this.filterModel = null;
        this.gridApi?.setGridOption('rowData', []);
        this.getAllSubscription?.unsubscribe();
        this.exportSubscription?.unsubscribe();
        this.meta = {
            totalElements: 0,
            size: 0,
            number: 0,
            totalPages: 0,
        };
    }
}
