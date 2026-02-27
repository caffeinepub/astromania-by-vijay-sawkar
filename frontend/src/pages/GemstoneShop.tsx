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
  },
  {
    id: 'hessonite',
    name: 'Hessonite',
    sanskritName: 'Gomed',
    planet: 'Rahu',
    price: '1000 rs/ratti onwards',
    description: 'The gemstone of Rahu, Hessonite helps navigate confusion, enhances focus, and brings worldly success.',
    benefits: ['Clarity & focus', 'Worldly success', 'Reduces confusion', 'Career growth'],
    weightOptions: ['5 ratti', '6 ratti', '7 ratti', '8 ratti'],
    color: '#C9A84C',
    emoji: '🟤',
  },
  {
    id: 'cats-eye',
    name: "Cat's Eye",
    sanskritName: 'Lehsunia',
    planet: 'Ketu',
    price: '800 rs/ratti onwards',
    description: "The gemstone of Ketu, Cat's Eye provides spiritual protection, intuition, and liberation from past karma.",
    benefits: ['Spiritual protection', 'Intuition & insight', 'Liberation from karma', 'Sudden gains'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti'],
    color: '#5BC8D4',
    emoji: '🟡',
  },
  {
    id: 'moonstone',
    name: 'Moonstone',
    sanskritName: 'Chandrakant',
    planet: 'Moon',
    price: '1000 rs/ratti onwards',
    description: 'A mystical stone that enhances feminine energy, intuition, and emotional healing.',
    benefits: ['Feminine energy', 'Emotional healing', 'Enhances intuition', 'Travel protection'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti'],
    color: '#C9A84C',
    emoji: '🌙',
  },
  {
    id: 'firoza',
    name: 'Turquoise',
    sanskritName: 'Firoza',
    planet: 'Jupiter/Venus',
    price: '1000 rs/ratti onwards',
    description: 'A protective stone that brings good fortune, friendship, and spiritual attunement.',
    benefits: ['Good fortune', 'Friendship & loyalty', 'Spiritual attunement', 'Protection from evil'],
    weightOptions: ['5 ratti', '6 ratti', '7 ratti'],
    color: '#5BC8D4',
    emoji: '🔵',
  },
  {
    id: 'garnet',
    name: 'Garnet',
    sanskritName: 'Tamra Mani',
    planet: 'Mars/Rahu',
    price: '1000 rs/ratti onwards',
    description: 'A stone of passion and energy that revitalizes, purifies, and balances energy.',
    benefits: ['Revitalizes energy', 'Passion & creativity', 'Emotional balance', 'Commitment'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti'],
    color: '#C9A84C',
    emoji: '🔴',
  },
  {
    id: 'topaz',
    name: 'White Topaz',
    sanskritName: 'Shwet Pukhraj',
    planet: 'Venus',
    price: '1000 rs/ratti onwards',
    description: 'A substitute for Diamond, White Topaz enhances beauty, luxury, and artistic talents.',
    benefits: ['Beauty & luxury', 'Artistic talents', 'Love & relationships', 'Financial gains'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti', '6 ratti'],
    color: '#5BC8D4',
    emoji: '💎',
  },
  {
    id: 'citrine',
    name: 'Citrine',
    sanskritName: 'Sunela',
    planet: 'Jupiter',
    price: '1000 rs/ratti onwards',
    description: "The merchant's stone, Citrine attracts abundance, prosperity, and positive energy.",
    benefits: ['Abundance & prosperity', 'Positive energy', 'Business success', 'Creativity'],
    weightOptions: ['5 ratti', '6 ratti', '7 ratti'],
    color: '#C9A84C',
    emoji: '🟡',
  },
  {
    id: 'peridot',
    name: 'Peridot',
    sanskritName: 'Zabarjad',
    planet: 'Mercury',
    price: '1000 rs/ratti onwards',
    description: 'A stone of compassion and healing that brings good health, restful sleep, and peace.',
    benefits: ['Good health', 'Restful sleep', 'Peace & harmony', 'Healing'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti'],
    color: '#5BC8D4',
    emoji: '💚',
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    sanskritName: 'Jamunia',
    planet: 'Saturn',
    price: '800 rs/ratti onwards',
    description: 'A powerful protective stone that enhances spiritual awareness and calms the mind.',
    benefits: ['Spiritual awareness', 'Calms the mind', 'Protection', 'Sobriety & clarity'],
    weightOptions: ['5 ratti', '6 ratti', '7 ratti', '8 ratti'],
    color: '#C9A84C',
    emoji: '💜',
  },
  {
    id: 'lapis-lazuli',
    name: 'Lapis Lazuli',
    sanskritName: 'Lajward',
    planet: 'Saturn/Venus',
    price: '800 rs/ratti onwards',
    description: 'A stone of wisdom and truth that enhances intellectual ability and stimulates the desire for knowledge.',
    benefits: ['Wisdom & truth', 'Intellectual ability', 'Self-expression', 'Inner peace'],
    weightOptions: ['5 ratti', '6 ratti', '7 ratti'],
    color: '#5BC8D4',
    emoji: '🔵',
  },
  {
    id: 'opal',
    name: 'Opal',
    sanskritName: 'Dudhiya Patthar',
    planet: 'Venus',
    price: '2000 rs/ratti onwards',
    description: 'A stone of inspiration that enhances creativity, spontaneity, and emotional expression.',
    benefits: ['Creativity & inspiration', 'Emotional expression', 'Love & passion', 'Artistic talents'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti'],
    color: '#C9A84C',
    emoji: '🌈',
  },
  {
    id: 'zircon',
    name: 'Zircon',
    sanskritName: 'Jarkan',
    planet: 'Venus',
    price: '500 rs/ratti onwards',
    description: 'A brilliant stone that brings prosperity, wisdom, and honor. A natural substitute for Diamond.',
    benefits: ['Prosperity & wealth', 'Wisdom', 'Honor & respect', 'Spiritual growth'],
    weightOptions: ['3 ratti', '4 ratti', '5 ratti', '6 ratti'],
    color: '#5BC8D4',
    emoji: '💎',
  },
];

type CartItem = {
  gemstone: GemstoneItem;
  weight: string;
  quantity: number;
};

export default function GemstoneShop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneItem | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<string>('');

  const addToCart = (gemstone: GemstoneItem, weight: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.gemstone.id === gemstone.id && item.weight === weight);
      if (existing) {
        return prev.map((item) =>
          item.gemstone.id === gemstone.id && item.weight === weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { gemstone, weight, quantity: 1 }];
    });
  };

  const removeFromCart = (gemstoneId: string, weight: string) => {
    setCart((prev) => prev.filter((item) => !(item.gemstone.id === gemstoneId && item.weight === weight)));
  };

  const updateQuantity = (gemstoneId: string, weight: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.gemstone.id === gemstoneId && item.weight === weight
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppEnquiry = (gemstone: GemstoneItem, weight?: string) => {
    const message = weight
      ? `Hello, I'm interested in ${gemstone.name} (${gemstone.sanskritName}) - ${weight}. Price: ${gemstone.price}. Please provide more details.`
      : `Hello, I'm interested in ${gemstone.name} (${gemstone.sanskritName}). Price: ${gemstone.price}. Please provide more details.`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCartWhatsApp = () => {
    const items = cart.map((item) => `${item.gemstone.name} (${item.weight}) x${item.quantity}`).join(', ');
    const message = `Hello, I'd like to enquire about the following gemstones: ${items}. Please provide pricing and availability.`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060818' }}>
      {/* Hero */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(30,20,80,0.6) 0%, #060818 60%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <span
            className="text-sm font-medium tracking-[0.3em] uppercase"
            style={{ color: '#5BC8D4' }}
          >
            ✦ Certified Natural Gemstones ✦
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-cinzel"
            style={{ color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.3)' }}
          >
            Gemstone Shop
          </h1>
          <p className="text-xl font-cormorant italic mb-4" style={{ color: '#e8d5a3' }}>
            Prescribed &amp; Certified by Vijay Sawkar
          </p>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#b8c8d8' }}>
            Each gemstone is carefully selected, certified, and energized for maximum planetary benefit.
          </p>
        </div>
      </section>

      {/* Cart Button */}
      <div className="sticky top-20 z-40 flex justify-end px-4 sm:px-6 lg:px-8 mb-4">
        <button
          onClick={() => setShowCart(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #a07830)',
            color: '#060818',
            boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
          }}
        >
          <ShoppingCart className="w-5 h-5" />
          Cart ({totalItems})
        </button>
      </div>

      {/* Gemstone Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {GEMSTONES.map((gemstone) => (
              <div
                key={gemstone.id}
                className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.9)',
                  border: `1px solid ${gemstone.color}33`,
                }}
                onClick={() => {
                  setSelectedGemstone(gemstone);
                  setSelectedWeight(gemstone.weightOptions[0]);
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${gemstone.color}88`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${gemstone.color}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${gemstone.color}33`;
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Gemstone Image/Emoji */}
                <div
                  className="h-40 flex items-center justify-center text-6xl"
                  style={{
                    background: `radial-gradient(ellipse at center, ${gemstone.color}22 0%, rgba(6,8,24,0.8) 70%)`,
                  }}
                >
                  {gemstone.emoji}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3
                        className="font-bold font-cinzel text-base"
                        style={{ color: gemstone.color }}
                      >
                        {gemstone.name}
                      </h3>
                      <p className="text-xs italic" style={{ color: '#7a9ab0' }}>
                        {gemstone.sanskritName}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${gemstone.color}22`,
                        color: gemstone.color,
                        border: `1px solid ${gemstone.color}44`,
                      }}
                    >
                      {gemstone.planet}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed mb-3" style={{ color: '#b8c8d8' }}>
                    {gemstone.description.substring(0, 80)}...
                  </p>

                  <div
                    className="text-sm font-bold mb-3 font-cinzel"
                    style={{ color: '#C9A84C' }}
                  >
                    ₹ {gemstone.price}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppEnquiry(gemstone);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(37,211,102,0.15)',
                        color: '#25D366',
                        border: '1px solid rgba(37,211,102,0.3)',
                      }}
                    >
                      <MessageCircle className="w-3 h-3" />
                      Enquire
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(gemstone, gemstone.weightOptions[0]);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                      style={{
                        backgroundColor: `${gemstone.color}22`,
                        color: gemstone.color,
                        border: `1px solid ${gemstone.color}44`,
                      }}
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'rgba(10,15,40,0.6)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Shield, title: 'Certified Genuine', desc: 'All gemstones come with authenticity certificates from recognized labs.' },
              { icon: Star, title: 'Expert Prescribed', desc: 'Each stone is prescribed based on your birth chart by Vijay Sawkar.' },
              { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Direct consultation and support via WhatsApp for all purchases.' },
            ].map((badge) => (
              <div
                key={badge.title}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'rgba(20,25,60,0.8)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <badge.icon className="w-8 h-8 mx-auto mb-3" style={{ color: '#C9A84C' }} />
                <h3 className="font-bold mb-2 font-cinzel" style={{ color: '#C9A84C' }}>
                  {badge.title}
                </h3>
                <p className="text-sm" style={{ color: '#b8c8d8' }}>
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gemstone Detail Modal */}
      {selectedGemstone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(6,8,24,0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedGemstone(null)}
        >
          <div
            className="max-w-lg w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: 'rgba(14,18,50,0.98)',
              border: `1px solid ${selectedGemstone.color}44`,
              boxShadow: `0 20px 60px ${selectedGemstone.color}22`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2
                  className="text-2xl font-bold font-cinzel"
                  style={{ color: selectedGemstone.color }}
                >
                  {selectedGemstone.name}
                </h2>
                <p className="text-sm italic" style={{ color: '#7a9ab0' }}>
                  {selectedGemstone.sanskritName} — {selectedGemstone.planet}
                </p>
              </div>
              <button
                onClick={() => setSelectedGemstone(null)}
                className="p-2 rounded-full transition-colors"
                style={{ color: '#7a9ab0' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="h-32 flex items-center justify-center text-7xl rounded-xl mb-4"
              style={{
                background: `radial-gradient(ellipse at center, ${selectedGemstone.color}22 0%, rgba(6,8,24,0.8) 70%)`,
              }}
            >
              {selectedGemstone.emoji}
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: '#c8d8e8' }}>
              {selectedGemstone.description}
            </p>

            <div className="mb-4">
              <h3
                className="text-sm font-bold mb-2 font-cinzel"
                style={{ color: selectedGemstone.color }}
              >
                Benefits
              </h3>
              <ul className="space-y-1">
                {selectedGemstone.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: '#c8d8e8' }}
                  >
                    {/* Fixed: flex-shrink-0 → shrink-0 */}
                    <ChevronRight className="w-3 h-3 shrink-0" style={{ color: selectedGemstone.color }} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3
                className="text-sm font-bold mb-2 font-cinzel"
                style={{ color: selectedGemstone.color }}
              >
                Select Weight
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedGemstone.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className="px-3 py-1 rounded-full text-sm transition-all duration-200"
                    style={{
                      backgroundColor: selectedWeight === weight ? selectedGemstone.color : 'transparent',
                      color: selectedWeight === weight ? '#060818' : selectedGemstone.color,
                      border: `1px solid ${selectedGemstone.color}`,
                    }}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="text-xl font-bold mb-4 font-cinzel"
              style={{ color: '#C9A84C' }}
            >
              ₹ {selectedGemstone.price}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleWhatsAppEnquiry(selectedGemstone, selectedWeight)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(37,211,102,0.15)',
                  color: '#25D366',
                  border: '1px solid rgba(37,211,102,0.3)',
                }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Enquiry
              </button>
              <button
                onClick={() => {
                  addToCart(selectedGemstone, selectedWeight);
                  setSelectedGemstone(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${selectedGemstone.color}, ${selectedGemstone.color}99)`,
                  color: '#060818',
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ backgroundColor: 'rgba(6,8,24,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowCart(false)}
        >
          <div
            className="w-full max-w-md h-full flex flex-col"
            style={{ backgroundColor: 'rgba(14,18,50,0.98)', borderLeft: '1px solid rgba(201,168,76,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: 'rgba(201,168,76,0.2)' }}
            >
              <h2 className="text-xl font-bold font-cinzel" style={{ color: '#C9A84C' }}>
                Your Cart ({totalItems})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 rounded-full"
                style={{ color: '#7a9ab0' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4" style={{ color: '#7a9ab0' }} />
                  <p style={{ color: '#7a9ab0' }}>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.gemstone.id}-${item.weight}`}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(20,25,60,0.8)',
                      border: '1px solid rgba(201,168,76,0.2)',
                    }}
                  >
                    <div className="text-3xl">{item.gemstone.emoji}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm font-cinzel" style={{ color: '#C9A84C' }}>
                        {item.gemstone.name}
                      </div>
                      <div className="text-xs" style={{ color: '#7a9ab0' }}>
                        {item.weight}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.gemstone.id, item.weight, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: '#C9A84C' }}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold" style={{ color: '#ffffff' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.gemstone.id, item.weight, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: '#C9A84C' }}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.gemstone.id, item.weight)}
                      className="p-1"
                      style={{ color: '#7a9ab0' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div
                className="p-6 border-t"
                style={{ borderColor: 'rgba(201,168,76,0.2)' }}
              >
                <button
                  onClick={handleCartWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Enquire via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
