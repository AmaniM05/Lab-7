import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Author, Book } from '../model/book';

const BASE_URL = 'http://localhost:8080/books-api/';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private http = inject(HttpClient);

  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${BASE_URL}books/${id}`);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${BASE_URL}books`, book);
  }

  public addBookAuthor(id: number, author: Author): Observable<Author> {
    return this.http.post<Author>(`${BASE_URL}books/${id}/authors`, author);
  }

  public getAuthorsNamed(firstName: string, lastName: string): Observable<Author[] | undefined> {
    const options = {
      params: new HttpParams().set('firstName', firstName).set('lastName', lastName)
    };
    return this.http.get<any>(`${BASE_URL}authors`, options).pipe(
      map(response => response._embedded ? response._embedded.authors : undefined)
    );
  }

  public updateBookAuthors(bookId: number, authorId: number): Observable<any> {
    return this.http.patch(`${BASE_URL}books/${bookId}/authors/${authorId}`, {});
  }

  public getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${BASE_URL}authors/${id}`);
  }
}