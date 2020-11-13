import { Component, OnInit } from '@angular/core';
import {Product} from "../_models/product";
import {ChartService} from "./chart.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
products : Product[];
  constructor(
      private  chartService : ChartService
  ) { }

  ngOnInit(): void {
    this.products = this.chartService.products;
    this.getTotalPrice();
  }

  deleteChartProduct(id: string) {
    this.chartService.deleteChartProduct(id);
    // refresh the list
    this.products = this.chartService.findAll();
  }
  getTotalPrice() {
    let total = 0;

    this.products.map(item => {
      total += item.price;
    });

    return total
  }
}
