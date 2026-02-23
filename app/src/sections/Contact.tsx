import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('serikbaev.aliaskar@mail.ru');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-4">
            # Контакты
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Свяжитесь <span className="gradient-text">со мной</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Открыт для предложений, сотрудничества и интересных проектов
          </p>
        </div>

        {/* Contact Cards */}
        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Email Card */}
          <div className="p-8 rounded-2xl bg-card border border-border card-glow hover:border-primary/30 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Email</h3>
            <p className="text-muted-foreground mb-4">
              Отправьте мне письмо в любое время
            </p>
            <div className="flex items-center gap-3">
              <code className="flex-1 px-4 py-3 rounded-lg bg-secondary font-mono text-sm text-primary break-all">
                serikbaev.aliaskar@mail.ru
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyEmail}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <a
              href="mailto:serikbaev.aliaskar@mail.ru"
              className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Написать письмо</span>
            </a>
          </div>

          {/* Location Card */}
          <div className="p-8 rounded-2xl bg-card border border-border card-glow hover:border-primary/30 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Локация</h3>
            <p className="text-muted-foreground mb-4">
              Работаю и проживаю в Казахстане
            </p>
            <div className="px-4 py-3 rounded-lg bg-secondary">
              <span className="font-semibold text-foreground">Казахстан</span>
              <span className="text-muted-foreground mx-2">•</span>
              <span className="text-muted-foreground">Алматы</span>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              GMT+6 (Алматинское время)
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className={`mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/5 via-cyan-500/5 to-primary/5 border border-border transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Доступен для связи</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">&lt; 24ч</div>
              <div className="text-sm text-muted-foreground">Время ответа</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Гарантия ответа</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-16 pt-8 border-t border-border text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Алиасқар Серикбаев. Все права защищены.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Сделано с ❤️ и React
          </p>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
