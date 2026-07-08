const episodes = [
  {
    no: 1,
    date: "2026.07.08",
    title: "MSA 금융 API를 운영하는 법",
    meta: "Java/Spring Boot · Oracle · Redis",
    rating: "★ 9.98",
    summary:
      "모니모 요구사항을 바탕으로 금융 서비스 API를 개발하고, Oracle 트랜잭션과 Redis 캐시 구조를 함께 설계했습니다.",
    points: [
      "공공마이데이터, 부동산, 신용관리, 제휴 서비스 운영 리더",
      "대외 제휴 API 연동과 보안을 고려한 서비스 흐름 설계",
      "토스 AD, 에버랜드, FLO 뮤직, 혜택알리미 등 제휴 프로세스 개발"
    ]
  },
  {
    no: 2,
    date: "2025.성과컷",
    title: "4.5초 화면을 1초대로",
    meta: "MyData API · 병렬 처리 · Front/Back 개선",
    rating: "★ 9.99",
    summary:
      "마이데이터 API 순차 호출 구조를 병렬 처리 방식으로 바꾸어 사용자 응답 속도를 4.5초에서 1초대로 줄였습니다.",
    points: [
      "병목이 되는 API 호출 흐름 분석",
      "순차 처리 구조를 병렬 처리 구조로 개선",
      "사용자 체감 로딩 속도와 서비스 응답 안정성 개선"
    ]
  },
  {
    no: 3,
    date: "2024.운영컷",
    title: "배포 30분을 5분으로",
    meta: "Git Repository 통합 · Branch 전략",
    rating: "★ 9.96",
    summary:
      "개발/운영 저장소가 나뉘어 생기던 배포 리스크를 저장소 통합과 브랜치 전략 재정립으로 줄였습니다.",
    points: [
      "개발/운영 저장소 이원화 구조 통합",
      "브랜치 전략 재수립으로 배포 흐름 단순화",
      "배포 시간 30분에서 5분으로 단축, 운영 사고 가능성 제거"
    ]
  },
  {
    no: 4,
    date: "2022.02 - 2022.07",
    title: "반도체 장비를 제어하다",
    meta: "C++ MFC · C# · PID Control",
    rating: "★ 9.91",
    summary:
      "케이씨텍에서 반도체 공정 장비 제어 소프트웨어를 개발하며 실시간 데이터 처리와 안정적인 제어 로직을 다뤘습니다.",
    points: [
      "센서 데이터 기반 소모품 마모 상태 측정과 실시간 모니터링 구현",
      "Queuing 알고리즘 기반 저장 장치별 자원 분배 로직 설계",
      "PID 제어 알고리즘 적용을 통한 정밀 온도 제어 시스템 개발"
    ]
  },
  {
    no: 5,
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
