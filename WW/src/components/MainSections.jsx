import React, { lazy, Suspense } from 'react';
import Hero3DSection from './Hero3DSection';

const AboutSection = lazy(() => import('./AboutSection'));
const ProductCategories = lazy(() => import('./ProductCategories'));
const FeaturedProducts = lazy(() => import('./FeaturedProducts'));
const ServicesSection = lazy(() => import('./ServicesSection'));
const WhyChooseUs = lazy(() => import('./WhyChooseUs'));
const BeforeAfterSlider = lazy(() => import('./BeforeAfterSlider'));
const ProjectGallery = lazy(() => import('./ProjectGallery'));
const ProcessTimeline = lazy(() => import('./ProcessTimeline'));
const TestimonialsSection = lazy(() => import('./TestimonialsSection'));
const ContactForm = lazy(() => import('./ContactForm'));

export default function MainSections({ siteData, SectionLoader }) {
  return (
    <>
      {/* 1. Global Hero Showcase with 3D Canvas */}
      <Hero3DSection data={siteData?.hero} />

      {/* 2. Full Architectural Product Categories Grid */}
      <Suspense fallback={<SectionLoader />}>
        <ProductCategories data={siteData?.categories} whatsappNumber={siteData?.contact?.whatsappNumber} />
      </Suspense>

      {/* 3. Featured Flagship Products Showcase */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedProducts data={siteData?.featuredProducts} />
      </Suspense>

      {/* 4. Fabrication Services & Specifications */}
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection data={siteData?.services} whatsappNumber={siteData?.contact?.whatsappNumber} />
      </Suspense>

      {/* 5. Company Overview & Before-After Transformations */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection data={siteData?.about} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <BeforeAfterSlider data={siteData?.beforeAfter} />
      </Suspense>

      {/* 6. Completed Project Portfolio Gallery */}
      <Suspense fallback={<SectionLoader />}>
        <ProjectGallery data={siteData?.gallery} whatsappNumber={siteData?.contact?.whatsappNumber} />
      </Suspense>

      {/* 7. Why Choose Us, Process Flow & Client Testimonials */}
      <Suspense fallback={<SectionLoader />}>
        <WhyChooseUs data={siteData?.whyChooseUs} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ProcessTimeline data={siteData?.timeline} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection data={siteData?.testimonials} />
      </Suspense>

      {/* 9. Global Inquiry Contact Form & Live Map */}
      <Suspense fallback={<SectionLoader />}>
        <ContactForm data={siteData?.contact} />
      </Suspense>
    </>
  );
}
