import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.5s ease-in', style({ opacity: 1 })),
  ]),
]);

export const fadeInLeft = trigger('fadeInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-16px)' }),
    animate('.3s ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(16px)' }),
    animate('.3s ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

export const fadeInTop = trigger('fadeInTop', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-16px)' }),
    animate('.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const fadeInBottom = trigger('fadeInBottom', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const fadeOutRight = trigger('fadeOutRight', [
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0)' }),
    animate(
      '.2s ease-in',
      style({ opacity: 0, transform: 'translateX(16px)' }),
    ),
  ]),
]);
