import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {


  @Input() id: number;

  //dados carregado
  public product: any;
  public colors: any = [];
  public sizes: any = [];

  //selcionar
  public selColor: any;
  public selSize: any;

  constructor(private productService: ProductService) { }

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
        console.log(size);
        if (size.length === 0)
          this.sizes.push(sp.size);
      });
    });
  }


  selectColor(color: any) {
    this.selColor = color;
  }

  selectSize(size: any) {
    this.selSize = size;
  }

}
