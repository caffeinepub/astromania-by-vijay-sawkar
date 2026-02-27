import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How accurate is Kundali reading?',
    answer:
      'Kundali reading is based on precise astronomical calculations of planetary positions at the time of birth. With 20+ years of experience, Vijay Sawkar provides highly accurate readings that have helped thousands of clients gain clarity on career, relationships, and life decisions. Accuracy depends on the correctness of birth details (date, time, and place). Our readings are typically 85–95% accurate when correct birth information is provided.',
  },
  {
    question: 'How long does Vastu correction take?',
    answer:
      'Vastu corrections vary based on the property size and the extent of imbalances. Minor corrections (like rearranging furniture, adding specific colors, or placing remedial items) can be implemented within a day. Structural corrections may take 1–4 weeks. Most clients begin experiencing positive changes within 21–90 days of implementing Vastu corrections. We provide a detailed, step-by-step correction plan tailored to your property.',
  },
  {
    question: 'How to know which gemstone is suitable?',
    answer:
      'The right gemstone is determined through a thorough Kundali (birth chart) analysis. Each planet rules specific gemstones, and wearing the correct stone strengthens beneficial planetary energies. We analyze your birth chart, identify weak or malefic planets, and recommend gemstones that will bring maximum benefit. We strongly advise against wearing gemstones without proper astrological consultation, as the wrong stone can have adverse effects.',
  },
  {
    question: 'Are gemstones really effective?',
    answer:
      'Yes, gemstones have been used in Vedic astrology for thousands of years and have proven effective for countless individuals. Each gemstone carries specific vibrational frequencies that interact with planetary energies. Our gemstones are 100% natural, lab-certified, and tested for authenticity. When worn correctly (right finger, right metal, right weight) after proper astrological consultation, gemstones can significantly improve career prospects, financial stability, health, and relationships.',
  },
  {
    question: 'Do you provide online consultation?',
    answer:
      'Yes, we offer comprehensive online consultations via video call (Zoom, Google Meet, or WhatsApp Video). Online consultations are just as effective as in-person sessions. You can book a video consultation through our website, and we will send you a meeting link. We serve clients across India and internationally. All you need is your birth details (date, time, and place of birth) and a stable internet connection.',
  },
];

export default function FAQ() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#0a1628' }}>
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: '#40bcd8' }}>
            Common Questions
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: '#c9a84c' }}>
            Frequently Asked Questions
          </h2>
          <div className="section-divider w-32 mx-auto" />
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border overflow-hidden"
              style={{
                backgroundColor: 'rgba(15, 31, 61, 0.8)',
                borderColor: 'rgba(201, 168, 76, 0.2)',
              }}
            >
              <AccordionTrigger
                className="px-6 py-4 text-left font-medium hover:no-underline"
                style={{ color: '#f0e8d0' }}
              >
                <span className="font-serif text-lg">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent
                className="px-6 pb-5 text-sm leading-relaxed"
                style={{ color: '#8a9bb5' }}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
