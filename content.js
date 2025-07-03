// 문제 페이지에서 통계 숨기기
function hideProblemPageStats() {
  if (!location.pathname.startsWith('/problem/')) return;

  const tdList = document.querySelectorAll('#problem-info > tbody > tr > td');
  if (tdList.length >= 6) {
    for (let i = 2; i < 6; i++) {
      tdList[i].textContent = '?';
    }
  }
}

// 문제목록 페이지에서 통계 숨기기
function hideProblemListStats() {
  const listPaths = [
    '/problemset',
    '/problem/added',
    '/step/',
    '/category/detail/',
    '/workbook/view/',
    '/group/workbook/view/',
  ];
  const pathname = location.pathname;
  const isListPage =
    pathname === '/problemset' || listPaths.some(path => pathname.startsWith(path));
  const isBmPage = pathname === '/problemset' && location.search.includes('etc=bm');

  if (!isListPage) return;

  const tableRows = document.querySelectorAll('table.table tbody tr');
  tableRows.forEach(tr => {
    const tdList = tr.querySelectorAll('td');
    const len = tdList.length;

    const offset = isBmPage ? 1 : 0;  // 북마크(etc=bm)면 한 칸 더 밀림

    if (len >= 3 + offset) {
      // 마지막 텍스트 칸
      tdList[len - 1 - offset].textContent = '?';

      // 뒤에서 offset까지의 <a> 텍스트 변경
      for (let i = 2; i <= 3; i++) {
        const aTag = tdList[len - i - offset]?.querySelector('a');
        if (aTag) {
          aTag.textContent = '?';
        }
      }
    }
  });
}


function safeRunHider() {
  try {
    hideProblemPageStats();
    hideProblemListStats();
  } catch (e) {
    console.error('Baekjoon Hider Error:', e);
  }
}

// 최초 실행
safeRunHider();

// DOM 변화 감지해서 즉시 처리 (무한 루프 방지용 디바운스 포함)
let debounceTimer;
const observer = new MutationObserver(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    safeRunHider();
  }, 30);  // 0.03초 디바운스 (속도)
});
observer.observe(document.body, { childList: true, subtree: true });
