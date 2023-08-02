import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  stats: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.http.get('http://localhost:8090/stats').subscribe((response: any) => {
      this.stats = response;
    });
  }
}
