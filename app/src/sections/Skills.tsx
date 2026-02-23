import { useEffect, useRef, useState } from 'react';
import { 
  Terminal, 
  Wifi, 
  Router, 
  Network, 
  HeadphonesIcon, 
  Settings,
  Server,
  Shield
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  description: string;
  color: string;
}

const skills: Skill[] = [
  {
    name: 'Linux',
    icon: Terminal,
    level: 85,
    description: 'Администрирование Linux систем, командная строка, bash-скрипты',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Сетевые технологии',
    icon: Network,
    level: 90,
    description: 'TCP/IP, DNS, DHCP, VLAN, маршрутизация',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'WiFi & Беспроводные сети',
    icon: Wifi,
    level: 88,
    description: 'Настройка роутеров, оптимизация сигнала, диагностика',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Оборудование',
    icon: Router,
    level: 85,
    description: 'Маршрутизаторы, коммутаторы, модемы, ONT терминалы',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Клиентская поддержка',
    icon: HeadphonesIcon,
    level: 92,
    description: 'Техническая поддержка, решение проблем, консультирование',
    color: 'from-red-500 to-rose-500',
  },
  {
    name: 'Системы мониторинга',
    icon: Server,
    level: 75,
    description: 'Zabbix, SNMP, мониторинг сетевого оборудования',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Безопасность сетей',
    icon: Shield,
    level: 70,
    description: 'Firewall, базовая защита сетей, VPN',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Диагностика',
    icon: Settings,
    level: 88,
    description: 'Ping, traceroute, Wireshark, анализ логов',
    color: 'from-amber-500 to-yellow-500',
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 card-glow ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <skill.icon className="w-7 h-7 text-white" />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold mb-2 text-foreground">{skill.name}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{skill.description}</p>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Уровень</span>
          <span className="text-primary font-mono">{skill.level}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
            style={{ 
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 100 + 300}ms`
            }}
          />
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
    </div>
  );
}

export function Skills() {
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
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4">
            # Навыки
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Мои <span className="gradient-text">компетенции</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Технические навыки и инструменты, которыми я владею
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className={`mt-16 p-6 rounded-xl bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 border border-border text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">Постоянно учусь</span> и развиваю свои навыки 
            в области сетевых технологий и системного администрирования
          </p>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
