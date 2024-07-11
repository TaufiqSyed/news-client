import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  ParamMap,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NewsArticleService } from './news.service';
import { INewsArticle, IOption } from '../constants/interfaces';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { countries } from '../constants/countries';
import { categories } from '../constants/categories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  page$: number;
  country$: string | undefined;
  category$: string | undefined;
  newsArticles: INewsArticle[] = [];

  queryString: string = '';

  countrySelect: any = ' ';
  countryOptions: IOption[] = countries.map((e) => ({ name: e, id: e }));

  categorySelect: any;
  categoryOptions: IOption[] = categories.map((e) => ({ name: e, id: e }));
  JSON: any;

  constructor(
    private newsArticleService: NewsArticleService,
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe((p) => {
      this.page$ = parseInt(p['page'] ?? '1');
    });
  }

  async fetchData() {
    const e = await this.newsArticleService.getNews({
      query: this.queryString,
      country: this.countrySelect.id,
      category: this.categorySelect.id,
      page: this.page$,
      pageSize: 9,
    });
    this.newsArticles = e;
  }

  handlePageChange(e: MouseEvent) {
    const s = (e.target as Element).id;
    const newPage = s.charAt(s.length - 1);
    this.page$ = parseInt(newPage);
    this.fetchData();
  }

  handleSearch(e: MouseEvent) {
    if (
      (this.countrySelect == null || this.countrySelect == ' ') &&
      (this.categorySelect == null || this.categorySelect == ' ') &&
      (this.queryString == null || this.queryString == '')
    ) {
      alert('Search is too vague - include more filters');
      return;
    }
    this.fetchData();
  }

  ngOnInit(): void {
    this.countrySelect = { name: 'us', id: 'us' };
    this.categorySelect = ' ';
    this.fetchData();
  }

  compareFn = this._compareFn.bind(this);

  // or
  // compareFn = (a, b) => this._compareFn(a, b);

  _compareFn(a: any, b: any) {
    // Handle compare logic (eg check if unique ids are the same)
    if (a == ' ' && b == ' ') return true;
    if (a == null || b == null) return false;
    return a.id === b.id;
  }

  title = 'client';
}
