import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-component-custom',
  templateUrl: './component-custom.component.html',
  styleUrls: ['./component-custom.component.scss'],
})
export class ComponentCustomComponent  implements OnInit, OnChanges, OnDestroy {


  @Input() variable!: boolean
  
  
  constructor() {
    console.log("este mensae se manda desde el contructor")
   }

  ngOnInit(): void {
    console.log("este se manda desde el hook onInit")
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variable']){
      console.log("valor: ", changes['variable'].currentValue)
    }
    
  }

  ngOnDestroy(): void {
    console.log("evento para destruir")
  }



}
