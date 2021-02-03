import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  public products: any;
  public product: any;

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.productService.filter().subscribe((data) => {
      this.products = data['docs'];
    })
  }


  open(content, product) {
    this.product = product;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true }).result.then((result) => {
    }, (reason) => {
      this.product = null;
    });
  }

}
