import { getDictionary, Lang } from "@/app/lib/dictionaries";
import Image from "next/image";
import ReviewsCarouselController from "./ReviewsCarouselController";

function DesktopReviewCard({
  name,
  role,
  photo,
  text,
  index,
  isVisible,
}: {
  name: string;
  role: string;
  photo: string;
  text: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      data-review-desktop={index}
      className="hidden md:flex pointer-events-none bg-[#FFE9D2] rounded-none p-7 flex-col justify-between min-h-80"
      style={isVisible ? undefined : { display: "none" }}
      aria-hidden={!isVisible}
    >
      <p className="text-[#3d2b1f] text-[16px] leading-relaxed flex-1 mb-6">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-4 pt-4 border-t border-[#f0cfae]">
        <Image
          src={photo}
          alt={name}
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 aspect-square rounded-full object-cover border border-[#f0cfae] pointer-events-none"
        />
        <div>
          <div className="font-bold text-[#121212] text-[16px]">{name}</div>
          <div className="text-[13px] text-[#6b5c4e]">{role}</div>
        </div>
      </div>
    </div>
  );
}

function MobileReviewCard({
  name,
  role,
  photo,
  text,
  index,
  isVisible,
}: {
  name: string;
  role: string;
  photo: string;
  text: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      data-review-mobile={index}
      className="md:hidden pointer-events-none bg-[#FFE9D2] rounded-2xl p-6 flex-col justify-between min-h-80"
      style={{ display: isVisible ? "flex" : "none" }}
      aria-hidden={!isVisible}
    >
      <p className="text-[#3d2b1f] text-[14px] leading-relaxed flex-1 mb-5">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-[#f0cfae]">
        <Image
          src={photo}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 aspect-square rounded-full object-cover border border-[#f0cfae] pointer-events-none"
        />
        <div>
          <div className="font-bold text-[#121212] text-[14px]">{name}</div>
          <div className="text-[12px] text-[#6b5c4e]">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews({ lang = "ru" }: { lang?: Lang }) {
  const dict = getDictionary(lang);
  const reviews = dict.data.REVIEWS;

  return (
    <section id="reviews" className="bg-[#fff8f3] py-16 md:py-24">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[30px] sm:text-[38px] md:text-[44px] font-black text-[#121212] leading-tight mb-2 sm:mb-0">
            {dict.reviews_sec.title}
          </h2>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-5">
          {reviews.map((review, index) => (
            <DesktopReviewCard
              key={`${review.name}-desktop`}
              index={index}
              isVisible={index < 3}
              name={review.name}
              role={review.role}
              photo={review.photo}
              text={review.text}
            />
          ))}
        </div>

        <div className="md:hidden">
          {reviews.map((review, index) => (
            <MobileReviewCard
              key={`${review.name}-mobile`}
              index={index}
              isVisible={index === 0}
              name={review.name}
              role={review.role}
              photo={review.photo}
              text={review.text}
            />
          ))}
        </div>

        <ReviewsCarouselController
          total={reviews.length}
          prevLabel={dict.reviews_sec.prev || "Previous"}
          nextLabel={dict.reviews_sec.next || "Next"}
          dotLabel={dict.reviews_sec.review_aria}
        />
      </div>
    </section>
  );
}
