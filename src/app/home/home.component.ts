import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '../export.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup} from "@angular/forms";
import {ReplaySubject, takeUntil} from "rxjs";
import * as moment from 'moment';

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
  localsList: string[] = [];

  filterFormGroup: FormGroup;
  filterValues: any = {
    local: '',
    from: '',
    to: '',
  };

  #destroyed$ = new ReplaySubject<boolean>(1);

  constructor(
    private dataService: ExportService,
  ) {
    this.filterFormGroup = new FormGroup({
      localFilter: new FormControl(),
      fromFilter: new FormControl(),
      toFilter: new FormControl(),
    });
  }


  displayedColumns: string[] = ['name', 'date', 'time', 'username', 'local'];


  ngOnInit() {
    this.dataService.getExports().pipe(takeUntil(this.#destroyed$)).subscribe((data: Export[]) => {
      for(const i in data){
        this.localsList.push(data[i].local);
      }
      this.dataSource = new MatTableDataSource<Export>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = function(data: any, filterValue: string) {
        const searchTerms = JSON.parse(filterValue);

        const date = moment(data.date?.date).format('YYYY-MM-DD');

        const local_found = (!searchTerms.local.trim() || data.local.trim()
          .toLocaleLowerCase().indexOf(searchTerms.local.trim().toLocaleLowerCase()) >= 0);


        return local_found &&
          (!searchTerms.from || moment(date).isAfter(searchTerms.from)) &&
          (!searchTerms.to || moment(date).isBefore(searchTerms.to));
      };
    })
  }

  filter() {
    this.filterValues = {
      local: this.filterFormGroup.controls['localFilter'].value ?? '',

      from: !!this.filterFormGroup.controls['fromFilter'].value
        ? moment(this.filterFormGroup.controls['fromFilter'].value).format('Y-MM-DD')
        : '',

      to: !!this.filterFormGroup.controls['toFilter'].value
        ? moment(this.filterFormGroup.controls['toFilter'].value).format('Y-MM-DD')
        : '',
    };

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  clear() {
    this.filterFormGroup.reset();
    this.dataSource.filter = '';
  }

}
