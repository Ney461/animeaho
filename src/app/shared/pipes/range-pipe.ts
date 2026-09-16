import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangePipe',
})
export class RangePipe implements PipeTransform {
  transform(totalPages: string, currentPage: number): Array<number | '...'> {
    const total = Number(totalPages);

    if (total <= 9) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (currentPage <= 5) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, '...', total];
    }

    if (currentPage >= total - 4) {
      return [
        1,
        '...',
        total - 8,
        total - 7,
        total - 6,
        total - 5,
        total - 4,
        total - 3,
        total - 2,
        total - 1,
        total,
      ];
    }

    return [
      1,
      '...',
      currentPage - 4,
      currentPage - 3,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
      '...',
      total,
    ];
  }
}
