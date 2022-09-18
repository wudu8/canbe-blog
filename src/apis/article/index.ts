import service from '@/utils/service';
import type { SiderCardData } from '@/components/article-type';
import type { ArticleData, DeleteArticleImages } from './types';

/** 文章接口 start */
export function getArticleList(params: ArticleData) {
  return service.get<ArticleData[]>('/blog/blogInfo', { params });
}

export function getArticleType() {
  return service.get<SiderCardData[]>('/system/sysDictItem/hotCategory');
}

export function getArticle(id: string) {
  return service.get<ArticleData>('/blog/blogInfo/' + id);
}

export function insertArticle(data: ArticleData) {
  return service.post<ArticleData>('/blog/blogInfo', { data });
}

export function deleteArticle(id: string) {
  return service.delete<boolean>('/blog/blogInfo' + id);
}

export function updateArticle(data: ArticleData) {
  return service.put<ArticleData>('/blog/blogInfo', { data });
}
/** 文章接口 start */

/** 点赞接口 start */
export function getArticleIncrComment(id: string) {
  return service.patch<ArticleData>(`/blog/blogInfo/${id}/incrFavourNum`);
}

/** 点赞接口 end */

/** 删除文章图片 */
export function deleteArticleImagesById(data: DeleteArticleImages) {
  return service.delete<ArticleData>('/article/delete_article_images', { data });
}

export * from './types';
