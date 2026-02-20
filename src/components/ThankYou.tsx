import { Download } from 'lucide-react'


interface ThankYouProps {
  firstName: string
}

export default function ThankYou({ firstName }: ThankYouProps) {
  return (
    <section className="bg-white p-8 sm:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
      <div className="mb-6">
        <h2 className="text-[28px] font-bold text-[var(--color-primary)] font-heading mb-3">
          Thanks, {firstName}! <br/> Great to connect.
        </h2>
        <p className="text-[#555555] text-[15px] font-body">
          I'll personally follow up with you shortly. In the meantime, save my contact details below.
        </p>
      </div>

      <a 
        href="/Andy_Choi.vcf" 
        download="Andy_Choi.vcf"
        className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-heading font-bold py-[14px] px-[24px] rounded-lg text-base hover:bg-[var(--color-blue-alt)] transition-colors duration-200 no-underline shadow-none"
      >
        <Download size={20} />
        Save Andy's Contact
      </a>
    <div className="mt-8 flex flex-col items-center">
        <p className="text-slate-400 text-sm mb-4 font-body">Connect with me on social</p>
        <div className="flex gap-4">
          <a 
            href="https://www.instagram.com/andychoi.multifamily/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group p-2 transition-transform hover:-translate-y-1"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="32px" height="32px" className="fill-slate-400 group-hover:fill-[#E1306C] transition-colors">
              <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"/>
            </svg>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/andychoiofficial/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group p-2 transition-transform hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="32px" height="32px" className="fill-slate-400 group-hover:fill-[#0077b5] transition-colors">
              <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
