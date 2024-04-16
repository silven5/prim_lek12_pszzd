import { Component } from '@angular/core';
import { Dish } from './shared/dish';
import { DishesService } from './shared/dishes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'prim_lek12_pszzd';
  edit = false;
  add = false;
  id!: number;
  dish: Dish = new Dish();
  // Масив страв
  Dishings!: Array<Dish>;
  constructor(private dService: DishesService) {}

  ngOnInit() {
    this.fetchDish();
    let dishRes = this.dService.getDishList();
    let i = 0;
    dishRes.snapshotChanges().subscribe((res: any) => {
      this.Dishings = [];
      res.forEach((item: any) => {
        let a = item.payload.toJSON();
        if ('name' in a && 'id' in a && 'price' in a)
          this.Dishings.push(a as Dish);
      });
    });
  }
  fetchDish() {
    this.dService
      .getDishList()
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
      });
  }
  deleteDishing(id: number) {
    if (window.confirm('Do you really want to delete?')) {
      this.dService.deleteDish(this.Dishings[id].id);
    }
  }
  editDishtoggle(id: number) {
    this.edit = true;
    this.dish = new Dish();
    this.id = id;
    this.dish.id = this.Dishings[this.id].id;
    this.dish.name = this.Dishings[this.id].name;
    this.dish.price = this.Dishings[this.id].price;
  }
  update(name: any, price: any) {
    this.dish.name = name;
    this.dish.price = price;
    if (this.edit) {
      this.id = this.id + 1;
      this.dService.updateDishg(this.id, this.dish);
      this.edit = false;
    }
    if (this.add) {
      console.log(this.dish);
      this.dish.id = (this.Dishings.length + 1).toFixed();
      this.dService.updateDishg(this.Dishings.length + 1, this.dish);
      this.add = false;
    }
  }
  adding() {
    this.add = true;
  }
}
