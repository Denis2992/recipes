import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LogginService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shoping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private idChangeSub: Subscription;

  constructor(
    private logginService: LogginService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.store.select('shoppingList').subscribe();
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy(): void {
    // this.idChangeSub.unsubscribe();
  }
}
