import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.computeVisibleSlides();
  }

  visibleCards = 4;
  cardWidth = 404;
  addCardWidth = 400;
  currentSlide = 0;
  marginBetweenCards = 2;
  slides = [
    {img: "https://via.placeholder.com/600.png/09f/fff"},
    {img: "https://via.placeholder.com/600.png/021/fff"},
    {img: "https://via.placeholder.com/600.png/321/fff"},
    {img: "https://via.placeholder.com/600.png/422/fff"},
    {img: "https://via.placeholder.com/600.png/654/fff"}
  ];
  slideConfig = {infinite: false, "slidesToShow": 4, "slidesToScroll": 1, variableWidth: true};

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.pop();
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e:any) {
    console.log('breakpoint');
  }

  afterChange(e:any) {
    this.currentSlide = e.currentSlide;
    console.log('afterChange');
  }

  beforeChange(e:any) {
    console.log('beforeChange');
  }

  @ViewChild('slickModal') slickModal?: SlickCarouselComponent;

  constructor(private ref: ElementRef, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.computeVisibleSlides();
  }

  computeVisibleSlides() {
    const slickListElement = (this.ref.nativeElement as HTMLElement).querySelector('.slick-list');
    if (slickListElement) {
      const slickWidth = (slickListElement as HTMLDivElement).offsetWidth;
      this.visibleCards = Math.floor( slickWidth / this.cardWidth);
      this.slideConfig = {...this.slideConfig, slidesToShow: this.visibleCards};
      console.log(this.visibleCards);
      let newAddCardWidth;
      const totalSlideWidth = this.slides.length * this.cardWidth;
      const visibleCardsWidth = this.visibleCards * this.cardWidth;
      if (slickWidth - totalSlideWidth > this.cardWidth) {
        newAddCardWidth = slickWidth - totalSlideWidth;
      } else if (visibleCardsWidth < slickWidth) {
        newAddCardWidth = this.cardWidth + (slickWidth - visibleCardsWidth);
      } else {
        newAddCardWidth = this.cardWidth;
      }

      if (newAddCardWidth <  this.addCardWidth) {
        const currentFilledWidth = (this.slides.length - this.currentSlide) * this.cardWidth + newAddCardWidth;
        if (currentFilledWidth < slickWidth) {
          this.slickModal?.slickPrev();
        }
      }
      this.addCardWidth = newAddCardWidth;
    }
    this.cdr.detectChanges();
  }

}
