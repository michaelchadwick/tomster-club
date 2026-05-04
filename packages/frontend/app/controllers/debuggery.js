import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DebuggeryController extends Controller {
  @service('local-storage') ls;

  @tracked detailsGalleryExpanded = false;

  get downloadDropdownLinks() {
    return [
      {
        text: 'PDF file',
        filename: 'test.pdf',
        link: '/assets/data/test.pdf',
      },
      {
        text: 'CSV file',
        filename: 'test.csv',
        link: '/assets/data/test.csv',
      },
    ];
  }

  @action
  detailsGalleryToggle() {
    if (this.ls.get('detailsGalleryExpanded')) {
      this.detailsGalleryExpanded = this.ls.get('detailsGalleryExpanded');
    }

    this.detailsGalleryExpanded = !this.detailsGalleryExpanded;
    this.ls.set('detailsGalleryExpanded', this.detailsGalleryExpanded);
  }
}
