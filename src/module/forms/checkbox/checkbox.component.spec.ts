import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AmexioCheckBoxComponent } from "./checkbox.component";


describe('amexio-checkbox', () => {
  let comp: AmexioCheckBoxComponent;
  let fixture: ComponentFixture<AmexioCheckBoxComponent>;
  let de: DebugElement;    // => Handle to to Components DOM instance
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioCheckBoxComponent], // declare the test component
    });

    fixture = TestBed.createComponent(AmexioCheckBoxComponent);  // => Fixture Creates the environment surrounding the component & the has access to the instance itself.
    comp = fixture.componentInstance;


    de = fixture.debugElement.query(By.css('label'));
    el = de.nativeElement;
  });

 // Check if correct field label is applied
  it('should display correct label', () => {
    let labelValue = 'UserName';
    comp.fieldlabel = labelValue;     // => Set the field label
    fixture.detectChanges();        // Fire Change
    expect(el.textContent).toContain(labelValue);  // check ?
  });

  it('callback method', () => {
    comp.onBlur();
    comp.tabFocus = false;
    comp['onTouchedCallback']();
  });
  it('tab Focus varible', () => {
   comp.tabFocus = false;
  });

  it('ngOnInit', () =>{
    comp.ngOnInit();
    comp.componentId =comp.createCompId('checkbox',comp.name);
  })

  it('createCompId If Method', () => {
    let inputType = 'checkbox';
    let name = null;
    comp.createCompId(inputType, name);
    expect(name).toEqual(null);
    return inputType + '_' + Math.floor(Math.random() * 1000 + 999);
  })

  it('createCompId If blank Method', () => {
    let inputType = 'checkbox';
    let name = '';
    comp.createCompId(inputType, name);
    expect(name).toEqual('');
    return inputType + '_' + Math.floor(Math.random() * 1000 + 999);
  })

  it('createCompId Else Method', () => {
    let inputType = 'checkbox';
    let name = 'chk';
    comp.createCompId(inputType, name);
    expect(name).not.toEqual('');
    expect(name).not.toEqual(null);
    return inputType + '_' + name;
  })
 
});
