import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutUsComponent } from '../about-us/about-us.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, AboutUsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
