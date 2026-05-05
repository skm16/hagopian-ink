import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Nav } from '@/components/shared/Nav';
import { Footer } from '@/components/shared/Footer';
import { FadeIn, Btn, BtnLight } from '@/components/shared/ui';
import { CDN, SERIF, SANS, NAV_FONT, BRAND_STYLES } from '@/lib/brand';

const IMAGES = {
  hero: `${CDN}/2022/09/HagopianInk_2022.png`,
  cardOne: `${CDN}/2022/09/ink_card_mockup.jpg`,
  cardTwo: `${CDN}/2022/09/ink_card_mockup2.jpg`,
  screen: `${CDN}/2022/09/Screen-Shot-2022-09-20-at-10.45.15-PM-e1663728808581.png`,
};

export function BlogPostPage() {
  return (
    <div className="bg-white text-[#2d3232]" style={{ fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />
      <Nav />

      <article>
        <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 bg-white">
          <div className="max-w-[1100px] mx-auto text-center">
            <FadeIn>
              <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#2d3232]/70 hover:text-[#2d3232] mb-12" style={{ fontFamily: NAV_FONT }}>
                <ArrowLeft className="w-3 h-3" /> Back to Fresh Ink
              </Link>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#2d3232]/70 mb-5" style={{ fontFamily: NAV_FONT }}>Fresh Ink</p>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#2d3232]/70 mb-10" style={{ fontFamily: NAV_FONT }}>
                Studio News&nbsp;&nbsp;|&nbsp;&nbsp;September 21, 2022&nbsp;&nbsp;|&nbsp;&nbsp;Author: Christina Hagopian
              </div>
              <h1 className="text-5xl md:text-7xl leading-[0.98] max-w-4xl mx-auto text-white" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                Evolving and Embracing Change: Celebrating 20 years at Hagopian Ink
              </h1>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-20 bg-white">
          <FadeIn className="max-w-[900px] mx-auto bg-white/68 shadow-[0_30px_90px_rgba(45,50,50,0.08)] px-8 md:px-20 py-14 md:py-20">
            <div className="text-7xl leading-none text-[#d8d8e6] mb-4" style={{ fontFamily: SERIF }}>“</div>
            <blockquote className="text-2xl md:text-3xl leading-relaxed text-[#2d3232]/72 mb-8" style={{ fontFamily: SERIF }}>
              When I was 5 years old, I was caught drawing on my bed sheets with a ballpoint pen. My mom had to explain that not all surfaces were made for drawing.
            </blockquote>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#2d3232]/70" style={{ fontFamily: NAV_FONT }}>Christina Hagopian</p>
          </FadeIn>
        </section>

        <section className="px-6 md:px-12 pb-24 bg-white">
          <div className="max-w-[900px] mx-auto space-y-7 text-lg leading-relaxed text-[#2d3232]/70">
            <FadeIn>
              <p>
                What a wild ride the last 20 years has been. Christina started the business with just a phone and laptop after the dot-com layoffs ran across the agency world after 9/11. It was a turbulent time to be an agency designer, with so many unemployed creatives in the field and a market that felt precarious.
              </p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <p>
                The world was spinning, e-commerce was just beginning to take shape, and Hagopian Ink grew one relationship at a time. The clients that needed design at a high level also needed strategy, imagery, messaging, development, and a complete marketing ecosystem.
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p>
                Over two decades, that became the studio's signature: a curated team model built around trust, collaboration, and the belief that strong creative partnerships can help brands make their own unique mark on the world.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[#2d3232] px-6 md:px-12 py-24 md:py-32 text-[#f5f0eb]">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0eb]/60 mb-5" style={{ fontFamily: NAV_FONT }}>Archive Images</p>
              <h2 className="text-3xl md:text-4xl leading-[1.02]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
                The same story, reframed in the new system.
              </h2>
            </FadeIn>
            <div className="space-y-10">
              <FadeIn>
                <img src={IMAGES.hero} alt="Hagopian Ink 2002 to 2022" className="w-full h-auto block" />
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FadeIn delay={0.05}>
                  <img src={IMAGES.cardOne} alt="Hagopian Ink brand card mockup" className="w-full h-auto block" />
                </FadeIn>
                <FadeIn delay={0.1}>
                  <img src={IMAGES.cardTwo} alt="Hagopian Ink printed card mockup" className="w-full h-auto block" />
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1efef] px-6 md:px-12 py-24 text-center border-t border-[#e0ddd9]">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#2d3232]/70 mb-6" style={{ fontFamily: NAV_FONT }}>Keep Reading</p>
            <h2 className="text-3xl md:text-4xl mb-8 leading-[1.0]" style={{ fontFamily: SERIF, fontWeight: 700 }}>
              More Fresh Ink.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Btn href="/blog" external={false}>Back to Blog <ArrowRight className="w-4 h-4" /></Btn>
              <BtnLight href="/contact" external={false} className="bg-[#2d3232] text-[#f5f0eb] hover:bg-[#3a4040]">Start a Conversation</BtnLight>
            </div>
          </FadeIn>
        </section>
      </article>

      <Footer />
    </div>
  );
}
