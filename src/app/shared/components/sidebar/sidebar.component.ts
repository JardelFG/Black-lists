import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { List } from '../../../models/list.model';
import { createNewList, deleteList } from '../../../Store/actions/list.actions';
import { selectAllLists } from '../../../Store/selectors/list.selectors';
import { RequestNewListComponent } from '../request-new-list/request-new-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  @Input() collapsed = false;

  lists$: Observable<List[]>;
  listId = ''
  constructor(
    private store: Store, 
    private dialog: MatDialog,
    private router: Router
  ) {
    this.lists$ = this.store.select(selectAllLists);
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  requestNewList() {
    const dialogRef = this.dialog.open(RequestNewListComponent, {
      width: '650px',
      height: '450px',
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addNewList(result);
      }
    });
  }

  addNewList(data: any) {
    const generatedId = uuid();
    console.log('add new list');
    this.store.dispatch(
      createNewList({
        list: {
          id: generatedId,
          title: data.title,
          label: data.title,
          background: data.background,
          route: generatedId,
          items: [],
        },
      })
    );
  }

  deleteList(listId: string) {
    this.store.dispatch(deleteList({ listId: listId }));
  }

  openDialog(dialog: HTMLDialogElement, id: string) {
    this.listId = id;
    dialog.showModal();
  }

  onConfirmDeleteList() {
    if (this.listId) {
      this.deleteList(this.listId)
    }
    (document.querySelector('dialog') as HTMLDialogElement).close()
    this.router.navigate(['/home'])
  }
}
