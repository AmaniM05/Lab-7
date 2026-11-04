import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {

  authorId = 0;
  author: any = null;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  searchAuthor() {

    this.author = null;
    this.errorMessage = '';

    this.http.get(`http://localhost:8080/books-api/authors/${this.authorId}`)
      .subscribe({
        next: (data) => {
          this.author = data;
        },
        error: () => {
          this.errorMessage = 'Author not found';
        }
      });
  }
}