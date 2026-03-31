export interface Story {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  imgUrl: string;
  content: string;
}

export const mockStories: Story[] = Array.from({ length: 45 }).map((_, i) => {
  const categories = ["학원소식", "입시칼럼", "성적향상", "공부법"];
  const randomCategory = categories[i % categories.length];
  
  return {
    id: `${45 - i}`,
    title: `[${randomCategory}] CLS 교육 칼럼 및 소식 ${45 - i}번째 이야기`,
    summary: "CLS 에듀의 생생한 학원 소식과 입시, 학습 전략에 대한 유익한 정보를 전달해 드립니다. 학생들의 성적 향상 스토리를 확인해보세요.",
    date: `2026-03-${String((45 - i) % 30 + 1).padStart(2, "0")}`,
    author: "CLS 관리자",
    category: randomCategory,
    imgUrl: `https://picsum.photos/seed/${45 - i}/600/400`,
    content: `
      <h2>CLS 에듀의 새로운 교육 패러다임</h2>
      <p>저희 CLS 교육 시스템은 체계적인 관리와 개인별 맞춤 학습을 통해 학생들의 잠재력을 최대한 끌어냅니다.</p>
      <p>본문 내용이 들어갈 자리입니다. 이 게시물은 테스트용으로 만들어진 가상 데이터입니다.</p>
      <img src="https://picsum.photos/seed/${45 - i}/800/400" alt="post image" style="border-radius: 8px; margin: 24px 0;" />
      <p>단순한 암기를 넘어 깊이 있는 이해를 지향하며, 자기주도적 학습 능력을 키우는 것이 저희의 목표입니다.</p>
      <p>앞으로도 학생들의 밝은 미래를 위해 최선의 노력을 다하겠습니다. 감사합니다.</p>
    `
  };
});
