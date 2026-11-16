import Image from "next/image";

/**
 * A project's walkthrough video (muted, looping) with its screenshot as the
 * poster. Visitors who prefer reduced motion see the screenshot only.
 */
export default function ProjectMedia({
  video, image, alt, sizes,
}: {
  video?: string;
  image: string;
  alt: string;
  sizes: string;
}) {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden">
      {video ? (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover object-top motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={image}
            aria-label={alt}
          >
            <source src={`${video}.webm`} type="video/webm" />
            <source src={`${video}.mp4`} type="video/mp4" />
          </video>
          <Image src={image} alt={alt} fill sizes={sizes} className="hidden motion-reduce:block object-cover object-top" />
        </>
      ) : (
        <Image src={image} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      )}
    </div>
  );
}
