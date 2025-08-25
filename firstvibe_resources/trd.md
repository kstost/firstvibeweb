# firstvibe 랜딩 페이지 기술요구사항문서(TRD)

---

## 1. 프로젝트 개요

### 1.1. 목표
CLI 도구 `firstvibe`의 핵심 가치를 전달하고, 방문자의 `npx firstvibe` 명령어 실행을 유도하는 단일 페이지 정적 랜딩 페이지를 구축한다.

### 1.2. 핵심 기능
- 제품의 가치와 기능을 설명하는 여러 정보 섹션 표시
- `npx firstvibe` 명령어 복사 기능 제공
- 모든 디바이스에 최적화된 반응형 웹 디자인 적용
- Google Analytics를 통한 사용자 행동 추적

---

## 2. 기술 스택

| 구분 | 기술 | 버전/사양 | 사유 |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | ^14.0 | React 기반의 현대적인 웹 개발, SSG(Static Site Generation)를 통한 우수한 성능, SEO 최적화 |
| **Language** | TypeScript | ^5.0 | 정적 타입 지원으로 코드 안정성 및 AI 에이전트의 작업 정확성 향상 |
| **Styling** | Tailwind CSS | ^3.0 | 유틸리티 우선 접근 방식으로 신속한 반응형 UI 개발 및 일관된 디자인 시스템 유지 |
| **Analytics** | Google Analytics | GA4 | 사용자 행동 추적 및 핵심 성공 지표(KPI) 측정을 위함 |
| **Deployment** | Vercel | - | Next.js와 완벽하게 통합되어 CI/CD 및 배포 자동화가 용이함 |
| **Linting/Formatting** | ESLint, Prettier | 최신 | 코드 품질 및 일관성 유지 |

---

## 3. 프로젝트 구조

