import { Dish } from './dish';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  dishListRef!: AngularFireList<any>;
  dishRef!: AngularFireObject<any>;
  dbName = 'dish4';
  constructor(private db: AngularFireDatabase) {}
  // Create
  createDish(dish: Dish) {
    return this.dishListRef.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
    });
  }

  // Get Single
  getDish(id: string) {
    this.dishRef = this.db.object('/' + this.dbName + '/' + id);
    return this.dishRef;
  }

  // Get List
  getDishList() {
    this.dishListRef = this.db.list('/' + this.dbName);
    return this.dishListRef;
  }

  // Update
  updateDishg(id: number, dish: Dish) {
    this.dishRef = this.db.object('/' + this.dbName + '/' + id);
    return this.dishRef.update({
      id: dish.id,
      name: dish.name,
      price: dish.price,
    });
  }

  // Delete
  deleteDish(id: string) {
    this.dishRef = this.db.object('/' + this.dbName + '/' + id);
    this.dishRef.remove();
  }
}
