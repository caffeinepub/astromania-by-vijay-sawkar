import { useState } from 'react';
import { ShoppingCart, MessageCircle, Star, Shield, ChevronRight, X, Plus, Minus } from 'lucide-react';

type GemstoneItem = {
  id: string;
  name: string;
  sanskritName: string;
  planet: string;
  price: string;
  description: string;
  benefits: string[];
  weightOptions: string[];
  color: string;
  emoji: string;
  image: string;
};

const GEMSTONE_IMAGES: Record<string, string> = {
  ruby: '/assets/generated/gemstone-ruby.dim_400x400.png',
  pearl: '/assets/generated/gemstone-pearl.dim_400x400.png',
  emerald: '/assets/generated/gemstone-emerald.dim_400x400.png',
  'yellow-sapphire': '/assets/generated/gemstone-yellow-sapphire.dim_400x400.png',
  'blue-sapphire': '/assets/generated/gemstone-sapphire.dim_400x400.png',
  coral: '/assets/generated/gemstone-coral.dim_400x400.png',
  hessonite: '/assets/generated/gemstone-hessonite.dim_400x400.png',
  'cats-eye': '/assets/generated/gemstone-cats-eye.dim_400x400.png',
  diamond: '/assets/generated/gemstone-diamond.dim_400x400.png',
};

