import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {

  @Input()
  empty_text:string;

  constructor() { }

  ngOnInit() {}

}
