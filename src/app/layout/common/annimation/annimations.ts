import {
  animate,
  animateChild,
  group,
  query as q,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const routerAnimation = trigger('routerAnimation', [
  transition(
    'notification => fw, post => fw, profile => fw, post => notification, profile => notification, profile => post',
    [
      query(
        ':enter, :leave',
        style({
          position: 'fixed',
          width: '100%',
          height: 'calc(100vh - var(--safe-area-inset-top) - var(--app-margin-pub))',
        }),
      ),
      query(':enter', style({ transform: 'translateX(-100%)' })),

      group([
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' })),
        ]),
        query(':enter', [
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
          animateChild(),
        ]),
      ]),
    ],
  ),
  transition(
    'welcome => browse-the-map, browse-the-map => find-tickets, find-tickets => discover, discover => repeat, repeat => details, details => start, sign-up => sign-in, sign-in => sign-up',
    [
      query(
        ':enter, :leave',
        style({
          position: 'fixed',
          width: '100%',
          height: 'calc(100vh - var(--safe-area-inset-top) - var(--app-margin-pub))',
        }),
      ),
      query(':enter', style({ transform: 'translateX(100%)' })),

      group([
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })),
        ]),
        query(':enter', [
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
          animateChild(),
        ]),
      ]),
    ],
  ),
]);
export const nextSlid = [
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(200%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      },
    ),
    query(
      ':leave',
      [
        style({ opacity: '0', display: 'none' }),
        animate('0.5s ease-out', style({ opacity: '0', display: 'none' })),
      ],
      {
        optional: true,
      },
    ),
  ]),
  transition('* => searchOpen', [
    // Query to set initial styles for enter and leave
    query(
      ':enter, :leave',
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
      }),
      { optional: true },
    ),
    // Enter query
    query(
      ':enter',
      [
        style({ transform: 'translateY(-100%)' }), // Initial position
        animate('0.3s ease-out', style({ transform: 'translateY(0%)' })),
      ],
      { optional: true },
    ),
    // Leave query
    query(
      ':leave',
      [
        style({ transform: 'translateY(0%)' }), // Initial position
        animate('0.3s ease-out', style({ transform: 'translateY(-100%)' })),
      ],
      { optional: true },
    ),
  ]),
];

export const backSlid = [
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-200%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      },
    ),
    query(
      ':leave',
      [
        style({ opacity: '0', display: 'none' }),
        animate('0.5s ease-out', style({ opacity: '0', display: 'none' })),
      ],
      {
        optional: true,
      },
    ),
  ]),
];

// -----------------------------------------------------------------------------------------------------
// @ Slide in top
// -----------------------------------------------------------------------------------------------------
const slideInTop = trigger('slideInTop', [
  state(
    'void',
    style({
      transform: 'translate3d(0, -100%, 0)',
    }),
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('void => false', []),

  // Transition
  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `225ms  'cubic-bezier(0.0, 0.0, 0.2, 1)'`,
    },
  }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide in bottom
// -----------------------------------------------------------------------------------------------------
const slideInBottom = trigger('slideInBottom', [
  state(
    'void',
    style({
      transform: 'translate3d(0, 100%, 0)',
    }),
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('void => false', []),

  // Transition
  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `225ms  'cubic-bezier(0.0, 0.0, 0.2, 1)'`,
    },
  }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide in left
// -----------------------------------------------------------------------------------------------------
const slideInLeft = trigger('slideInLeft', [
  state(
    'void',
    style({
      transform: 'translate3d(-100%, 0, 0)',
    }),
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('void => false', []),

  // Transition
  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `225ms  'cubic-bezier(0.0, 0.0, 0.2, 1)'`,
    },
  }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide in right
// -----------------------------------------------------------------------------------------------------
const slideInRight = trigger('slideInRight', [
  state(
    'void',
    style({
      transform: 'translate3d(100%, 0, 0)',
    }),
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('void => false', []),

  // Transition
  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `225ms 'cubic-bezier(0.0, 0.0, 0.2, 1)'`,
    },
  }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out top
// -----------------------------------------------------------------------------------------------------
const slideOutTop = trigger('slideOutTop', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  state(
    'void',
    style({
      transform: 'translate3d(0, -100%, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('false => void', []),

  // Transition
  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `'195ms'  'cubic-bezier(0.4, 0.0, 1, 1)'`,
    },
  }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out bottom
// -----------------------------------------------------------------------------------------------------
const slideOutBottom = trigger('slideOutBottom', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  state(
    'void',
    style({
      transform: 'translate3d(0, 100%, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('false => void', []),

  // Transition
  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `'195ms'  'cubic-bezier(0.4, 0.0, 1, 1)'`,
    },
  }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out left
// -----------------------------------------------------------------------------------------------------
const slideOutLeft = trigger('slideOutLeft', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  state(
    'void',
    style({
      transform: 'translate3d(-100%, 0, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('false => void', []),

  // Transition
  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `'195ms'  'cubic-bezier(0.4, 0.0, 1, 1)'`,
    },
  }),
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out right
// -----------------------------------------------------------------------------------------------------
const slideOutRight = trigger('slideOutRight', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    }),
  ),

  state(
    'void',
    style({
      transform: 'translate3d(100%, 0, 0)',
    }),
  ),

  // Prevent the transition if the state is false
  transition('false => void', []),

  // Transition
  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `'195ms'  'cubic-bezier(0.4, 0.0, 1, 1)'`,
    },
  }),
]);

export {
  slideInTop,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideOutTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
};
