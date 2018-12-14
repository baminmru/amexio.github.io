/**
 * Created by ketangote on 12/1/17.
 */
/*
 Component Name : Amexio RightAllignedTab
 Component Selector : <amexio-right-vertical-tab-view >
 Component Description : Right Aligned Vertical Tab component for Angular Apps with multiple
 configurations such as Tab, Icon support.
*/
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AmexioTabPillComponent } from '../tab.pill.component';

@Component({
  selector: 'amexio-right-vertical-tab-view',
  templateUrl: './right.vertical.component.html',
})
export class AmexioRightVerticalTabComponent implements AfterContentInit, AfterViewInit, OnInit {

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;

  @ContentChildren(AmexioTabPillComponent) queryTabs: QueryList<AmexioTabPillComponent>;

  @ViewChild('target', { read: ViewContainerRef }) target: any;

  tabCollection: AmexioTabPillComponent[];

  dummyArray: any[] = [];

  componentId = '';
/*
   Properties
   name : closable
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : This flag will make tab closable.
   */
  @Input() closable: boolean;
  /*
   Properties
   name :tab-position
   datatype : string
   version : 4.1.9 onwards
   default : top
   description : Position of tab can be (top/bottom)
   */
  @Input() tabPosition: string;
  /*
Events
name : onClick
datatype :none
version : 4.0 onwards
default : none
description : Callback to invoke on activated tab event.
*/
  @Output() onClick: any = new EventEmitter<any>();

  content: string;

  constructor(public render: Renderer2, private componentFactoryResolver: ComponentFactoryResolver) {
    this.tabPosition = 'top';
  }

  ngOnInit() {
    this.componentId = Math.floor(Math.random() * 90000) + 10000 + '_tabc';
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
  }

  onTabClick(tab: any) {
    if (!tab.disabled && !tab.header) {
     for (const i of this.tabCollection) {
       if (i === tab) {
         i['active'] = true;
         this.asignTabPillClass(tab);
         this.onClick.emit(tab);
        } else {
         i['active'] = false;
         i['tabPillClass'] = '';
       }
     }
     this.tabCollection.forEach((tab1: any) => {
       this.asignTabPillClass(tab1);
     });
   }
 }
 asignTabPillClass(tabData: any) {
  tabData.tabPillClass = '';
  if ((!tabData.amexiocolor || tabData.amexiocolor === '') && tabData.active && (this.tabPosition === 'top')) {
    tabData.tabPillClass = 'activetab';
  }
  if ((!tabData.amexiocolor || tabData.amexiocolor === '') && (this.tabPosition === 'bottom') && tabData.active) {
    tabData.tabPillClass = 'bottomActivetab';
  }
  if (tabData.disabled) {
    tabData.tabPillClass = 'disabled-tab';
  }
  if ((tabData.amexiocolor !== '') && (this.tabPosition === 'top') && tabData.active) {
    tabData.tabPillClass = 'activecolortab';
  }
  if ((tabData.amexiocolor !== '') && (this.tabPosition === 'bottom') && tabData.active) {
    tabData.tabPillClass = 'activebottomcolortab';
  }
}
  findTabStyleClass() {
    if (this.tabPosition === 'top') {
      return 'tabposition-right-top';
    }
    if (this.tabPosition === 'bottom') {
      return 'tabposition-right-bottom';
    }
  }
  closeAllTabs() {
    this.tabCollection.forEach((tabs) => {
      if (tabs.closable === true || this.closable === true) {
        this.closeTab(tabs);
      }
    });
  }
  addDynamicTab(title: string, amexiocolor: string, closable: boolean, component: any) {
    // get a component factory for our TabComponent
    const tpCF = this.componentFactoryResolver.resolveComponentFactory(AmexioTabPillComponent);
    const tp = this.target.createComponent(tpCF);
    // set the according properties on our component instance
    const instance: AmexioTabPillComponent = tp.instance as AmexioTabPillComponent;
    instance.title = title;
    instance.active = true;
    instance.closable = closable;
    instance['tabpillinstance'] = this.target;
    if (instance.amexiocolor === '') {
      instance.amexiocolor = 'amexio-top-tab-black';
    } else {
      instance.amexiocolor = 'amexio-top-tab-' + amexiocolor;
    }
    // create dynamic component
    const dynCF = this.componentFactoryResolver.resolveComponentFactory(
      component,
    );
    const dynCmp = tp.instance.target.createComponent(dynCF);

    // Push new tab and select it.
    this.dummyArray.push(tp);
    this.tabCollection.push(tp.instance);
    this.selectTab(tp.instance);
    return dynCmp.instance;
  }
  selectTab(tab: AmexioTabPillComponent) {
    // deactivate all tabs
    this.tabCollection.forEach((tab1: any) => {
      tab1.active = false;
    });
    tab.active = true;
    this.tabCollection.forEach((tab1: any) => {
      this.asignTabPillClass(tab1);
    });
  }

  closeTab(tabNode: AmexioTabPillComponent) {
    const newTab: AmexioTabPillComponent[] = [];
    let index = 0;
    let tabHighlightIndex = 0;

    this.tabCollection.forEach((tab: any, i: number) => {
      tab.active = false;
      if (tab.tabId === tabNode.tabId) {
        tabHighlightIndex = index;
        if (tab.hasOwnProperty('tabpillinstance')) {
          tab.target.remove();
        } else {
          const removeNode = document.getElementById(tab.tabId).parentNode;
          const parentRefNode = removeNode.parentNode;
          parentRefNode.removeChild(removeNode);
        }
      } else if (tab.tabId !== tabNode.tabId) {
        newTab.push(tab);
      }
      index++;
    });

    if (tabHighlightIndex === newTab.length) {
      tabHighlightIndex--;
    }
    this.tabCollection = newTab;
    if (tabHighlightIndex > -1) {
      this.activateTab(newTab[tabHighlightIndex].tabId);
    } else {
      this.activateTab(null);
    }
    if (this.tabCollection.length === 1) {
      this.closable = false;
    }
    if (newTab.length === 1) {
      newTab[0].closable = false;
    }
  }
  activateTab(tabId: number) {
    this.tabCollection.forEach((tab) => {
      tab.active = false;
      if (tab.tabId === tabId) {
        tab.active = true;
      }
    });
  }
}
