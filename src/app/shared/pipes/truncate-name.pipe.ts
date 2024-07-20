import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncateName',
})
export class TruncateNamePipe implements PipeTransform {
  transform(fileName: string, maxLength: number = 14): string {
    if (fileName.length <= maxLength) {
      return fileName;
    }

    const truncatedName = fileName.substr(0, maxLength - 3) + '...';
    const fileParts = fileName.split('.');
    const extension = fileParts[fileParts.length - 1];
    return truncatedName + '.' + extension;
  }
}

