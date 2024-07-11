import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NewsArticleService } from './news.service';
import { INewsArticle } from '../constants/interfaces';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  page$: Observable<string>;
  newsArticles: INewsArticle[] = [];
  constructor(
    private newsArticleService: NewsArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newsArticleService.getNews().then((e) => {
      this.newsArticles = e;
    });
    this.page$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('page') ?? '1')
    );
    // const foo = new NewsArticleService();
  }

  title = 'client';
}
