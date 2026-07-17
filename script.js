const episodes = [
  {
    no: 1,
    date: "2026.07.17",
    title: "MSA 금융 API를 운영하는 법",
    meta: "Java/Spring Boot · Oracle · Redis",
    rating: "★ 9.98",
    summary:
      "모니모 요구사항을 바탕으로 금융 서비스 API를 개발하고, Oracle 트랜잭션과 Redis 캐시 구조를 함께 설계했습니다.",
    points: [
      "공공마이데이터, 부동산, 신용관리, 제휴 서비스 운영 리더",
      "Oracle 기반 데이터 모델 설계 및 트랜잭션 관리",
      "Redis 기반 캐시 구조 설계로 DB 부하 분산",
      "대외 제휴 API 연동과 보안을 고려한 제휴Biz 플랫폼 구축",
      "토스 AD, 에버랜드, FLO 뮤직, 혜택알리미 등 제휴 프로세스 개발"
    ]
  },
  {
    no: 2,
    date: "2025.DB개선컷",
    title: "DB Lock을 푼 배치 구조",
    meta: "Oracle · Batch · Chunk Commit",
    rating: "★ 9.99",
    summary:
      "특정 시간대 온라인 처리 지연의 원인을 배치 대량 update와 DB lock에서 찾고, 대량건 처리 구조를 개선했습니다.",
    points: [
      "문제: 특정 시간대에 DB 온라인 처리 지연 발생",
      "원인: 배치 시스템에서 1개의 commit으로 대량 update가 발생하며 DB lock 발생",
      "역할: 원인 분석 및 대량건 처리 시 성능 최적화 설계",
      "효과: DB 부하 감소 및 대량 데이터 일괄 commit으로 인한 지연 문제 해소"
    ]
  },
  {
    no: 3,
    date: "2025.성과컷",
    title: "4.5초 화면을 1초대로",
    meta: "MyData API · 병렬 처리 · Front/Back 개선",
    rating: "★ 9.99",
    summary:
      "초기 화면에서 순차 호출되던 API 구조를 병렬 처리 방식으로 바꾸어 응답 속도를 4.5초에서 1초대로 줄였습니다.",
    points: [
      "문제: API 응답 지연으로 화면 로딩 시 4~5초 이상 백화현상 발생",
      "원인: 화면에서 호출하는 API가 순차 호출 구조로 구성",
      "역할: 데이터 연계성이 없는 API를 분리하고 병렬 호출 구조로 변경",
      "효과: 응답 속도 4.5초에서 1초대로 개선"
    ]
  },
  {
    no: 4,
    date: "2024.운영컷",
    title: "배포 30분을 5분으로",
    meta: "Git Repository 통합 · Branch 전략",
    rating: "★ 9.96",
    summary:
      "개발/운영 원격 저장소가 분리되어 생기던 소스 누락과 배포 리스크를 저장소 통합과 브랜치 전략 재정립으로 줄였습니다.",
    points: [
      "문제: 운영 배포 시 소스 누락 및 업무 생산성 저하 발생",
      "원인: 개발 건을 운영에 반영하기 위해 Copy & Paste 작업 후 배포하는 구조",
      "역할: 개발/운영 저장소 이원화 구조 통합 및 Branch 전략 재정립",
      "배포 시간 30분에서 5분으로 단축, 운영 사고 가능성 제거"
    ]
  },
  {
    no: 5,
    date: "2022.02 - 2022.07",
    title: "반도체 장비를 제어하다",
    meta: "C++ MFC · C# · PID Control",
    rating: "★ 9.91",
    summary:
      "케이씨텍에서 반도체 공정 장비 제어 소프트웨어를 개발하며 실시간 데이터 처리와 안정적인 제어 로직을 다뤘습니다.",
    points: [
      "센서 데이터 기반 소모품 마모 상태 측정과 실시간 모니터링 구현",
      "4개 저장 장치간 화학 재료 흐름 제어 시스템 구현",
      "Queuing 알고리즘 기반 저장 장치별 자원 분배 로직 설계",
      "PID 제어 알고리즘 적용을 통한 정밀 온도 제어 시스템 개발"
    ]
  },
  {
    no: 6,
    date: "2020.09 - 2021.06",
    title: "광고 플랫폼 트래픽의 첫 시즌",
    meta: "Spring Batch · Redis · 외부 광고 API",
    rating: "★ 9.88",
    summary:
      "인라이플에서 대규모 트래픽 기반 광고 매체 플랫폼 서버를 운영하고 외부 제휴 광고 API와 과금 통계 배치를 개발했습니다.",
    points: [
      "대규모 트래픽 기반 광고 플랫폼 백엔드 운영",
      "외부 제휴 광고 API 연동 및 운영",
      "Spring Batch 기반 과금 통계 배치 개발"
    ]
  }
];

const episodeList = document.querySelector(".episode-list");
const reader = document.querySelector(".episode-reader");
const sortButton = document.querySelector(".sort-button");
const careerDuration = document.querySelector("#career-duration");
let latestFirst = true;
let activeNo = episodes[0].no;

function getCareerDuration(startDate, endDate = new Date()) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years}년 ${months}개월`;
}

function renderCareerDuration() {
  if (!careerDuration) return;

  const startDate = new Date(`${careerDuration.dataset.startDate}T00:00:00`);
  careerDuration.textContent = getCareerDuration(startDate);
}

function renderEpisodes() {
  const ordered = latestFirst ? [...episodes] : [...episodes].reverse();
  episodeList.innerHTML = ordered
    .map(
      (episode) => `
        <li>
          <button class="episode-card ${episode.no === activeNo ? "is-active" : ""}" type="button" data-no="${episode.no}">
            <span class="episode-thumb" aria-hidden="true">
              <span class="episode-number">${String(episode.no).padStart(2, "0")}</span>
            </span>
            <span>
              <span class="episode-meta">${episode.date}</span>
              <span class="episode-title">${episode.title}</span>
              <p>${episode.meta}</p>
            </span>
            <span class="episode-rating">${episode.rating}</span>
          </button>
        </li>
      `
    )
    .join("");
}

function renderReader(no) {
  const episode = episodes.find((item) => item.no === no) || episodes[0];
  activeNo = episode.no;
  reader.innerHTML = `
    <span class="episode-meta">${episode.date} · EP.${String(episode.no).padStart(2, "0")}</span>
    <h3>${episode.title}</h3>
    <p>${episode.summary}</p>
    <ul>
      ${episode.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
  renderEpisodes();
}

episodeList.addEventListener("click", (event) => {
  const card = event.target.closest(".episode-card");
  if (!card) return;
  renderReader(Number(card.dataset.no));
});

sortButton.addEventListener("click", () => {
  latestFirst = !latestFirst;
  sortButton.textContent = latestFirst ? "최신순" : "첫화부터";
  sortButton.setAttribute("aria-pressed", String(!latestFirst));
  renderEpisodes();
});

renderEpisodes();
renderReader(activeNo);
renderCareerDuration();
