import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {


  @Input() id: number;

  @Output() add = new EventEmitter();

  //dados carregado
  public product: any;
  public colors: any = [];
  public sizes: any = [];

  //selcionar
  public selColor: any;
  public selSize: any;
  public print: any;

  public msg: string;

  constructor(private productService: ProductService,
    private modalService: NgbModal,
    private orderService: OrderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.get();
  }

  ngOnInit(): void {
  }


  get() {
    this.productService.getById(this.id).subscribe((data) => {
      this.product = data;
      this.product['stockProducts'].forEach((sp) => {
        let color = this.colors.filter((c) => c['id'] === sp.color.id);
        if (color.length === 0)
          this.colors.push(sp.color);
      });
      this.product['stockProducts'].forEach((sp) => {
        let size = this.sizes.filter((c) => c['id'] === sp.size.id);
        if (size.length === 0)
          this.sizes.push(sp.size);
      });
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true }).result.then((result) => {
    }, (reason) => {
    });
  }

  public async addStockProduct() {
    if (!this.selColor) {
      this.msg = 'não foi selecionado a cor';
      return;
    }
    if (!this.selSize) {
      this.msg = 'não foi selecionado o tamanho';
      return;
    }
    this.msg = null;
    this.orderService.addStockProductColorAndSize(this.selColor.id, this.selSize.id, this.id, this.print);
    this.add.emit();
  }


  selectColor(color: any) {
    this.msg = null;
    this.selColor = color;
  }

  selectSize(size: any) {
    this.msg = null;
    this.selSize = size;
  }

  printSelect(print, modal) {
    this.print = print;
    modal.dismiss('Cross click');
  }

}
