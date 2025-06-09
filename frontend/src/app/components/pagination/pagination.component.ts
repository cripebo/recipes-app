import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import {
  HlmPaginationDirective,
  HlmPaginationContentDirective,
  HlmPaginationItemDirective,
  HlmPaginationPreviousComponent,
  HlmPaginationNextComponent,
  HlmPaginationLinkDirective,
  HlmPaginationEllipsisComponent,
} from '@spartan-ng/ui-pagination-helm';

@Component({
  selector: 'app-pagination',
  imports: [
    HlmPaginationDirective,
    HlmPaginationContentDirective,
    HlmPaginationItemDirective,
    HlmPaginationPreviousComponent,
    HlmPaginationNextComponent,
    HlmPaginationLinkDirective,
    HlmPaginationEllipsisComponent,
  ],
  template: `
    @if (totalPages() > 1) {
      <nav hlmPagination>
        <ul hlmPaginationContent>
          <li hlmPaginationItem>
            <hlm-pagination-previous iconOnly="true" (click)="previousPage()" />
          </li>

          @for (page of visiblePages(); track $index) {
            @if (page === '...') {
              <li hlmPaginationItem>
                <hlm-pagination-ellipsis />
              </li>
            } @else {
              <li hlmPaginationItem>
                <a
                  hlmPaginationLink
                  (click)="goToPage($any(page))"
                  [isActive]="currentPage() === page"
                  >{{ page }}</a
                >
              </li>
            }
          }

          <li hlmPaginationItem>
            <hlm-pagination-next iconOnly="true" (click)="nextPage()" />
          </li>
        </ul>
      </nav>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  private DEFAULT_MAX_VISIBLE_PAGES = 7;
  maxVisiblePages = input(this.DEFAULT_MAX_VISIBLE_PAGES);
  totalItems = input.required<number>();
  totalPages = computed(() => Math.ceil(this.totalItems() / this.perPage()));
  currentPage = model.required<number>();
  perPage = input.required<number>();

  pages = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.pages.set([...Array(this.totalPages()).keys()].map((p) => p + 1));
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
    }
  }

  previousPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  visiblePages = computed(() => {
    const total = this.totalPages(); // Total number of available pages
    const current = this.currentPage(); // Current active page
    const maxButtons = this.maxVisiblePages(); // Maximum visible page buttons

    // If the total pages are less than or equal to the maximum visible, show all pages
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const sideButtons = Math.floor((maxButtons - 3) / 2);
    // Calculate how many buttons to show on each side of the current page.
    // Subtract 3 to reserve space for the first, last, and "..." markers

    // Always include the first page
    pages.push(1);

    // Determine the main range of pages around the current page
    let start = Math.max(2, current - sideButtons); // Not before page 2
    let end = Math.min(total - 1, current + sideButtons); // Not after the second last page

    // Adjust if we are near the beginning
    if (current <= sideButtons + 2) {
      start = 2;
      end = maxButtons - 2;
    }

    // Adjust if we are near the end
    if (current >= total - sideButtons - 1) {
      start = total - (maxButtons - 3);
      end = total - 1;
    }

    // If there is a gap between the first page and the main range, add "..."
    if (start > 2) pages.push('...');

    // Add the calculated page range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // If there is a gap between the main range and the last page, add "..."
    if (end < total - 1) pages.push('...');

    // Always include the last page
    pages.push(total);

    return pages;
  });

  isFirstPage = computed(() => this.currentPage() === 1);
  isLastPage = computed(() => this.currentPage() === this.totalPages());
}
