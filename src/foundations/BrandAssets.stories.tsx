import type { CSSProperties, ReactNode } from 'react';
import { Box, Flex, Grid, Stack } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../guidelines/_components/Lang';

/**
 * Specimens for `BrandAssets.mdx` (Foundations / Brand assets).
 *
 * Everything here is drawn the way baze.co draws it: the geometry is copied
 * verbatim from `mindlogic-ai/baze-landing-page` `src/lib/marks.ts` (itself
 * traced from the Illustrator master), the grain filter from
 * `src/components/ui/GrainDefs.astro`, and every size, offset and colour from
 * the component that uses it (cited per story). These helpers are local to the
 * docs page on purpose — they are not a library component, and the package
 * ships no brand raster. The artwork images are loaded from baze.co itself,
 * never bundled.
 *
 * Hidden from the sidebar (`!dev`); the MDX page is the entry point.
 */
const meta: Meta = {
  title: 'Foundations/Brand assets',
  tags: ['!dev'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* -------------------------------------------------------------------------
   Geometry — verbatim from baze-landing-page `src/lib/marks.ts`.
   Do not nudge these numbers; re-trace from the master file instead.
   ------------------------------------------------------------------------- */

const MARK_ASPECT = 1.04051;
const MARK_VIEWBOX = '0 0 104.051 100';
const PAIR =
  'M 28.178 53.749 C 28.178 53.749 26.763 52.382 26.763 49.999 C 26.763 47.619 28.178 46.252 28.178 46.252 L 46.856 27.578 C 48.753 25.681 48.753 22.598 46.856 20.701 L 27.577 1.423 C 25.68 -0.474 22.601 -0.474 20.7 1.423 L 1.426 20.701 C -0.475 22.598 -0.475 25.681 1.426 27.578 L 20.1 46.252 C 20.1 46.252 21.518 47.619 21.518 49.999 C 21.518 52.382 20.1 53.749 20.1 53.749 L 1.426 72.423 C -0.475 74.32 -0.475 77.403 1.426 79.3 L 20.7 98.574 C 22.601 100.475 25.68 100.475 27.577 98.574 L 46.856 79.3 C 48.753 77.403 48.753 74.32 46.856 72.423 Z';
const COUNTER =
  'M 79.911 34.273 C 74.315 34.273 69.778 29.736 69.778 24.14 C 69.778 18.543 74.315 14.006 79.911 14.006 C 85.508 14.006 90.045 18.543 90.045 24.14 C 90.045 29.736 85.508 34.273 79.911 34.273 M 102.628 20.701 L 83.35 1.427 C 81.453 -0.474 78.374 -0.474 76.473 1.427 L 57.198 20.701 C 55.297 22.598 55.297 25.677 57.198 27.578 L 76.473 46.853 C 78.374 48.754 81.453 48.754 83.35 46.853 L 102.628 27.578 C 104.525 25.677 104.525 22.598 102.628 20.701';
const LOOSE =
  'M 76.473 98.574 L 57.198 79.3 C 55.297 77.403 55.297 74.324 57.198 72.423 L 76.473 53.148 C 78.374 51.247 81.453 51.247 83.35 53.148 L 102.628 72.423 C 104.525 74.324 104.525 77.403 102.628 79.3 L 83.35 98.574 C 81.453 100.475 78.374 100.475 76.473 98.574';
/** `markPath` is the three pieces' subpaths in one path. */
const MARK = `${PAIR} M 28.178 53.749 M ${COUNTER.slice(2)} M ${LOOSE.slice(2)}`;

const WORDMARK_ASPECT = 4.323882;
const WORDMARK_VIEWBOX = '0 0 432.388 100';
const WORDMARK =
  'M 37.144 77.428 L 57.432 77.428 C 60.715 77.428 64.433 77.285 67.145 75.287 C 68.715 74.002 70.428 71.855 70.428 68.287 C 70.428 65.568 69.571 63.142 66.716 61.286 C 65.432 60.572 62.856 59.288 57.004 59.288 L 37.144 59.288 Z M 37.144 38.571 L 55.57 38.571 C 58.288 38.571 61.857 38 63.712 36.716 C 65.432 35.574 66.716 33.284 66.716 30.429 C 66.716 27.431 65.432 25.284 63.855 24.285 C 62.142 23.143 58.431 22.572 56.569 22.572 L 37.144 22.572 Z M 66.145 0 C 81.003 0 88.575 1.713 93.428 4.717 C 95.718 6.144 103.575 11.568 103.575 23.714 C 103.575 31.285 100.143 36.288 97.288 39.142 C 92.286 44.145 85.571 46.143 84.286 46.428 L 84.286 46.999 C 89.146 47.856 96.146 50.425 100.571 54 C 105.002 57.568 108.999 63.427 108.999 72.569 C 108.999 81.425 105.002 88.86 99.286 93.142 C 97.003 94.855 89.146 100 67.287 100 L 0 100 L 0 0 Z M 66.145 0 M 177.791 63.712 L 167.222 35.288 L 156.939 63.712 Z M 143.366 100 L 105.937 100 L 150.081 0 L 184.507 0 L 228.651 100 L 191.222 100 L 185.798 85.856 L 148.796 85.856 Z M 143.366 100 M 266.956 72.569 L 323.811 22.144 L 323.811 0 L 226.951 0 L 226.951 27.431 L 276.669 27.431 L 223.668 74.145 L 235.081 100 L 325.667 100 L 325.667 72.569 Z M 266.956 72.569 M 418.673 37.715 L 418.673 61.286 L 369.24 61.286 L 369.24 73.574 L 432.388 73.574 L 432.388 100 L 332.103 100 L 332.103 0 L 430.954 0 L 430.954 26.432 L 369.24 26.432 L 369.24 37.715 Z M 418.673 37.715';

/** The lockup in mark-height units (mark = 100), measured off `Baze_logo_black.png`. */
const LOCKUP = { gap: 35.4, wordHeight: 58, wordCenterY: 49.5 };
const LOCKUP_W = 104.051 + LOCKUP.gap + WORDMARK_ASPECT * LOCKUP.wordHeight;

/** One Base Unit in a 24-unit box: `diamondMark`. */
const UNIT =
  'M 10.291 23.291 L 0.709 13.709 C -0.236 12.766 -0.236 11.236 0.709 10.291 L 10.291 0.709 C 11.236 -0.236 12.766 -0.236 13.709 0.709 L 23.293 10.291 C 24.236 11.236 24.236 12.766 23.293 13.709 L 13.709 23.291 C 12.766 24.236 11.236 24.236 10.291 23.291';

/* -------------------------------------------------------------------------
   Colour — baze.co `src/styles/tokens.css`. Artwork colours, fixed in both
   colour modes (as FactChat's `artwork.*` are). Not product UI tokens.
   ------------------------------------------------------------------------- */

const BZ = {
  ink: '#252525',
  paper: '#fdfcf9',
  wash: '#faf6f1',
  cream: '#f5ede0',
  faint: '#a8a8a8',
  coral: '#ff8680',
  coralDeep: '#da483e',
  mint: '#86e0c5',
  mintDeep: '#3c967d',
  azure: '#37a9cc',
  azureDeep: '#24768e',
} as const;

/**
 * The artwork the specimens show, loaded from baze.co itself (it serves its
 * images with `access-control-allow-origin: *`) at the intrinsic sizes listed
 * in its `src/lib/images.ts`, so nothing is bundled and nothing reflows.
 */
const ART = {
  typewriter: ['assets/typewriter.webp', 1325, 1388],
  lightbulb: ['assets/lightbulb.webp', 774, 1081],
  notebookPencil: ['assets/notebook-pencil.webp', 991, 1208],
  manFloor: ['assets/collage/01-man-desk-flat.webp', 2400, 1752],
  womanTyping: ['assets/collage/02-woman-laptop-flat.webp', 2311, 2400],
  paperGridTorn: ['assets/paper-grid-torn.webp', 1734, 1415],
  paperTornSquare: ['assets/paper-torn-square.webp', 1537, 1342],
  poster1: ['gallery/poster-1.webp', 663, 994],
  posterFestival: ['shots/poster-festival.webp', 900, 900],
  poster2: ['gallery/poster-2.webp', 707, 1000],
  posterBrunch: ['shots/poster-brunch.webp', 900, 900],
} as const;
type ArtKey = keyof typeof ART;

const Art = ({ name, style }: { name: ArtKey; style?: CSSProperties }) => {
  const [path, width, height] = ART[name];
  return (
    <img
      src={`https://baze.co/images/${path}`}
      alt=""
      width={width}
      height={height}
      decoding="async"
      style={style}
    />
  );
};

/** A cutout centred in a plate's padding box, at any aspect ratio. */
const FIT: CSSProperties = {
  position: 'absolute',
  inset: 24,
  width: 'calc(100% - 48px)',
  height: 'calc(100% - 48px)',
  objectFit: 'contain',
};

/** The house print treatment for a cutout on the wash (FeatureShowcase.astro). */
const PRINTED: CSSProperties = {
  mixBlendMode: 'multiply',
  filter: 'sepia(0.2) saturate(0.85) contrast(1.05)',
};

/* -------------------------------------------------------------------------
   Story-local renderers
   ------------------------------------------------------------------------- */

const Lockup = ({ size, color = BZ.ink }: { size: number; color?: string }) => (
  <svg
    width={+((size * LOCKUP_W) / 100).toFixed(2)}
    height={size}
    viewBox={`0 0 ${LOCKUP_W.toFixed(3)} 100`}
    role="img"
    aria-label="BAZE"
    style={{ display: 'block', color }}
  >
    <path fill="currentColor" d={MARK} />
    <g
      transform={`translate(${(104.051 + LOCKUP.gap).toFixed(3)} ${(
        LOCKUP.wordCenterY -
        LOCKUP.wordHeight / 2
      ).toFixed(3)}) scale(${LOCKUP.wordHeight / 100})`}
    >
      <path fill="currentColor" d={WORDMARK} />
    </g>
  </svg>
);

const Mark = ({
  size,
  color = BZ.ink,
  dim,
}: {
  size: number;
  color?: string;
  /** Show one piece at full ink and the other two faint. */
  dim?: 'pair' | 'counter' | 'loose';
}) => (
  <svg
    width={+(size * MARK_ASPECT).toFixed(2)}
    height={size}
    viewBox={MARK_VIEWBOX}
    aria-hidden="true"
    style={{ display: 'block', color }}
  >
    {dim ? (
      (
        [
          ['pair', PAIR],
          ['counter', COUNTER],
          ['loose', LOOSE],
        ] as const
      ).map(([name, d]) => (
        <path
          key={name}
          fill="currentColor"
          d={d}
          opacity={name === dim ? 1 : 0.16}
        />
      ))
    ) : (
      <path fill="currentColor" d={MARK} />
    )}
  </svg>
);

const Wordmark = ({
  size,
  color = BZ.ink,
}: {
  size: number;
  color?: string;
}) => (
  <svg
    width={+(size * WORDMARK_ASPECT).toFixed(2)}
    height={size}
    viewBox={WORDMARK_VIEWBOX}
    role="img"
    aria-label="BAZE"
    style={{ display: 'block', color }}
  >
    <path fill="currentColor" d={WORDMARK} />
  </svg>
);

/** The paper-grain filter, once per story (GrainDefs.astro). */
const GRAIN_ID = 'bz-grain-docs';
const GrainDefs = () => (
  <svg
    width="0"
    height="0"
    aria-hidden="true"
    focusable="false"
    style={{ position: 'absolute' }}
  >
    <filter
      id={GRAIN_ID}
      x="-5%"
      y="-5%"
      width="110%"
      height="110%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.55"
        numOctaves={3}
        seed={7}
        result="raw"
      />
      <feColorMatrix
        in="raw"
        type="matrix"
        values="0.213 0.715 0.072 0 0 0.213 0.715 0.072 0 0 0.213 0.715 0.072 0 0 0 0 0 0 1"
        result="mono"
      />
      <feComponentTransfer in="mono" result="dark">
        <feFuncR type="linear" slope="0.38" intercept="0.62" />
        <feFuncG type="linear" slope="0.38" intercept="0.62" />
        <feFuncB type="linear" slope="0.38" intercept="0.62" />
      </feComponentTransfer>
      <feComponentTransfer in="mono" result="light">
        <feFuncR type="linear" slope="0.24" intercept="0" />
        <feFuncG type="linear" slope="0.24" intercept="0" />
        <feFuncB type="linear" slope="0.24" intercept="0" />
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="dark" mode="multiply" result="mul" />
      <feBlend in="mul" in2="light" mode="screen" result="tex" />
      <feComposite in="tex" in2="SourceGraphic" operator="in" />
    </filter>
  </svg>
);

/** A single Base Unit (Diamond.astro): solid, or outline for dark surfaces. */
const Unit = ({
  size,
  variant = 'solid',
  grain = true,
  className,
  style,
}: {
  size: number;
  variant?: 'solid' | 'outline';
  grain?: boolean;
  className?: string;
  style?: CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <g filter={grain ? `url(#${GRAIN_ID})` : undefined}>
      {variant === 'solid' ? (
        <path fill="currentColor" d={UNIT} />
      ) : (
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          transform="translate(12 12) scale(0.9) translate(-12 -12)"
          d={UNIT}
        />
      )}
    </g>
  </svg>
);

const Ground = ({
  bg,
  children,
  p = 6,
}: {
  bg: string;
  children: ReactNode;
  p?: number;
}) => (
  <Box style={{ background: bg }} borderRadius="12px" p={p}>
    {children}
  </Box>
);

const Caption = ({ children }: { children: ReactNode }) => (
  <Box fontSize="xs" color="fg.muted" mt={2}>
    {children}
  </Box>
);

/* -------------------------------------------------------------------------
   Stories
   ------------------------------------------------------------------------- */

export const LockupForms: Story = {
  render: () => (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
      <Ground bg={BZ.cream}>
        <Stack gap={6} align="start">
          <Lockup size={48} />
          <Flex gap={8} align="end">
            <Mark size={48} />
            <Wordmark size={28} />
          </Flex>
        </Stack>
        <Caption>
          <T
            en="Ink #252525 on cream — lockup, symbol, wordmark"
            ko="크림 바탕의 잉크 #252525 — 로크업, 심볼, 워드마크"
          />
        </Caption>
      </Ground>
      <Ground bg={BZ.ink}>
        <Stack gap={6} align="start">
          <Lockup size={48} color="#ffffff" />
          <Flex gap={8} align="end">
            <Mark size={48} color="#ffffff" />
            <Wordmark size={28} color="#ffffff" />
          </Flex>
        </Stack>
        <Box fontSize="xs" mt={2} style={{ color: BZ.faint }}>
          <T
            en="White on ink — the nav and the footer"
            ko="잉크 바탕의 흰색 — 내비게이션과 푸터"
          />
        </Box>
      </Ground>
    </Grid>
  ),
};

export const MarkAnatomy: Story = {
  render: () => (
    <Ground bg={BZ.cream}>
      <Flex gap={10} wrap="wrap">
        {(
          [
            ['pair', 'Pair — never separates', '페어 — 떨어지지 않음'],
            ['counter', 'Counter — keeps its hole', '카운터 — 구멍을 유지'],
            ['loose', 'Loose — the one that travels', '루즈 — 움직이는 조각'],
          ] as const
        ).map(([piece, en, ko]) => (
          <Box key={piece}>
            <Mark size={96} dim={piece} />
            <Caption>
              <T en={en} ko={ko} />
            </Caption>
          </Box>
        ))}
      </Flex>
    </Ground>
  ),
};

/** X = the wordmark's height in the lockup (guidebook p.5, p.11). */
export const ClearSpace: Story = {
  render: () => {
    const size = 64;
    const x = (size * LOCKUP.wordHeight) / 100;
    return (
      <Ground bg={BZ.cream}>
        <Box
          display="inline-block"
          style={{
            padding: x,
            outline: `1px dashed ${BZ.coralDeep}`,
            background: 'rgba(255, 134, 128, 0.22)',
          }}
        >
          <Box style={{ background: BZ.cream }}>
            <Lockup size={size} />
          </Box>
        </Box>
        <Caption>
          <T
            en="Tinted band = X on every side. X is the wordmark's height in the lockup (58% of the mark)."
            ko="색 띠가 사방의 X입니다. 로크업에서 X는 워드마크의 높이(마크 높이의 58%)입니다."
          />
        </Caption>
      </Ground>
    );
  },
};

export const UnitForms: Story = {
  render: () => (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
      <GrainDefs />
      <Ground bg={BZ.paper}>
        <Flex gap={6} align="end" style={{ color: BZ.ink }}>
          {[10, 12, 14, 24, 44].map((size) => (
            <Box key={size} textAlign="center">
              <Unit size={size} />
              <Caption>{size}</Caption>
            </Box>
          ))}
          <Box textAlign="center">
            <Unit size={44} grain={false} />
            <Caption>
              <T en="no grain" ko="그레인 없음" />
            </Caption>
          </Box>
        </Flex>
        <Caption>
          <T
            en="Solid unit with the paper grain, at the sizes baze.co uses"
            ko="종이 그레인을 입힌 단색 유닛, baze.co가 쓰는 크기"
          />
        </Caption>
      </Ground>
      <Ground bg={BZ.ink}>
        <Flex gap={3} align="center" style={{ color: BZ.cream }}>
          <Unit size={14} />
          <Unit size={14} variant="outline" />
        </Flex>
        <Box fontSize="xs" mt={2} style={{ color: BZ.faint }}>
          <T
            en="Solid + outline on the black bar (the receipt stub)"
            ko="검은 띠 위의 단색 + 윤곽 (영수증 끝부분)"
          />
        </Box>
      </Ground>
    </Grid>
  ),
};

/**
 * The homepage's three art-plate variants (Highlights.astro `unitVariants`):
 * lead (a) · companion (b) · deep (c), with each row's own positions.
 */
const PLATE_VARIANTS = [
  {
    art: 'typewriter',
    glow: [BZ.coralDeep, BZ.azureDeep],
    tint: BZ.azure,
    sizes: [26, 12, 44],
    spots: [
      ['16%', '18%'],
      ['76%', '34%'],
      ['7%', '60%'],
    ],
  },
  {
    art: 'lightbulb',
    glow: [BZ.mintDeep, BZ.coralDeep],
    tint: BZ.coral,
    sizes: [18, 15, 52],
    spots: [
      ['72%', '14%'],
      ['14%', '28%'],
      ['64%', '55%'],
    ],
  },
  {
    art: 'notebookPencil',
    glow: [BZ.azureDeep, BZ.mintDeep],
    tint: BZ.mint,
    sizes: [23, 11, 40],
    spots: [
      ['22%', '10%'],
      ['80%', '44%'],
      ['10%', '36%'],
    ],
  },
] as const;

const PLATE_CSS = `
.bzd-plate { position: relative; aspect-ratio: 4 / 3; background: ${BZ.wash};
  border-radius: 18px; overflow: clip; isolation: isolate; }
.bzd-unit { position: absolute; color: ${BZ.ink}; }
.bzd-unit--a, .bzd-unit--b { z-index: 3; }
.bzd-unit--a { left: var(--ua-l); top: var(--ua-t); }
.bzd-unit--b { left: var(--ub-l); top: var(--ub-t); color: var(--tint-b);
  opacity: 0.9; }
.bzd-unit--c { left: var(--uc-l); top: var(--uc-t); opacity: 0.16; }
.bzd-plate:hover .bzd-unit--a, .bzd-plate:hover .bzd-unit--b {
  scale: 1.15; translate: 0 -2px; }
.bzd-plate:hover .bzd-unit--a { color: var(--glow-a); }
.bzd-plate:hover .bzd-unit--b { color: var(--glow-b); }
@media (prefers-reduced-motion: no-preference) {
  .bzd-unit { transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    scale 200ms cubic-bezier(0.16, 1, 0.3, 1),
    translate 200ms cubic-bezier(0.16, 1, 0.3, 1); }
}
@media (prefers-reduced-motion: reduce) {
  .bzd-plate:hover .bzd-unit--a, .bzd-plate:hover .bzd-unit--b {
    scale: none; translate: none; }
}
`;

export const UnitsOnArtPlates: Story = {
  render: () => (
    <Box>
      <style>{PLATE_CSS}</style>
      <GrainDefs />
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        {PLATE_VARIANTS.map(
          ({ art: src, glow: [a, b], tint, sizes: [sa, sb, sc], spots }, i) => (
            <Box key={src}>
              <div
                className="bzd-plate"
                style={
                  {
                    '--glow-a': a,
                    '--glow-b': b,
                    '--tint-b': tint,
                    ...Object.fromEntries(
                      (['ua', 'ub', 'uc'] as const).flatMap((u, k) => [
                        [`--${u}-l`, spots[k][0]],
                        [`--${u}-t`, spots[k][1]],
                      ])
                    ),
                  } as CSSProperties
                }
              >
                {/* Deep plane first so it paints behind the cutout. */}
                <Unit size={sc} className="bzd-unit bzd-unit--c" />
                <Art name={src} style={{ ...FIT, ...PRINTED }} />
                <Unit size={sa} className="bzd-unit bzd-unit--a" />
                <Unit size={sb} className="bzd-unit bzd-unit--b" />
              </div>
              <Caption>
                <T
                  en={`Homepage row ${i + 1} values: ${sa} / ${sb} / ${sc}px — hover the plate`}
                  ko={`홈 화면 ${i + 1}번째 행의 값: ${sa} / ${sb} / ${sc}px — 판 위에 포인터를 올려 보세요`}
                />
              </Caption>
            </Box>
          )
        )}
      </Grid>
    </Box>
  ),
};

const LIST_CSS = `
.bzd-list { display: grid; gap: 16px; margin: 0; padding: 0; list-style: none; }
.bzd-list li { display: grid; grid-template-columns: 14px 1fr; gap: 12px;
  align-items: start; color: #494949; }
.bzd-list__mark { margin-top: 2px; color: ${BZ.ink}; }
.bzd-list li:hover .bzd-list__mark { color: ${BZ.coralDeep}; scale: 1.15; }
.bzd-list li:nth-child(3n + 2):hover .bzd-list__mark { color: ${BZ.mintDeep}; }
.bzd-list li:nth-child(3n):hover .bzd-list__mark { color: ${BZ.azureDeep}; }
@media (prefers-reduced-motion: no-preference) {
  .bzd-list__mark { transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    scale 200ms cubic-bezier(0.16, 1, 0.3, 1); }
}
@media (prefers-reduced-motion: reduce) {
  .bzd-list li:hover .bzd-list__mark { scale: none; }
}
`;

const LIST_ITEMS = [
  { en: 'Every model on one account', ko: '하나의 계정으로 모든 모델' },
  { en: 'Presentations and documents', ko: '프레젠테이션과 문서' },
  { en: 'Image and video agents', ko: '이미지·비디오 에이전트' },
  { en: 'Your own AI', ko: '나만의 AI' },
];

export const ListBullets: Story = {
  render: () => (
    <Ground bg={BZ.paper}>
      <style>{LIST_CSS}</style>
      <GrainDefs />
      <ul className="bzd-list">
        {LIST_ITEMS.map(({ en, ko }) => (
          <li key={en}>
            <Unit size={12} className="bzd-list__mark" />
            <span>
              <T en={en} ko={ko} />
            </span>
          </li>
        ))}
      </ul>
    </Ground>
  ),
};

export const ColourOnShapes: Story = {
  render: () => (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
      {(
        [
          ['manFloor', 'coral', '코랄'],
          ['womanTyping', 'blue', '파랑'],
        ] as const
      ).map(([name, en, ko]) => (
        <Box key={name}>
          <Box
            position="relative"
            style={{ background: BZ.wash }}
            borderRadius="18px"
            aspectRatio={4 / 3}
            overflow="clip"
            isolation="isolate"
          >
            <Art name={name} style={{ ...FIT, ...PRINTED }} />
          </Box>
          <Caption>
            <T
              en={`Black-and-white figure, ${en} on the Base Unit plate only`}
              ko={`흑백 인물, ${ko}은 베이스 유닛 판에만`}
            />
          </Caption>
        </Box>
      ))}
    </Grid>
  ),
};

const SCRAP: CSSProperties = {
  position: 'absolute',
  zIndex: 0,
  height: 'auto',
  mixBlendMode: 'multiply',
};

/** The image/video page's poster band (FeatureShowcase.astro, `posters`). */
export const PosterBandScraps: Story = {
  render: () => (
    <Box>
      <Box
        position="relative"
        overflow="clip"
        isolation="isolate"
        style={{ background: BZ.cream, padding: '7.7% 0 5.5%' }}
      >
        <Art
          name="paperGridTorn"
          style={{ ...SCRAP, left: '-8%', top: '-14%', width: '40%' }}
        />
        <Art
          name="paperTornSquare"
          style={{ ...SCRAP, right: '-6%', bottom: '-20%', width: '30%' }}
        />
        <Flex position="relative" zIndex={1} gap={4} justify="center">
          {(
            ['poster1', 'posterFestival', 'poster2', 'posterBrunch'] as const
          ).map((name) => (
            <Art
              key={name}
              name={name}
              style={{ height: 180, width: 'auto', display: 'block' }}
            />
          ))}
        </Flex>
      </Box>
      <Caption>
        <T
          en="Two torn scraps behind opposite corners, multiplied, no sepia. The posters are output: shown flat."
          ko="찢어진 종이 두 장을 마주 보는 모서리 뒤에 둡니다. 곱하기 혼합만 쓰고 세피아는 쓰지 않습니다. 포스터는 결과물이라 손대지 않고 보여 줍니다."
        />
      </Caption>
    </Box>
  ),
};
