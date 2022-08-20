import service from '@/utils/service';
import type { ArticleListData } from '@/components/article-card';
import type { SiderCardData } from '@/components/article-type';

export function getArticleList() {
  return service.get<ArticleListData[]>('/article/list');
}

export function getArticleType() {
  return service.get<SiderCardData[]>('/article/type');
}
