import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '../export.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";

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

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  dataSource: MatTableDataSource<Export> = new MatTableDataSource<Export>([]);

  constructor(
    private dataService: ExportService,
  ) { }


  displayedColumns: string[] = ['name', 'date', 'time', 'username', 'local'];


  ngOnInit() {
    this.dataService.getExports().subscribe((data: Export[]) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Export>(data);
      this.dataSource.sort = this.sort;
    })
  }

}
