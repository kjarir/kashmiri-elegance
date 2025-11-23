# Animations Setup - Lenis & GSAP

## Overview
The website now uses **Lenis** for smooth scrolling and **GSAP** with **ScrollTrigger** for scroll-based animations and text animations across all pages.

## What's Installed

- `lenis` - Smooth scrolling library
- `gsap` - Animation library with ScrollTrigger plugin

## Architecture

### 1. Smooth Scrolling (Lenis)
- **Location**: `src/components/ScrollWrapper.tsx`
- **Integration**: Wraps all routes in `App.tsx`
- **Features**:
  - Smooth wheel scrolling
  - Auto scrolls to top on route changes
  - Customizable easing and duration

### 2. Animation Hooks (GSAP)
- **Location**: `src/lib/animations/scroll-animations.ts`
- **Available Hooks**:
  - `useFadeIn(delay, duration)` - Fade in from bottom
  - `useSlideInLeft(delay, duration)` - Slide in from left
  - `useSlideInRight(delay, duration)` - Slide in from right
  - `useScaleIn(delay, duration)` - Scale in animation
  - `useStaggerChildren(delay, stagger)` - Animate children with stagger
  - `useTextReveal(delay)` - Word-by-word text reveal
  - `useParallax(speed)` - Parallax scrolling effect

## Usage Example

```tsx
import { useFadeIn, useStaggerChildren, useTextReveal } from '@/lib/animations/scroll-animations';

const MyComponent = () => {
  const titleRef = useTextReveal(0);
  const gridRef = useStaggerChildren(0, 0.15);
  const sectionRef = useFadeIn(0.2);

  return (
    <div>
      <h1 ref={titleRef}>Animated Title</h1>
      <div ref={gridRef}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </div>
      <section ref={sectionRef}>
        Content that fades in
      </section>
    </div>
  );
};
```

## Pages with Animations

### Home Page
- Hero title: Text reveal animation
- Hero subtitle: Text reveal animation
- Featured products: Staggered fade-in
- Craftsmanship section: Slide in from left/right
- Garden image: Parallax effect
- CTA section: Fade in

### Products Page
- Page title: Text reveal
- Product grid: Staggered animations

### Product Detail Page
- Image gallery: Slide in from left
- Product info: Slide in from right
- Features/Specs/Reviews tabs: Fade in
- Related products: Staggered animations

### About Page
- Title: Text reveal
- Story section: Slide animations
- Values grid: Staggered animations
- CTA: Fade in

## Customization

### Adjust Animation Speed
Modify the `duration` parameter in hooks:
```tsx
const ref = useFadeIn(0, 1.5); // Slower animation
```

### Adjust Stagger Timing
Modify the `stagger` parameter:
```tsx
const ref = useStaggerChildren(0, 0.2); // More delay between items
```

### Change Scroll Trigger Point
Edit `scroll-animations.ts` to change when animations trigger:
```tsx
scrollTrigger: {
  trigger: ref.current,
  start: 'top 80%', // Change to 'top 70%' for earlier trigger
  toggleActions: 'play none none none',
}
```

## Performance Notes

- Animations use `requestAnimationFrame` for smooth performance
- ScrollTrigger automatically cleans up on component unmount
- Lenis handles smooth scrolling efficiently
- All animations are GPU-accelerated where possible

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Smooth scrolling works on desktop and mobile
- Animations gracefully degrade if JavaScript is disabled

