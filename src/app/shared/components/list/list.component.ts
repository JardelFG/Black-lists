import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { addListItem, clearListItems, removeLisItem } from '../../../Store/actions/list.actions';
import { selectAllLists, selectListById } from '../../../Store/selectors/list.selectors';
import { ItemList } from './../../../models/itemList.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent {
  name = '';
  selectedListId = '';
  searchTerm = '';

  lists$: Observable<any>;
  list$: Observable<any>;

  filteredItems: ItemList[] = [];

  constructor(private store: Store, private route: ActivatedRoute) {
    this.lists$ = this.store.select(selectAllLists);
    this.list$ = this.store.select(selectListById(this.selectedListId));

    this.route.paramMap.subscribe((params) => {
      const urlId = params.get('id');
      if (urlId) {
        this.selectedListId = urlId;
      }
      this.list$ = this.store.select(selectListById(this.selectedListId));
    });

    // this.list$.subscribe((list) => {
    //   this.searchItems(list?.items ?? []);
    // });
  }

  addItem() {
    const generatedId = uuid();
    if (!this.name.length) return;
    this.list$
      .subscribe((list) => {
        const exists = list.items.some((item: any) => item.name === this.name);
        if (exists) return;
        this.store.dispatch(
          addListItem({
            item: {
              name: this.name,
              id: generatedId,
            },
            id: this.selectedListId,
          })
        );
        this.name = '';
      })
      .unsubscribe();
  }

  removeItem(item: ItemList) {
    this.store.dispatch(removeLisItem({ item, listId: this.selectedListId }));
  }

  clearListItems() {
    this.store.dispatch(clearListItems({ listId: this.selectedListId }));
  }

  searchItems(items: ItemList[]) {
    this.filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    }
    );
  }
}
