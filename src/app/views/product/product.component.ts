import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { StockProductService } from 'src/app/services/stock-product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {

  @Input() id: number;

  @Input() kit: boolean = false;

  @Output() add = new EventEmitter<any>();

  //dados carregado
  public product: any;
  public colors: any = [];
  public sizes: any = [];

  //selcionar
  public selColor: any;
  public selSize: any;
  public print: any;

  public msg: string;

  //kit
  public productKit: any;
  public selStockProductKit: any = [];

  public loading: boolean = false;

  constructor(private productService: ProductService,
    private modalService: NgbModal,
    private orderService: OrderService,
    private stockProductService: StockProductService) { }

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

  openPrint(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true }).result.then((result) => {
    }, (reason) => {
    });
  }

  openKitProduct(content, product) {
    this.productKit = product;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true }).result.then((result) => {
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
    this.add.emit(null);
  }

  public async addKitProduct() {
    if (!this.selColor) {
      this.msg = 'não foi selecionado a cor';
      return;
    }
    if (!this.selSize) {
      this.msg = 'não foi selecionado o tamanho';
      return;
    }
    this.msg = null;
    this.loading = true;
    this.stockProductService.getByColorAndSizeAndProduct(this.selColor.id, this.selSize.id, this.id).subscribe((data: any) => {
      this.loading = false;
      if (this.print)
        data.print = this.print;
      this.add.emit(data);
    });
  }

  public selProduct(product) {
    this.add.emit(product);
  }


  selectColor(color: any) {
    this.msg = null;
    this.selColor = color;

    let colorPhoto = this.product.productColorPhotos.filter(photo => photo.color.id == color.id);
    if(colorPhoto && colorPhoto.length > 0) {
      this.product.photo = colorPhoto[0].photo;
    }

    console.log(this.product.photo);
  }

  selectSize(size: any) {
    this.msg = null;
    this.selSize = size;
  }

  printSelect(print, modal) {
    this.print = print;
    modal.dismiss('Cross click');
  }

  public getStockProduct(product): any {
    if (this.selStockProductKit) {
      for (const st of this.selStockProductKit) {
        if (product.id === st.product.id)
          return st;
      }
      return null;
    } else
      return null;
  }


  public addKit(modal, content, stock) {
    modal.dismiss('Cross click');
    let valid = true;
    let i = 0;
    let index;
    if (this.selStockProductKit)
      for (const st of this.selStockProductKit) {
        i++;
        if (stock.product.id === st.product.id) {
          valid = false;
          index = 1;
        }
      }
    console.log(valid, index)
    if (valid)
      this.selStockProductKit.push(stock);
    else
      this.selStockProductKit.splice(index - 1, 1, stock);
  }
}