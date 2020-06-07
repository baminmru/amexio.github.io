import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild,
  ViewContainerRef } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';
import { AmexioParagraphComponent } from './amexio-paragraph/amexio-paragraph.component';

@Component({
  selector: 'amexio-custom-paragraph',
  templateUrl: './amexio-custom-paragraph.component.html',
  styleUrls: ['./amexio-custom-paragraph.component.scss'],
})
export class AmexioCustomParagraphComponent implements OnInit {

  /*
 Properties
 name : data
 datatype : string
 version : 5.21 onwards
 default : none
 description : local JSON data variable
 */
  _data: any;
  responseData: any;
  @Input('data')
  set data(value: any[]) {
    this._data = value;
  }
  get data(): any[] {
    return this._data;
  }

  /*
 Properties
 name : data-reader
 datatype : string
 version : 5.21 onwards
 default : none
 description : Key in JSON Datasource for records.
 */
  @Input('data-reader') datareader: string;

  /*
   Properties
   name : http-url
   datatype : string
   version : 5.21 onwards
   default : none
   description : REST url for fetching data.
   */
  @Input('http-url') httpurl: string;

  /*
   Properties
   name : http-method
   datatype : string
   version : 5.21 onwards
   default : none
   description : Type of HTTP call, POST,GET etc.
   */
  @Input('http-method') httpmethod: string;

  viewData: any[];
  componentRef: any;

  @ViewChild('customtext', { read: ViewContainerRef }) customText: ViewContainerRef;

  constructor(public dataService: CommonDataService,
              private resolver: ComponentFactoryResolver) {
  }

  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.viewData = this.data;

    this.viewData.forEach((ele) => {
      this.addComponent(ele);
    });
  }

  addComponent(attr: any) {
    const factory = this.resolver.resolveComponentFactory(AmexioParagraphComponent);
    this.componentRef = this.customText.createComponent(factory);

    this.componentRef.instance.content = attr.content;
    this.componentRef.instance.color = attr.color;
    this.componentRef.instance.type = attr.type;
    this.componentRef.instance.newline = attr.newline;
  }

  loadData() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response: any) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    } else if (this.data) {
      this.setData(this.data);
    }
  }

  ngOnInit() {
    this.loadData();
  }

  destroyComponent() {
    this.componentRef.destroy();
  }
}
