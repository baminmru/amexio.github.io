/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*Created by ashwini on 01/03/19.
*/

import { AfterViewInit, EventEmitter, Input, OnDestroy, OnInit, Output  } from '@angular/core';
export class LifeCycleBaseComponent implements OnDestroy, OnInit, AfterViewInit {

    @Input('enable-lifecycle-events') enableLifeCycleEvents: string;
    @Output() initiated: any = new EventEmitter<any>();
    @Output() ready: any = new EventEmitter<any>();
    @Output() destroy: any = new EventEmitter<any>();
    roundedgeclass: string;
    ngOnInit() {
        if (this.enableLifeCycleEvents === 'all' || this.enableLifeCycleEvents === 'init') {
            this.lifeCycleInit();
        }
    }

    ngAfterViewInit() {
        if (this.enableLifeCycleEvents === 'all' || this.enableLifeCycleEvents === 'ready') {
            this.lifeCycleAfterViewInit();
        }
    }
    ngOnDestroy() {
        if (this.enableLifeCycleEvents === 'all' || this.enableLifeCycleEvents === 'destroy') {
            this.lifeCycleDestroy();
        }
    }
    lifeCycleInit() {
        this.initiated.emit();
    }
    lifeCycleAfterViewInit() {
        this.ready.emit();
    }
    lifeCycleDestroy() {
        this.destroy.emit();
    }

    setRoundEdge() {
      this.roundedgeclass = 'roundEdgeCommonCss';
    }
}
