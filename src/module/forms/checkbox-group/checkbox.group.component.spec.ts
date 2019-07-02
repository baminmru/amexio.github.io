/**
 * Created by kedar 26/6/2019.
 */

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioCheckBoxGroupComponent } from './checkbox.group.component';
import { AmexioCheckBoxComponent } from '../checkbox/checkbox.component';
import { CheckboxComponent } from './checkbox.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';

import { HttpEvent, HttpEventType } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('amexio-checkbox-group', () => {
  let comp: AmexioCheckBoxGroupComponent;
  let fixture: ComponentFixture<AmexioCheckBoxGroupComponent>;
  let DataService: CommonDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      declarations: [AmexioCheckBoxGroupComponent, CheckboxComponent],
      providers: [IconLoaderService, CommonDataService],
    });
    fixture = TestBed.createComponent(AmexioCheckBoxGroupComponent);
    comp = fixture.componentInstance;
    DataService = TestBed.get(CommonDataService);
    httpMock = TestBed.get(HttpTestingController);
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    it('true is true', () => expect(true).toBe(true));
  });

  //check variables 
  it('check variables ', () => {

    let i = [];
    expect(comp.selectedCheckBox).toBeUndefined();
  });


  it('checking ngOnInit() method', () => {

    let value = comp.value;
    let resp: any;

    
    comp.ngOnInit();
    comp.componentId = comp.createCompId('checkboxgroup', comp.name);

    comp.data = 
    {
      "codeData": [
        {
        'id':1,
        'name':'kedar'
      }
    ]
  }
  
  comp.datareader = "codeData";

  expect(comp.datareader).toBe('codeData');
//   expect(comp.data).toBe({
//     "codeData": [
//       {
//       'id':1,
//       'name':'kedar'
//     }
//   ]
// });
it('getResponseData', () =>{
  let httpResponse:any;
  comp.getResponseData(httpResponse);
  let responsedata = httpResponse;
  comp.datareader = 'data.localdata'
  expect(comp.datareader).not.toEqual(null);
  const dr = comp.datareader.split('.');
  for (const ir of dr) {
    responsedata = responsedata[ir];
  }
  comp.datareader =null;
  expect(comp.datareader).toEqual(null);
  responsedata = httpResponse;
  return responsedata;
});

it('emitData', () =>{
  comp.emitData();
  comp.SelectedCheckBox = [];
  comp.data.forEach((node: any) => {
    if (node.checked) {
      comp.SelectedCheckBox.push(node);
    }
  });
  comp.onSelection.emit(this.SelectedCheckBox);
});

it('contains', () =>{
  let value:any;
  comp.contains(value);
  comp['_model'] = [];
expect(comp['_model'] instanceof Array).toEqual(true);
comp['_model'].forEach((obj:any) => {
  if (obj[this.displayfield] === value[this.displayfield]) {
   return true;
 }
});
});


    // inject(
    //   [HttpTestingController, DataService],
    //   (httpMock: HttpTestingController, DataService: CommonDataService) => {
    //     const mockUsers = [
    //       { name: 'Bob', website: 'www.yessss.com' },
    //       { name: 'Juliette', website: 'nope.com' }
    //     ];

    //     DataService.fetchData((comp.httpurl, comp.httpmethod).subscribe((event: HttpEvent<any>) => {
    //       switch (event.type) {
    //         case HttpEventType.Response:
    //           expect(event.body).toEqual(mockUsers);
    //       }
    //     });
    //     const mockReq = httpMock.expectOne(DataService.url);

    //     expect(mockReq.cancelled).toBeFalsy();
    //     expect(mockReq.request.responseType).toEqual('json');
    //     mockReq.flush(mockUsers);

    //     httpMock.verify();
    //   });
  });


});
