'use client'

import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '6281234567890'
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Jungla! I found you on your website and I'd like to know more."
)

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-once"
    >
      <MessageCircle size={24} className="text-white" fill="white" />

      <style jsx>{`
        @keyframes pulse-once {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
        }
        .animate-pulse-once {
          animation: pulse-once 2s ease-out 1s 3;
        }
      `}</style>
    </a>
  )
}
