import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { INewsArticle } from '../constants/interfaces';

@Injectable({ providedIn: 'root' })
export class NewsArticleService {
  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }
  async getNews() {
    console.log('making an attempt...');
    const x = await lastValueFrom(
      this.http.get(
        'http://localhost:8000/api/v1/news?q=Russia&pageSize=9&page=1'
      )
    );
    console.log(x);
    return x as any as INewsArticle[];
  }
}
