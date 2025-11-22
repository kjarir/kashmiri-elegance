import { useEffect, useRef, useState } from "react";

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const AnimatedStat = ({ end, label, suffix = "", delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div
      ref={ref}
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-lg text-muted-foreground">{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-primary-foreground">
          <AnimatedStat end={5000} label="Happy Customers" suffix="+" delay={0} />
          <AnimatedStat end={200} label="Master Artisans" suffix="+" delay={100} />
          <AnimatedStat end={15} label="Years Experience" suffix="+" delay={200} />
          <AnimatedStat end={98} label="Satisfaction Rate" suffix="%" delay={300} />
        </div>
      </div>
    </section>
  );
};

export default Stats;