```
firstvibe-landing/
├── public/
│   ├── images/
│   │   ├── how-it-works.svg  // FR-002 다이어그램 이미지
│   │   ├── icon-feature-1.svg // FR-003 기능 아이콘
│   │   ├── icon-feature-2.svg
│   │   ├── icon-feature-3.svg
│   │   └── icon-feature-4.svg
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx         // 루트 레이아웃
│   │   ├── page.tsx           // 메인 페이지 (컴포넌트 조합)
│   │   └── globals.css        // 전역 CSS 및 Tailwind CSS 설정
│   ├── components/
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── TargetAudienceSection.tsx
│   │   │   ├── FinalCtaSection.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       └── CliCopy.tsx      // 재사용 가능한 CLI 복사 컴포넌트
│   └── lib/
│       └── analytics.ts       // Google Analytics 설정 및 이벤트 래퍼 (선택사항)
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 4. 핵심 의존성 및 설정

### 4.1. 의존성 설치
```bash
npx create-next-app@latest firstvibe-landing --typescript --tailwind --eslint
```
- 위 명령어로 기본 Next.js, TypeScript, Tailwind CSS, ESLint 프로젝트를 설정합니다.

### 4.2. 추가 의존성
```bash
npm install clsx tailwind-merge
```
- `clsx`, `tailwind-merge`: Tailwind CSS 클래스를 조건부로 병합하고 관리하기 위한 유틸리티 라이브러리입니다.

### 4.3. `tailwind.config.ts` 설정
- 전체적인 디자인 톤앤매너와 글래스모피즘 효과를 위해 필요한 커스텀 스타일을 추가합니다.
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 프로젝트에 필요한 주요 색상 정의
      },
      backdropBlur: {
        'xl': '24px',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 5. 컴포넌트 기반 개발 계획

### **P0: Core UI Component**

| ID | 컴포넌트명 | 파일 경로 | 설명 | Props 정의 | 구현 상세 | 검증 기준 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **C-000** | `CliCopy.tsx` | `src/components/ui/CliCopy.tsx` | `npx firstvibe` 텍스트와 복사 버튼을 포함하는 재사용 가능한 UI 컴포넌트. | `textToCopy: string` | - 클라이언트 컴포넌트(`'use client'`)로 선언해야 합니다.<br>- `useState`를 사용하여 복사 상태(`isCopied`)를 관리합니다.<br>- 버튼 클릭 시 `navigator.clipboard.writeText(textToCopy)`를 호출합니다.<br>- 복사 성공 시, `isCopied`를 `true`로 변경하고 1.5초 후 `false`로 되돌리는 `setTimeout`을 사용합니다.<br>- `isCopied` 상태에 따라 "복사 완료!" 텍스트 또는 체크 아이콘을 조건부로 렌더링합니다.<br>- Glassmorphism 스타일을 적용합니다 (e.g., `bg-white/10 backdrop-blur-xl`). | - 컴포넌트 클릭 시 `textToCopy` prop의 값이 클립보드에 복사된다.<br>- 클릭 후 1.5초 동안 "복사 완료!" 메시지가 표시된 후 사라진다. |

### **P1: Section Components**

| ID | 컴포넌트명 | 파일 경로 | 의존성 | 설명 | 구현 상세 | 검증 기준 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **C-001** | `HeroSection.tsx` | `src/components/landing/HeroSection.tsx` | `C-000` | **FR-001** 히어로 섹션. | - 헤드라인: `MVP의 첫 진동, firstvibe.`<br>- 서브헤드라인: `당신의 한 문장의 아이디어를 확장시켜 MVP로 만들기 위한 토대를 만들어드립니다.`<br>- `CliCopy` 컴포넌트를 사용하여 `textToCopy="npx firstvibe"`를 전달합니다. | - 모든 텍스트가 PRD와 동일하게 렌더링된다.<br>- `CliCopy` 컴포넌트가 올바르게 동작한다. |
| **C-002** | `HowItWorksSection.tsx` | `src/components/landing/HowItWorksSection.tsx` | - | **FR-002** 작동 방식 섹션. | - 'How it works'와 같은 제목을 포함합니다.<br>- 제공될 `how-it-works.svg` 이미지를 `next/image`를 사용하여 렌더링합니다.<br>- 이미지 내용은 '아이디어 입력 → Q&A 진행 → 산출물 생성' 흐름을 시각적으로 나타냅니다. | - 제목이 표시된다.<br>- 이미지가 깨짐 없이 정상적으로 표시된다. |
| **C-003** | `FeaturesSection.tsx` | `src/components/landing/FeaturesSection.tsx` | - | **FR-003** 핵심 기능 섹션. | - PRD에 명시된 4개의 핵심 기능을 리스트 형태로 렌더링합니다.<br>- 각 기능 항목은 아이콘(`icon-feature-*.svg`), 제목, 설명 텍스트로 구성됩니다.<br>- 그리드 레이아웃(데스크탑 2x2 또는 4x1, 모바일 1x4)을 사용하여 반응형으로 표시합니다. | - 4개의 기능이 모두 아이콘과 함께 정확한 텍스트로 표시된다.<br>- 화면 크기에 따라 레이아웃이 적절하게 변경된다. |
| **C-004** | `TargetAudienceSection.tsx` | `src/components/landing/TargetAudienceSection.tsx` | - | **FR-004** 대상 고객 섹션. | - "이런 분들께 추천합니다"와 같은 제목을 포함합니다.<br>- PRD에 명시된 타겟 고객(초기 창업가, 사이드 프로젝트 진행자 등)을 리스트 형태로 표시합니다. | - 제목과 타겟 고객 리스트가 정확히 표시된다. |
| **C-005** | `FinalCtaSection.tsx` | `src/components/landing/FinalCtaSection.tsx` | `C-000` | **FR-005** 마무리 CTA 섹션. | - "지금 바로 시작해보세요"와 같은 행동 유도 문구를 포함합니다.<br>- `HeroSection`과 동일한 `CliCopy` 컴포넌트를 재사용합니다. | - 행동 유도 문구가 표시된다.<br>- `CliCopy` 컴포넌트가 올바르게 동작한다. |
| **C-006** | `Footer.tsx` | `src/components/landing/Footer.tsx` | - | **FR-006** 푸터 섹션. | - 저작권 정보(`© 2024 firstvibe`)를 표시합니다.<br>- 필요한 경우 소셜 링크(GitHub 등)를 아이콘으로 추가합니다. | - 저작권 정보가 정확히 표시된다. |

### **P2: Page Assembly**

| ID | 컴포넌트명 | 파일 경로 | 의존성 | 설명 | 구현 상세 | 검증 기준 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P-001** | `page.tsx` | `src/app/page.tsx` | `C-001` ~ `C-006` | 메인 랜딩 페이지. | - `main` 태그 내에 개발된 모든 섹션 컴포넌트(`C-001`부터 `C-006`까지)를 순서대로 임포트하여 배치합니다. | - 모든 섹션이 PRD에 명시된 순서대로 렌더링된다.<br>- 페이지 스크롤 시 모든 섹션의 콘텐츠가 정상적으로 보인다. |

---

## 6. 비기능적 요구사항 구현

| ID | 요구사항 | 구현 방안 | 검증 기준 |
| :--- | :--- | :--- | :--- |
| **NFR-001** | **성능** | - Next.js의 SSG를 기본으로 사용합니다.<br>- `public/` 폴더의 모든 이미지는 WebP와 같은 최신 포맷으로 압축하고, `next/image` 컴포넌트를 사용하여 최적화된 이미지를 로드합니다. | - Google PageSpeed Insights 점수가 모바일/데스크탑 모두 90점 이상을 목표로 한다. |
| **NFR-002** | **반응형 웹** | - Tailwind CSS의 breakpoint(`sm`, `md`, `lg`, `xl`)를 사용하여 모든 컴포넌트를 모바일 우선 방식으로 스타일링합니다. | - Chrome 개발자 도구의 디바이스 토글 기능을 사용하여 360px, 768px, 1024px 너비에서 레이아웃이 깨지지 않고 콘텐츠 가독성이 확보되는지 확인한다. |
| **NFR-003** | **브라우저 호환성** | - PostCSS와 Autoprefixer를 사용하여 표준 CSS를 생성합니다(Next.js 기본 설정).<br>- `navigator.clipboard`와 같이 일부 구형 브라우저에서 지원되지 않을 수 있는 API는 최신 브라우저를 타겟으로 하므로 별도 폴리필은 적용하지 않습니다. | - 최신 버전의 Chrome, Safari, Firefox, Edge에서 모든 기능과 스타일이 동일하게 동작하는 것을 확인한다. |
| **NFR-004** | **디자인** | - `tailwind.config.ts`에 프로젝트의 메인 컬러, 폰트 등을 정의하여 일관성을 유지합니다.<br>- Glassmorphism 효과는 `bg-opacity`와 `backdrop-blur` 유틸리티를 조합하여 구현합니다. | - UI가 PRD에 명시된 '밝고 모던한', 'Glassmorphism' 톤앤매너와 일치하는지 시각적으로 검토한다. |
| **NFR-005** | **분석** | - `src/app/layout.tsx`에 Google Analytics(GA4) 스크립트를 삽입합니다. Next.js 13+의 `@next/third-party` 라이브러리 사용을 권장합니다.<br>- `CliCopy` 컴포넌트의 복사 버튼 `onClick` 핸들러에 GA 이벤트(`gtag('event', 'copy_cli_command', ...)` 등)를 추적하는 코드를 추가합니다. | - 페이지 방문 시 GA 실시간 리포트에 방문자가 기록되는지 확인한다.<br>- 복사 버튼 클릭 시, GA 실시간 리포트의 이벤트 탭에 'copy_cli_command' 이벤트가 기록되는지 확인한다. |

---

## 7. 개발 작업 순서 및 의존성

1.  **Phase 1: 프로젝트 설정 (P0)**
    - `create-next-app`으로 프로젝트를 생성하고 의존성을 설치합니다.
    - `tailwind.config.ts` 및 `globals.css` 기본 설정을 완료합니다.
    - `C-000: CliCopy.tsx` 컴포넌트를 먼저 개발하고 테스트합니다. 이 컴포넌트는 재사용되므로 독립적으로 완벽하게 동작해야 합니다.

2.  **Phase 2: 섹션 컴포넌트 개발 (P1)**
    - `C-001`부터 `C-006`까지의 각 섹션 컴포넌트를 순서대로 독립적으로 개발합니다.
    - 각 컴포넌트는 정적 콘텐츠와 스타일링을 포함하며, 반응형 디자인을 고려하여 구현합니다.
    - `C-001`과 `C-005`는 Phase 1에서 개발한 `C-000` 컴포넌트를 임포트하여 사용합니다.

3.  **Phase 3: 페이지 통합 및 최종 테스트 (P2)**
    - `P-001: page.tsx`에서 개발된 모든 섹션 컴포넌트를 조립하여 전체 페이지를 완성합니다.
    - 비기능적 요구사항(NFR-001 ~ NFR-005)을 전체 페이지 관점에서 최종 점검하고 구현합니다. (특히 GA 연동)
    - 다양한 브라우저와 디바이스 환경에서 QA를 진행합니다.

4.  **Phase 4: 배포**
    - Vercel에 프로젝트를 연결하고 최종 빌드 및 배포를 진행합니다.