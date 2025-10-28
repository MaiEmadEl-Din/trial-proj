import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    type OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ColDef, GridApi } from 'ag-grid-community';
import { gridAdvancedPaginationService } from '../../../../public/services/grid-advanced-pagination.service';

export interface ITableAction {
    buttonType:
    | 'Search'
    | 'Filter'
    | 'Export'
    disabled?: boolean;
    action: (output?: any) => void;
}

export interface TableFilterConfig {
    key: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'date' | 'checkbox';
    options?: { value: any; label: string }[]; // for select
}

@Component({
    selector: 'esc-table-header',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatMenuModule,
        MatButtonModule,
        MatDatepickerModule,
        FormsModule,
        MatCheckboxModule,
        MatTabsModule,
    ],
    templateUrl: './esc-table-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EscTableHeaderComponent {
    advancedPaginatedService = inject(gridAdvancedPaginationService);
    @Input() filterConfig: TableFilterConfig[] = [];
    @Input() showGridInfo: boolean = false;
    @Input() gridApi!: GridApi;
    @Input() actions!: ITableAction[];
    @Input() startPage: number = 0;
    @Input() recordPerPage: number = 10;
    @Input() hasFilter: boolean = false;
    columnOptions: ColDef[] = [];
    activeColumns = new FormControl<ColDef[]>([]);
    searchInput = new FormControl();
    pageNumber: number = 0;
    public showSearchBar = false;
    showIconSearch = true;
    @ViewChild('searchBarWrapper', { read: ElementRef }) searchBarElement!: ElementRef;
    ngOnInit(): void {
        this.searchInput.valueChanges.subscribe((value) => {
            this.actions.forEach((action: ITableAction) => {
                if (
                    action.buttonType === 'Search' &&
                    (!value || value.length === 0)
                ) {
                    action.action(this.searchInput);
                }

            });
        });
    }

    clickedSearchIcon(event: Event) {
        event.stopPropagation();
        this.showSearchBar = !this.showSearchBar;
        this.showIconSearch = !this.showIconSearch;
    }

    search(event: any, action: (output?: any) => void) {
        if (event.key === 'Enter') {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            action(this.searchInput);
        }
    }

    clearSearchInput(event: any, action: (output?: any) => void) {
        this.searchInput.reset();
        event.preventDefault();
        // Trigger the button element with a click
        action(this.searchInput);
    }
    @HostListener('document:click', ['$event'])
    clickout(event: Event): void {
        // Get the target element of the click event
        const target = event.target as HTMLElement;
        // Check if the click is outside the search bar and its container
        const isInsideSearchBar =
            this.searchBarElement?.nativeElement?.contains(target);

        if (!this.showSearchBar || isInsideSearchBar) {
            return;
        }

        this.showSearchBar = false;
        this.showIconSearch = true;
    }

    getTotalRecords(): number {
        if (this.gridApi) {
            return this.gridApi.getDisplayedRowCount(); // Use AG Grid's method to get displayed row count
        }
        return 0;
    }


    filterTabs = ['All', 'Active', 'Inactive'];
    activeFilter = 'All';

    onFilterChange(tab: string) {
        this.activeFilter = tab;
        let filterModel: Record<string, any> = {};

        switch (tab) {
            case 'Active':
                filterModel = {
                    "filterType": "text",
                    "operator": "and",
                    "type": "contains",
                    "filter": "active"
                };
                break;
            case 'Inactive':
                filterModel = {
                    "filterType": "text",
                    "operator": "and",
                    "type": "contains",
                    "filter": "inactive"
                };
                break;
            default:
                filterModel = {};
                break;
        }

        this.advancedPaginatedService.$filterModel = filterModel;
        this.advancedPaginatedService.getAdvancedPagination();
    }

}