const GEMSTONES: GemstoneItem[] = [
  {
    id: 'ruby',
    name: 'Ruby',
    sanskritName: 'Manikya',
    planet: 'Sun',
    price: '1500 rs/ratti onwards',
    description: 'The gemstone of the Sun, Ruby enhances leadership, confidence, and vitality. Ideal for those seeking success and recognition.',
    benefits: ['Boosts confidence & leadership', 'Enhances vitality & energy', 'Promotes success & recognition', 'Strengthens father relationships'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti', '6 ratti', '7 ratti'],
    color: '#C9A84C',
    emoji: '🔴',
    image: GEMSTONE_IMAGES['ruby'],
  },
  {
    id: 'pearl',
    name: 'Pearl',
    sanskritName: 'Moti',
    planet: 'Moon',
    price: '500 rs/ratti onwards',
    description: 'The gemstone of the Moon, Pearl brings emotional balance, peace of mind, and enhances intuition and creativity.',
    benefits: ['Emotional balance & peace', 'Enhances intuition', 'Improves relationships', 'Calms anxiety & stress'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti', '6 ratti'],
    color: '#5BC8D4',
    emoji: '⚪',
    image: GEMSTONE_IMAGES['pearl'],
  },
  {
    id: 'emerald',
    name: 'Emerald',
    sanskritName: 'Panna',
    planet: 'Mercury',
    price: '2500 rs/ratti onwards',
    description: 'The gemstone of Mercury, Emerald sharpens intellect, communication skills, and business acumen.',
    benefits: ['Sharpens intellect', 'Improves communication', 'Business success', 'Enhances memory'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti'],
    color: '#C9A84C',
    emoji: '💚',
    image: GEMSTONE_IMAGES['emerald'],
  },
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire',
    sanskritName: 'Pukhraj',
    planet: 'Jupiter',
    price: '1800 rs/ratti onwards',
    description: 'The gemstone of Jupiter, Yellow Sapphire brings wisdom, prosperity, and spiritual growth.',
    benefits: ['Wisdom & knowledge', 'Financial prosperity', 'Spiritual growth', 'Marriage & children'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti', '6 ratti'],
    color: '#5BC8D4',
    emoji: '💛',
    image: GEMSTONE_IMAGES['yellow-sapphire'],
  },
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire',
    sanskritName: 'Neelam',
    planet: 'Saturn',
    price: '1800 rs/ratti onwards',
    description: 'The powerful gemstone of Saturn, Blue Sapphire brings discipline, focus, and rapid transformation.',
    benefits: ['Discipline & focus', 'Career advancement', 'Protection from negativity', 'Rapid results'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti'],
    color: '#C9A84C',
    emoji: '💙',
    image: GEMSTONE_IMAGES['blue-sapphire'],
  },
  {
    id: 'coral',
    name: 'Red Coral',
    sanskritName: 'Moonga',
    planet: 'Mars',
    price: '1800 rs/ratti onwards',
    description: 'The gemstone of Mars, Red Coral boosts courage, energy, and helps overcome obstacles.',
    benefits: ['Courage & boldness', 'Physical energy', 'Overcomes obstacles', 'Protects from enemies'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti', '6 ratti', '7 ratti'],
    color: '#5BC8D4',
    emoji: '🪸',
    image: GEMSTONE_IMAGES['coral'],
  },
  {
    id: 'hessonite',
    name: 'Hessonite',
    sanskritName: 'Gomed',
    planet: 'Rahu',
    price: '800 rs/ratti onwards',
    description: 'The gemstone of Rahu, Hessonite removes confusion, fear, and helps achieve clarity and success.',
    benefits: ['Removes confusion & fear', 'Career clarity', 'Protects from Rahu dosha', 'Enhances focus'],
    weightOptions: ['5 ratti', '6 ratti', '7 ratti', '8 ratti'],
    color: '#C9A84C',
    emoji: '🟤',
    image: GEMSTONE_IMAGES['hessonite'],
  },
  {
    id: 'cats-eye',
    name: "Cat's Eye",
    sanskritName: 'Lehsunia',
    planet: 'Ketu',
    price: '1200 rs/ratti onwards',
    description: "The gemstone of Ketu, Cat's Eye provides protection, spiritual insight, and helps overcome sudden losses.",
    benefits: ["Protection from Ketu's effects", 'Spiritual insight', 'Overcomes sudden losses', 'Enhances intuition'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti', '6 ratti'],
    color: '#5BC8D4',
    emoji: '🟡',
    image: GEMSTONE_IMAGES['cats-eye'],
  },
  {
    id: 'diamond',
    name: 'Diamond',
    sanskritName: 'Heera',
    planet: 'Venus',
    price: '5000 rs/ratti onwards',
    description: 'The gemstone of Venus, Diamond enhances beauty, luxury, love, and artistic talents.',
    benefits: ['Enhances beauty & charm', 'Attracts luxury & wealth', 'Strengthens relationships', 'Boosts creativity'],
    weightOptions: ['0.5 ratti', '1 ratti', '1.5 ratti', '2 ratti'],
    color: '#C9A84C',
    emoji: '💎',
    image: GEMSTONE_IMAGES['diamond'],
  },
];

type CartEntry = {
  gemstone: GemstoneItem;
  weight: string;
  quantity: number;
};

export default function GemstoneShop() {
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneItem | null>(null);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<string>('');

  const addToCart = (gemstone: GemstoneItem, weight: string) => {
    setCart(prev => {
      const existing = prev.find(e => e.gemstone.id === gemstone.id && e.weight === weight);
      if (existing) {
        return prev.map(e =>
          e.gemstone.id === gemstone.id && e.weight === weight
            ? { ...e, quantity: e.quantity + 1 }
            : e
        );
      }
      return [...prev, { gemstone, weight, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (gemstoneId: string, weight: string) => {
    setCart(prev => prev.filter(e => !(e.gemstone.id === gemstoneId && e.weight === weight)));
  };

  const updateQuantity = (gemstoneId: string, weight: string, delta: number) => {
    setCart(prev =>
      prev
        .map(e =>
          e.gemstone.id === gemstoneId && e.weight === weight
            ? { ...e, quantity: e.quantity + delta }
            : e
        )
        .filter(e => e.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, e) => sum + e.quantity, 0);

  const handleWhatsAppInquiry = (gemstone: GemstoneItem, weight?: string) => {
    const msg = weight
      ? `Hello, I am interested in purchasing ${gemstone.name} (${gemstone.sanskritName}) - ${weight}. Please provide more details.`
      : `Hello, I am interested in learning more about ${gemstone.name} (${gemstone.sanskritName}). Please guide me.`;
    const url = `https://wa.me/919822153807?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleCartWhatsApp = () => {
    const items = cart.map(e => `${e.gemstone.name} (${e.weight}) x${e.quantity}`).join(', ');
    const msg = `Hello, I would like to inquire about the following gemstones: ${items}. Please provide pricing and availability.`;
    const url = `https://wa.me/919822153807?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-navy via-background to-background" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, oklch(0.75 0.18 55) 0%, transparent 50%), radial-gradient(circle at 70% 20%, oklch(0.65 0.15 200) 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/30 bg-cosmic-gold/10 text-cosmic-gold text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Certified Gemstones
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-cosmic-gold via-yellow-300 to-cosmic-gold bg-clip-text text-transparent">
            Gemstone Shop
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Authentic, certified Vedic gemstones personally selected and recommended by Vijay Sawkar for planetary remedies and cosmic alignment.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-cosmic-gold" /> Certified Authentic</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-cosmic-gold" /> Expert Recommended</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4 text-cosmic-gold" /> WhatsApp Support</span>
          </div>
        </div>
      </section>

      {/* Cart Button */}
      <div className="sticky top-16 z-30 flex justify-end max-w-6xl mx-auto px-4 mb-4">
        <button
          onClick={() => setCartOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cosmic-navy border border-cosmic-gold/40 rounded-full text-cosmic-gold hover:bg-cosmic-gold/10 transition-colors shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="text-sm font-medium">Inquiry Cart</span>
          {totalItems > 0 && (
            <span className="w-5 h-5 rounded-full bg-cosmic-gold text-cosmic-navy text-xs font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Gemstone Grid */}
      <section className="pb-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GEMSTONES.map(gem => (
            <div
              key={gem.id}
              className="group relative bg-cosmic-navy/50 border border-cosmic-gold/20 rounded-2xl overflow-hidden hover:border-cosmic-gold/50 transition-all duration-300 cursor-pointer"
              onClick={() => { setSelectedGemstone(gem); setSelectedWeight(gem.weightOptions[0]); }}
            >
              {/* Gemstone Image */}
              <div className="relative h-52 overflow-hidden bg-cosmic-navy/80">
                <img
                  src={gem.image}
                  alt={`${gem.name} (${gem.sanskritName}) gemstone`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-navy/60 to-transparent" />
                <div className="absolute top-3 right-3 bg-cosmic-navy/80 border border-cosmic-gold/30 rounded-full px-3 py-1 text-xs text-cosmic-gold font-medium">
                  {gem.planet}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">{gem.name}</h3>
                    <p className="text-cosmic-cyan text-sm">{gem.sanskritName}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{gem.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-cosmic-gold font-semibold text-sm">{gem.price}</p>
                  <button
                    onClick={e => { e.stopPropagation(); handleWhatsAppInquiry(gem); }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 border border-green-500/30 text-green-400 rounded-full text-xs hover:bg-green-600/30 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" /> Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedGemstone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedGemstone(null)}>
          <div
            className="relative bg-cosmic-navy border border-cosmic-gold/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-56 overflow-hidden rounded-t-2xl bg-cosmic-navy/80">
              <img
                src={selectedGemstone.image}
                alt={`${selectedGemstone.name} gemstone`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-navy via-transparent to-transparent" />
              <button
                onClick={() => setSelectedGemstone(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cosmic-navy/80 border border-cosmic-gold/30 flex items-center justify-center text-foreground hover:bg-cosmic-navy transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-display font-bold text-foreground">{selectedGemstone.name}</h2>
                <p className="text-cosmic-cyan">{selectedGemstone.sanskritName} · Planet: {selectedGemstone.planet}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-foreground/90 leading-relaxed">{selectedGemstone.description}</p>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold text-cosmic-gold mb-3">Key Benefits</h3>
                <ul className="space-y-2">
                  {selectedGemstone.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                      <ChevronRight className="w-4 h-4 shrink-0 text-cosmic-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weight Selection */}
              <div>
                <h3 className="font-semibold text-cosmic-gold mb-3">Select Weight</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedGemstone.weightOptions.map(w => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        selectedWeight === w
                          ? 'bg-cosmic-gold text-cosmic-navy border-cosmic-gold font-semibold'
                          : 'border-cosmic-gold/30 text-foreground/70 hover:border-cosmic-gold/60'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-cosmic-gold font-semibold">{selectedGemstone.price}</p>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { addToCart(selectedGemstone, selectedWeight); setSelectedGemstone(null); }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cosmic-gold/20 border border-cosmic-gold/40 text-cosmic-gold rounded-xl hover:bg-cosmic-gold/30 transition-colors font-medium"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Inquiry
                </button>
                <button
                  onClick={() => handleWhatsAppInquiry(selectedGemstone, selectedWeight)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
          <div
            className="relative bg-cosmic-navy border-l border-cosmic-gold/20 w-full max-w-sm h-full overflow-y-auto shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-cosmic-gold/20">
              <h2 className="font-display font-bold text-lg text-cosmic-gold">Inquiry Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-8 text-center">
                Your inquiry cart is empty. Browse gemstones and add them here.
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 space-y-4">
                  {cart.map(entry => (
                    <div key={`${entry.gemstone.id}-${entry.weight}`} className="flex gap-3 bg-cosmic-navy/60 border border-cosmic-gold/20 rounded-xl p-3">
                      <img
                        src={entry.gemstone.image}
                        alt={entry.gemstone.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{entry.gemstone.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.weight}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(entry.gemstone.id, entry.weight, -1)} className="w-6 h-6 rounded-full border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold hover:bg-cosmic-gold/10 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm text-foreground w-4 text-center">{entry.quantity}</span>
                          <button onClick={() => updateQuantity(entry.gemstone.id, entry.weight, 1)} className="w-6 h-6 rounded-full border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold hover:bg-cosmic-gold/10 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(entry.gemstone.id, entry.weight)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-cosmic-gold/20">
                  <button
                    onClick={handleCartWhatsApp}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    <MessageCircle className="w-4 h-4" /> Send Inquiry via WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
