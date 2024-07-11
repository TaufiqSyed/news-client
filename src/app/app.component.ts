import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
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

  countrySelect: any;
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

  ngOnInit(): void {
    this.countrySelect = ' ';
    this.categorySelect = ' ';
    this.newsArticleService.getNews().then((e) => {
      this.newsArticles = e;
    });
    // this.categorySelect = { name: 'health', id: 'health' };
    // const foo = new NewsArticleService();
  }

  title = 'client';
}
