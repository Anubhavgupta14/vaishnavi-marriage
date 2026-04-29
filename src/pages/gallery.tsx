import Head from 'next/head';
import dynamic from 'next/dynamic';

// Three.js must be dynamically imported to avoid SSR issues
const StellarCardGallery = dynamic(
  () => import('@/components/ui/3d-image-gallery'),
  { ssr: false }
);

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Gallery — Vaishnavi &amp; Sumeet Wedding</title>
        <meta
          name="description"
          content="Explore our 3D stellar photo gallery. Drag to explore, scroll to zoom, click to view full size."
        />
      </Head>

      {/* Full viewport canvas for 3D gallery */}
      <main
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Title overlay */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <p
            className="text-4xl md:text-5xl italic"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              color: '#f0d080',
              textShadow: '0 0 40px rgba(201,151,58,0.4)',
              fontWeight: 500,
            }}
          >
            Our Gallery
          </p>
          <p
            className="text-sm tracking-widest mt-2"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}
          >
            VAISHNAVI &amp; SUMEET
          </p>
        </div>

        <StellarCardGallery />
      </main>
    </>
  );
}
