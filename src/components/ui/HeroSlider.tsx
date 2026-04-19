import HeroSliderClient, {
  type SlideData,
  type SliderSettings,
} from "@/components/ui/HeroSliderClient";

// ─── 기본값 (API 실패 또는 등록된 슬라이드가 없을 때만 사용) ────────────────
const DEFAULT_IMAGES: SlideData[] = [
  { imageUrl: "https://media.clsedu.co.kr/hero-01-clsedu-main-building-rebuild-optimized.jpeg" },
  { imageUrl: "https://media.clsedu.co.kr/KYJ00897.jpg" },
  { imageUrl: "https://media.clsedu.co.kr/jeff-sheldon-JWiShWiF14-unsplash.jpg" },
  { imageUrl: "https://media.clsedu.co.kr/hero-01-student-studying-hard-optimized.jpeg" },
];

const DEFAULT_SETTINGS: SliderSettings = {
  autoplayInterval: 5000,
  transitionSpeed: 1500,
  transitionEffect: "fade",
  isRandomized: false,
};

// 서버 컴포넌트: SSR 단계에서 실제 슬라이드 데이터를 확보하여
// 클라이언트 컴포넌트로 전달한다. 이렇게 하면 초기 HTML에 실제 이미지가
// 포함되어 fallback 이미지가 잠깐 보이는 깜빡임이 발생하지 않는다.
export default async function HeroSlider() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let slides: SlideData[] = DEFAULT_IMAGES;
  let settings: SliderSettings = DEFAULT_SETTINGS;

  if (apiUrl) {
    try {
      const [slidesRes, settingsRes] = await Promise.all([
        // 페이지 자체의 revalidate(관리자 저장 시 revalidatePath('/')로 즉시 갱신)에 위임.
        fetch(`${apiUrl}/api/hero-slides`, { next: { revalidate: 300 } }),
        fetch(`${apiUrl}/api/hero-slides/settings`, { next: { revalidate: 300 } }),
      ]);

      if (slidesRes.ok) {
        const data = await slidesRes.json();
        if (Array.isArray(data) && data.length > 0) {
          slides = data as SlideData[];
        }
      }
      if (settingsRes.ok) {
        const s = await settingsRes.json();
        settings = { ...DEFAULT_SETTINGS, ...s };
      }
    } catch {
      // API 호출 실패 시 기본값 유지
    }
  }

  return <HeroSliderClient slides={slides} settings={settings} />;
}
