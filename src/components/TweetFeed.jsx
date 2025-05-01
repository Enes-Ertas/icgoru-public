import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

function TweetFeed({ posts, username }) {
  const [firstTweetLoaded, setFirstTweetLoaded] = useState(false);
  const [showSwiper, setShowSwiper] = useState(false);
  const { t } = useTranslation();

  // 2 saniye sonra Swiper'ı göster
  useEffect(() => {
    const timer = setTimeout(() => setShowSwiper(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full bg-gradient-to-b from-white to-[#BBB2A5]
                 rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.05)] p-6"
      style={{
        background:
          "linear-gradient(to bottom right, #FAF8F7 0%, #ECE9E4 30%, #E3DFD8 70%, #DCD6CD 100%)",
      }}
    >
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 justify-center mb-4">
        {t("tweetFeed.title", "Sample Posts")}
      </h2>

      {/* İlk embedi göster */}
      {!firstTweetLoaded && posts.length > 0 && (
        <TweetEmbed
          tweetId={BigInt(posts[0].id).toString()}
          username={username}
          onLoad={() => setFirstTweetLoaded(true)}
        />
      )}

      {/* 2 saniye ve ilk tweet yüklendiyse slider */}
      {firstTweetLoaded && showSwiper && (
        <div className="relative">
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            spaceBetween={20}
            slidesPerView={1}
            autoHeight
            touchStartPreventDefault={false}
            touchMoveStopPropagation={false}
            onSwiper={(swiper) => {
              window.swiperInstance = swiper;
            }}
            className="md:pb-10 pb-0"
          >
            {posts.slice(0, 5).map((post) => {
              const tweetId = BigInt(post.id).toString();
              return (
                <SwiperSlide key={tweetId}>
                  <div className="flex justify-center items-center min-h-[420px]">
                    <div className="w-full max-w-[500px] rounded-2xl shadow-md">
                      <TweetEmbed
                        tweetId={tweetId}
                        username={username}
                        onLoad={() => {
                          if (window.swiperInstance) {
                            setTimeout(() => {
                              window.swiperInstance.updateAutoHeight();
                            }, 200);
                          }
                        }}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Pagination noktaları */}
          <div className="absolute bottom-2 left-0 right-0 hidden md:flex justify-center z-10">
            <div className="swiper-pagination" />
          </div>
        </div>
      )}
    </div>
  );
}

export default TweetFeed;

// TweetEmbed bileşeni aynen korunuyor
function TweetEmbed({ tweetId, username, onLoad }) {
  const ref = useRef(null);

  useEffect(() => {
    const loadTwitter = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load(ref.current).then(() => {
          onLoad?.();
          const iframe = ref.current.querySelector("iframe");
          if (iframe) {
            const observer = new ResizeObserver(() => {
              window.swiperInstance?.updateAutoHeight();
            });
            observer.observe(iframe);
            return () => observer.disconnect();
          }
        });
      }
    };

    if (window.twttr?.widgets) {
      loadTwitter();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = loadTwitter;
      document.body.appendChild(script);
    }
  }, [tweetId, onLoad]);

  return (
    <div ref={ref}>
      <blockquote className="twitter-tweet w-full h-auto m-0">
        <a
          href={`https://twitter.com/${username}/status/${tweetId}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      </blockquote>
    </div>
  );
}
