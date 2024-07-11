import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { INewsArticle } from '../constants/interfaces';

@Injectable({ providedIn: 'root' })
export class NewsArticleService {
  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }
  async getNews({
    query,
    country,
    category,
    page,
    pageSize,
  }: {
    query?: string;
    country?: string;
    category?: string;
    page: number;
    pageSize: number;
  }) {
    console.log('making an attempt...');
    let vals = [];
    vals.push(`page=${page}`);
    vals.push(`pageSize=${pageSize}`);
    if (query != null && query != '' && query != ' ') vals.push(`q=${query}`);
    if (country != null && country != ' ') vals.push(`country=${country}`);
    if (category != null && category != ' ') vals.push(`category=${category}`);
    const paramString = vals.join('&');
    const x = await lastValueFrom(
      this.http.get(`http://localhost:8000/api/v1/news?${paramString}`)
    );
    console.log(x);
    return (x as any)['articles'] as INewsArticle[];
  }
}
