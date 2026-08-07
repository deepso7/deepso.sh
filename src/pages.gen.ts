// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_WritingSlug_getConfig } from './pages/writing/[slug]';

// prettier-ignore
type Page =
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/writing/[slug]' } & GetConfigResponse<typeof File_WritingSlug_getConfig>);

// prettier-ignore
type Layout =
| { path: '/' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
