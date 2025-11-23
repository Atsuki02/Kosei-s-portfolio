/**
 * microCMSの画像URLを最適化するユーティリティ関数
 * @param url 画像のURL
 * @param width 希望する幅（オプション）
 * @param height 希望する高さ（オプション）
 * @returns 最適化された画像URL
 */
export const optimizeImage = (
  url: string,
  width?: number,
  height?: number
): string => {
  if (!url) return "";
  // 既にパラメータがある場合は&でつなぐ、なければ?で始める
  const separator = url.includes("?") ? "&" : "?";
  let params = `${separator}fm=webp&q=80`;

  if (width) {
    params += `&w=${width}`;
  }
  if (height) {
    params += `&h=${height}`;
  }

  return `${url}${params}`;
};
