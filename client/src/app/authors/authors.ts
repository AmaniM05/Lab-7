import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../books/service/books-service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.html',
  styleUrls: ['./authors.css'],
  imports: [ReactiveFormsModule]
})
export class Authors {
  private booksService: BooksService = inject(BooksService);

  idControl = new FormControl<number | null>(null, [Validators.required, Validators.min(1)]);
  author: any = null;
  message = '';

  onSubmit(): void {
    const id = this.idControl.value;
    if (id === null) {
      return;
    }
    this.author = null;
    this.message = '';
    this.booksService.getAuthor(id).subscribe({
      next: (data: any) => {
        this.author = data;
      },
      error: (_: any) => {
        this.message = `No author found with id ${id}`;
      }
    });
  }
}