import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { SizeService } from 'src/app/services/size.service';
import { environment } from 'src/environments/environment';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  //product
  public products: any;
  public product: any;

  //colors
  public colors: any;
  public color: any;

  //size
  public sizes: any;
  public size: any;

  //favorited
  private favorited: boolean = false;

  //model
  public models: any;
  public model: any;

  //pagination
  public page: number = 1;
  public sizePage: number = 1;
  public pageSize: number = 1;

  public filterSelectColor: boolean = false;
  public filterSelectSize: boolean = false;
  public filterSelectModel: boolean = false;

  constructor(private router: Router,
    private productService: ProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private favoriteService: FavoriteService
  ) {
    this.pageSize = environment.page;
  }

  ngOnInit(): void {
    this.filter();
  }




  filter() {
    this.activeRoute.queryParams.subscribe(params => {
      let search = params['search'];
      this.favorited = params['favorited'] && params['favorited'] === 'true' ? true : false;
      this.productService.filter('id', 'ASC', this.model ? this.model.type : null, this.page, environment.page, search, this.size ? this.size.id : null, this.color ? this.color.id : null, this.favorited).subscribe((data) => {
        this.products = data['docs'];
        this.sizePage = data['total'];
        console.log(data['docs']);
      })
    });
  }

  open(content: any, product: any) {
    this.product = product;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true }).result.then((result) => {
    }, (reason) => {
      this.product = null;
    });
  }

  public add(modal, content, product) {
    modal.dismiss('Cross click');
    // if(product){
    //   this.open(content, product);
    // }
  }

  selectColor(color) {
    this.color = color;
    this.filterSelectColor = false;
    this.filter();
    this.colors = null;
  }

  filterColor() {
    if (!this.filterSelectColor) {
      this.colorService.get().subscribe((data) => {
        this.colors = data;
        this.filterNone();
        this.filterSelectColor = true;
      }, (error) => console.log(error))
    } else {
      this.filterNone();
      this.filterSelectColor = false;
    }
  }

  selectSize(size) {
    this.size = size;
    this.filterSelectSize = false;
    this.filter();
    this.sizes = null;
  }

  filterSize() {
    if (!this.filterSelectSize) {
      this.sizeService.get().subscribe((data) => {
        this.sizes = data;
        this.filterNone();
        this.filterSelectSize = true;
      }, (error) => console.log(error))
    } else {
      this.filterNone();
      this.filterSelectSize = false;
    }
  }

  selectModel(model) {
    this.model = model;
    this.filterSelectModel = false;
    this.filter();
    this.models = null;
  }

  filterModel() {
    if (!this.filterSelectModel) {
      this.models = this.modelsReload();
      this.filterNone();
      this.filterSelectModel = true;
    } else {
      this.filterNone();
      this.filterSelectModel = false;
    }
  }

  modelsReload = () => [
    { name: 'Masculino', type: 'M' },
    { name: 'Feminino', type: 'F' },
    { name: 'Unissex', type: 'U' }
  ];

  filterNone() {
    this.filterSelectColor = false;
    this.filterSelectSize = false;
    this.filterSelectModel = false;
  }

  diplayFilter() {
    return { 'filter-visibled': this.filterSelectSize || this.filterSelectColor || this.filterSelectModel }
  }

  onover(product) {
    console.log('teste')
    if (product.typePhoto) {
      product.typePhoto = true;
    } else {
      product.typePhoto = false;
    }
  }


  addFavorite(product) {
    if (product.favorites.length === 0)
      this.favoriteService.post({ productId: product.id }).subscribe((data) => {
        this.filter();
      });
    else
      this.favoriteService.delete(product.favorites[0].id).subscribe((data) => {
        console.log(data)
        this.filter();
      });
  }

}
