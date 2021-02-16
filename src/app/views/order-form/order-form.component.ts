import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  public order: any = {};
  public loading: boolean = false;
  public model: NgbDateStruct;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params => {
        if (params.id) {
          this.loading = true;

          this.orderService.getById(params.id).subscribe(
            (obj: any) => {
              this.order = obj;
              this.order.partner = `${this.order.user.id} - ${this.order.user.name}`
              this.order.total = 0.0;

              if (this.order.orderProducts)
                for (let item of this.order.orderProducts) {
                  this.order.total += parseFloat(item.price) * parseFloat(item.quantity);
                }

              this.order.date = moment(this.order.date).format('DD/MM/YYYY');

              this.loading = false;

              console.log(this.order.orderProducts);
            },
            (error: any) => {
              this.loading = false;
              Swal.fire('Oops...', 'Erro ao buscar dados do pedido!', 'error')
              console.error(error);
            }
          )
        }
      }
    );
  }

  close() {
    this.router.navigate(['orders']);
  }

}
