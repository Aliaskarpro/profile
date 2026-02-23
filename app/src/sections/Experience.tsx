import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  skills?: string[];
}

const experiences: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Специалист по поддержке интернет-дома',
    organization: 'Tele2 Kazakhstan',
    location: 'Казахстан',
    period: 'Текущее',
    description: 'Техническая поддержка клиентов по вопросам домашнего интернета. Диагностика и устранение неполадок сетевого оборудования. Консультирование пользователей по настройке роутеров и WiFi. Работа с системами мониторинга сети.',
    skills: ['Linux', 'Сетевые технологии', 'Клиентская поддержка', 'Диагностика'],
  },
  {
    type: 'education',
    title: 'Студент',
    organization: 'Satbayev University',
    location: 'Алматы, Казахстан',
    period: '2022 - Настоящее время',
    description: 'Получение высшего технического образования. Изучение современных IT-технологий, программирования, сетевых технологий и системного администрирования.',
    skills: ['IT', 'Программирование', 'Сети', 'Базы данных'],
  },
];

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

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

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isWork = item.type === 'work';
  const Icon = isWork ? Briefcase : GraduationCap;
  const iconColor = isWork ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500';

  return (
    <div
      ref={itemRef}
      className={`relative pl-8 sm:pl-12 pb-12 last:pb-0 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      {/* Timeline dot */}
      <div className={`absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-lg`}>
        <Icon className="w-4 h-4 text-white" />
      </div>

      {/* Content card */}
      <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors card-glow">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
              isWork ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
            }`}>
              {isWork ? 'Работа' : 'Образование'}
            </span>
            <h3 className="text-xl font-semibold mt-2 text-foreground">{item.title}</h3>
            <div className="text-primary font-medium">{item.organization}</div>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{item.period}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

        {/* Skills */}
        {item.skills && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm border border-border"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Experience() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4">
            # Опыт
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Работа и <span className="gradient-text">образование</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мой профессиональный путь и учебная деятельность
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Decorative element */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Открыт для новых возможностей</span>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}
