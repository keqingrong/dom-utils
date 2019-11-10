import {
  getViewportSize,
  getElementBoundingRect,
} from './cssom-view-utils';

/**
 * 判断元素是否在可视区域内。
 * @param {HTMLElement} element - 待判断元素。
 * @param {boolean} strict - 判断模式，为 true 时要求完全包含，为 false 时只要求部分包含。
 */
function isInViewport(element, strict = true) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = getElementBoundingRect(element);

  // 判断元素是否可见
  if (width === 0 || height === 0) {
    return false;
  }

  const { width: maxX, height: maxY } = getViewportSize();
  const minX = 0, minY = 0;

  // 完全包含
  if (
    top >= minY
    && bottom <= maxY
    && left >= minX
    && right <= maxX
  ) {
    return true;
  }

  if (strict) {
    return false;
  }

  // 部分包含
  return (
    bottom >= minY
    && top <= maxY
    && right >= minX
    && left <= maxX
  )
}

/**
 * 判断元素是否在可视区域外。
 * @param {HTMLElement} element - 待判断元素。
 */
function isOutOfViewport(element) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = getElementBoundingRect(element);
  // 判断元素是否可见
  if (width === 0 || height === 0) {
    return false;
  }
  const { width: maxX, height: maxY } = getViewportSize();
  const minX = 0, minY = 0;
  return (
    top < minY
    || bottom > maxY
    || right < minX
    || left > maxX
  )
}

/**
 * 判断元素是否和可视区域相交。
 * @param {HTMLElement} element - 待判断元素。
 */
function isIntersectWithViewport(element) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = getElementBoundingRect(element);
  // 判断元素是否可见
  if (width === 0 || height === 0) {
    return false;
  }
  const { width: maxX, height: maxY } = getViewportSize();
  const minX = 0, minY = 0;

  // 排除完全包含的情况
  if (
    top >= minY
    && bottom <= maxY
    && left >= minX
    && right <= maxX
  ) {
    return false
  }

  // 部分包含
  return (
    bottom >= minY
    && top <= maxY
    && right >= minX
    && left <= maxX
  )
}

export {
  isInViewport,
  isOutOfViewport,
  isIntersectWithViewport,
}
