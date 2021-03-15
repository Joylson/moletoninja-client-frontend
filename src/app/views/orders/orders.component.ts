import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NgbdSortableHeader } from 'src/app/components/layout/table/NgbdSortableHeader';
import { SortEvent } from 'src/app/components/layout/table/SortEvent';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: any = [];
  public loading: boolean = false;

  //header
  public headers: string[] = ['Código', 'Data', 'Cliente', 'Total', 'Pago', ''];
  public headersName: string[] = ['id', 'date', 'order.user.name', 'order.total', 'order.payed', ''];
  public headersSort: boolean[] = [true, true, true, true, false];
  public order: string = null;
  public direction: string = null;

  //pagination
  public page: number = 1;
  public size: number = 1;
  public pageSize: number = 1;

  //search
  public dateText: string = '';

  public totalPagar: number = 0;

  @ViewChildren(NgbdSortableHeader) headersComponent: QueryList<NgbdSortableHeader>;

  constructor(private orderService: OrderService) {
    this.pageSize = 5;
    this.filter();
  }

  ngOnInit(): void {
  }

  private reducer = (accumulator, currentOrder) => {
    if (!currentOrder.payed) return accumulator + currentOrder.total;
    else return accumulator;
  };

  public filter() {
    let date: Date = null;
    if (this.dateText && this.dateText.split('/').length === 3) date = moment(this.dateText, 'DD/MM/YYYY').toDate();

    this.loading = true;

    this.orderService.getByClient(this.order ?? 'id', this.direction ?? 'ASC', this.page, 5, date).subscribe(
      (data: any) => {
        this.orders = data['docs'];
        this.size = data['total'];
        this.loading = false;
        this.totalPagar = this.orders.reduce(this.reducer, 0) || 0;
      },
      (error: any) => {
        this.loading = false;
        Swal.fire('Oops...', 'Erro ao listar pedidos!', 'error');
        // console.log(error);
      }
    );
  }

  public onSort({ column, direction }: SortEvent) {
    this.page = 1;
    let i = this.headersName.indexOf(column);
    this.headersComponent.forEach(header => {
      if (header.column !== column) {
        header.direction = '';
      }
    });
    if (this.direction !== '') {
      this.order = column;
      this.direction = direction.toUpperCase();
    } else {
      this.order = null;
      this.direction = null;
    }
    this.filter();
  }

  public search(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.page = 1;
      this.filter();
    }
  }

  public pageSelect() {
    this.filter();
  }
}
