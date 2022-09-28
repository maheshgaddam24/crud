import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})

export class EmployeeListComponent implements OnInit {
  Employee: any = [];

  constructor(public restApi: RestApiService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  // Get employees list
  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    });
  }

  // Delete employee
  deleteEmployee(_id: string) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteEmployee(_id).subscribe((data) => {
        this.loadEmployees();
      });
    }
  }
}
