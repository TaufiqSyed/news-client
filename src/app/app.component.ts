import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsArticleService } from './news.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private newsArticleService: NewsArticleService) {}
  ngOnInit(): void {
    this.newsArticleService.getNews();
    // const foo = new NewsArticleService();
  }
  title = 'client';
}
