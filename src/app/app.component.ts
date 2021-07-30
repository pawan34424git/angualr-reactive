import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  customerName = 'reactive';
  dataList: any[] = [];
  constructor(private http: HttpClient, private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getServerSentEvent('customer/stream').subscribe((res) => {
      const {data} = res;
      this.dataList.push(data);

    });
  }
  submit() {
    const data={
      customerName: this.customerName
    }
    this.http.post('customer',data).toPromise();
    this.customerName = '';

  }
}
