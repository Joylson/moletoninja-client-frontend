import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-prints',
  templateUrl: './prints.component.html',
  styleUrls: ['./prints.component.scss']
})
export class PrintsComponent implements OnInit {

  public prints: any;

  @Output() print = new EventEmitter<any>();

  constructor(private printService: PrintService) { }

  ngOnInit(): void {
    this.printService.get().subscribe((data) => {
      this.prints = data;
    })
  }

  select(print: any) {
    this.print.emit(print);
  }
}
