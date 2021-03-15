import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private orderService: OrderService,
    private modalService: NgbModal
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
            },
            (error: any) => {
              this.loading = false;
              Swal.fire('Oops...', 'Erro ao buscar dados do pedido!', 'error')
              // console.error(error);
            }
          )
        }
      }
    );
  }

  adicionarArquivo() {
    this.loading = true;
    const inputNode: any = document.querySelector('#file');

    let partes: string[] = inputNode.files[0].name.split('.');
    let extensao: string = partes[partes.length - 1];

    if (!(extensao.toUpperCase() == 'PDF')) {
      this.loading = false;
      Swal.fire('Oops...', 'Aceitamos apenas arquivos em formato PDF!', 'warning')
      return;
    }

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.readAsDataURL(inputNode.files[0]);
      reader.onload = (_event) => {
        const file = {
          name: inputNode.files[0].name,
          type: inputNode.files[0].type,
          base64: reader.result,
          orderId: this.order.id
        };

        this.orderService.addFile(file).subscribe(
          (data: any) => {
            this.loading = false;
            document.getElementById('dismissModal').click();
            Swal.fire('Sucesso', 'Etiqueta adicionada com sucesso', 'success');
          },
          (error: any) => {
            this.loading = false;
            Swal.fire('Oops...', 'Erro ao adicionar etiqueta!', 'error')
          });
      }
    }
  }

  //stock product filter
  filterStockProducts = (stockProducts) => stockProducts ? stockProducts.filter((sp) => !(!sp.stockProduct)) : [];


  //product filter
  filterProducts = (stockProducts) => stockProducts ? stockProducts.filter((sp) => !(!sp.product)) : [];

  openFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true }).result.then((result) => {
    }, (reason) => { });
  }

  close() {
    this.router.navigate(['orders']);
  }

}
