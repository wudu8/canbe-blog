import service from '@/utils/service';
import type { ArticleListData } from '@/components/article-card';
import type { SiderCardData } from '@/components/article-type';
import type { ArticleData } from './types';

export function getArticleList() {
  return service.get<ArticleListData[]>('/article/list');
}

export function getArticleType() {
  return service.get<SiderCardData[]>('/article/type');
}

export function getArticleById(id: string) {
  return service.get<ArticleData>('/article/get_article', { params: { id } });
}

export * from './types';
