import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { gridAdvancedPaginationService } from '../../../../../public/services/grid-advanced-pagination.service';
import { FormControl } from '@angular/forms';
import { appAgGridTheme } from '../../../../../public/services/ag-grid-theme';
import { ColDef, GridApi } from 'ag-grid-community';
import { API_URLS } from '../../../../../public/utils/API_URLS';
import { dateRendererComponent } from '../../../basicdata-component/components/ag-date-renderer';
import { statusRendererComponent } from '../../../basicdata-component/components/ag-status-renderer';
import { AgActionsRendererComponent } from '../../../shared/ag-actions-renderer/ag-actions-renderer.component';
import { EscTableHeaderComponent, ITableAction } from '../../../shared/esc-table-header/esc-table-header.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-forms-list',
  imports: [
    EscTableHeaderComponent, AgGridAngular, AgGridModule
  ],
  templateUrl: './forms-list.html',
  styleUrl: './forms-list.scss'
})
export class FormsList {
  router = inject(Router);
  // table
  rowData: any[] = [];
  advancedPaginatedService = inject(gridAdvancedPaginationService);
  searchTerm!: FormControl<string | null>;
  pageSize = 5;
  theme = appAgGridTheme;
  columnDefs: ColDef[] = [
    {
      headerName: 'Form Name',
      field: 'formName',
      colId: 'Form Name',
      flex: 1,
    },
    {
      headerName: 'Form ID',
      field: 'formId',
      colId: 'Form ID',
      flex: 1,
    },
    {
      headerName: 'Status ',
      field: 'status',
      colId: 'Status ',
      flex: 1,
      cellRenderer: statusRendererComponent,
      cellClass: '!flex !items-center'
    },
    {
      headerName: 'Creation Date',
      field: 'creationDate',
      colId: 'Creation Date',
      flex: 1,
      cellRenderer: dateRendererComponent
    },
    {
      headerName: 'Last Modified',
      field: 'lastModified',
      colId: 'Last Modified',
      flex: 1,
    },
    {
      cellRenderer: AgActionsRendererComponent,
      cellRendererParams: (params: any) => {
        return {
          actions: ['view', 'copy', 'delete'],
          onActionClick: this.onActionClick.bind(this),
        };
      },
      sortable: false,
      cellClass: 'flex items-center',
    }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: false,
    editable: false,
    lockPosition: false,
    suppressHeaderMenuButton: true,
    hide: false,
    unSortIcon: true,
    cellClass: 'flex items-center',
    icons: {
      sortUnSort:
        `<svg xmlns="http://www.w3.org/2000/svg" class="icon-size-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 5.83L15.17 9H8.83L12 5.83ZM12 18.17L8.83 15h6.34L12 18.17Z"/>
    </svg>`,
    },
    headerValueGetter: (params: any) => {
      return params.colDef.headerName;
    },
  };
  gridApi!: GridApi;
  actions: ITableAction[] = [
    {
      buttonType: 'Search',
      action: (event) => {
        console.log('Search event:', event);

        this.searchTerm = event;
        this.advancedPaginatedService.$searchTerm =
          this.searchTerm.value ?? '';
        this.advancedPaginatedService.$filterModel = null;
        this.advancedPaginatedService.getAdvancedPagination();
      },
    },
    {
      buttonType: 'Export',
      action: () => {
        console.log(
          'Export action triggered'
        );
      },
      disabled: false,
    },
  ];
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.advancedPaginatedService.$gridApi = this.gridApi;
    this.advancedPaginatedService.initData({
      pageSize: this.pageSize,
      endPoint: API_URLS.terminals.getPaginated,
      searchColsIds: [],
    });
  }

  onActionClick(action: string, params: any): void {
    if (action === 'view') {
      this.router.navigate(['/basic-data/edit/', params.id]);
    }
  }

}
