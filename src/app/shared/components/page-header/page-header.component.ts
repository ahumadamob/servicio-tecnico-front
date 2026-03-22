import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly actionLabel = input<string>('');
  readonly actionLink = input<string>('');
  readonly actionIcon = input<string>('bi-plus-lg');
}
