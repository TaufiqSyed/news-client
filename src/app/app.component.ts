import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsArticleService } from './news.service';
import { INewsArticle } from '../constants/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  newsArticles: INewsArticle[] = [];
  constructor(private newsArticleService: NewsArticleService) {}

  ngOnInit(): void {
    this.newsArticleService.getNews().then((e) => {
      this.newsArticles = e;
    });
    // const foo = new NewsArticleService();
  }
  title = 'client';
}
