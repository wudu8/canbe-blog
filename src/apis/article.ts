import axios from '@/utils/axios';
import type { ArticleListData } from '@/components/article-card';
import type { SiderCardData } from '@/components/article-type';

export function getArticleList() {
  return axios.get<ArticleListData[], ResponseData<ArticleListData[]>>('/article/list');
}

export function getArticleType() {
  return axios.get<SiderCardData[], ResponseData<SiderCardData[]>>('/article/type');
}
