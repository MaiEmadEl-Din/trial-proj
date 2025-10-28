import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  imports: [RouterOutlet, RouterLinkWithHref, RouterModule],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss'
})
export class LayoutComponent {

}
