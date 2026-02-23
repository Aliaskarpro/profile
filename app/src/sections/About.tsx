import { useEffect, useRef, useState } from 'react';
import { User, MapPin, GraduationCap, Briefcase } from 'lucide-react';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const infoCards = [
    {
      icon: User,
      label: 'Имя',
      value: 'Алиасқар Серикбаев',
    },
    {
      icon: MapPin,
      label: 'Локация',
      value: 'Казахстан',
    },
    {
      icon: Briefcase,
      label: 'Работа',
      value: 'Tele2 Kazakhstan',
    },
    {
      icon: GraduationCap,
      label: 'Образование',
      value: 'Satbayev University',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4">
            # О себе
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Кто <span className="gradient-text">я</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Познакомьтесь со мной поближе
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info Cards */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {infoCards.map((card, index) => (
              <div
                key={card.label}
                className="p-6 rounded-xl bg-card border border-border card-glow hover:border-primary/50 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{card.label}</div>
                <div className="font-semibold text-foreground">{card.value}</div>
              </div>
            ))}
          </div>

          {/* Right side - Description */}
          <div className={`space-y-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Привет! Я <span className="text-primary font-semibold">Алиасқар</span>, мне 21 год, 
                и я работаю специалистом по поддержке интернет-дома в компании{' '}
                <span className="text-primary font-semibold">Tele2 Kazakhstan</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Моя работа заключается в помощи клиентам с настройкой и устранением неполадок 
                домашнего интернета. Я ежедневно решаю технические вопросы, консультирую 
                пользователей и обеспечиваю стабильную работу сетевых сервисов.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Параллельно с работой я получаю высшее образование в{' '}
                <span className="text-primary font-semibold">Satbayev University</span> — 
                одном из ведущих технических вузов Казахстана. Это помогает мне постоянно 
                развивать свои профессиональные навыки и углублять знания в области IT.
              </p>
            </div>

            {/* Code snippet decoration */}
            <div className="relative p-4 rounded-lg bg-secondary/50 border border-border font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-muted-foreground">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">aboutMe</span> = {'{'}
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-cyan-400">name</span>:{' '}
                <span className="text-green-400">"Алиасқар Серикбаев"</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-cyan-400">age</span>:{' '}
                <span className="text-orange-400">21</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-cyan-400">role</span>:{' '}
                <span className="text-green-400">"Network Support Specialist"</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-cyan-400">location</span>:{' '}
                <span className="text-green-400">"Kazakhstan"</span>
              </div>
              <div className="text-muted-foreground">{'}'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
