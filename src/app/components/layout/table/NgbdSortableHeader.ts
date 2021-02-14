import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { SortEvent, SortColumn, SortDirection } from './SortEvent';

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})
export class NgbdSortableHeader {

    @Input() column: SortColumn = '';
    @Input() direction: SortDirection = '';
    @Input() visibled: boolean;
    @Output() sort = new EventEmitter<SortEvent>();

    private rotateK: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

    rotate() {
        if (!this.visibled) return;
        this.direction = this.rotateK[this.direction];
        this.sort.emit({ column: this.column, direction: this.direction });
    }
}