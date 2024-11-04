import { Component } from '@angular/core';
import { ListProductosComponent } from "../../../components/list-productos/list-productos.component";

@Component({
  selector: 'app-page-productos',
  standalone: true,
  imports: [ListProductosComponent],
  templateUrl: './page-productos.component.html',
  styleUrl: './page-productos.component.css'
})

export class PageProductosComponent {

}
