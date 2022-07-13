import { Component, OnInit } from '@angular/core';
import { ExportService } from '../export.service';

export interface Export {
  name: string;
  date: object;
  time: object;
  username: string;
  local: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'time', 'username', 'local'];
  dataSource: Export[];

  constructor(private dataService: ExportService) {
    this.dataSource = [];
  }

  ngOnInit() {
    this.dataService.getExports().subscribe((data: Export[]) => {
      console.log(data);
      this.dataSource  = data;

    })
  }

}
