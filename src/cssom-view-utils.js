/**
 * 获取页面水平/垂直滚动的偏移量。
 * 除 IE 以外的其他现代浏览器支持 scrollX，IE 只支持 pageXOffset。
 * 非怪异模式，`html` 元素的 scrollLeft 返回 window.scrollX；`body` 元素对应值为 0。
 * 怪异模式，`body` 元素的 scrollLeft 返回 window.scrollX；`html` 元素对应值为 0。
 * 除此以外，还可以通过 document.scrollingElement 对象获取偏移量，但没有必要再判断。
 */
function getPageScrollOffset() {
  if (window.scrollX !== undefined) {
    // Chrome, Firefox, Edge
    return {
      x: window.scrollX,
      y: window.scrollY
    };
  } else if (window.pageXOffset !== undefined) {
    // IE 9+
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  } else {
    // IE 6+
    return {
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop
    };
  }
}

/**
 * 获取页面宽高，包括溢出不可见的内容。
 * 非怪异模式，从 `html` 元素获取；怪异模式，从 `body` 元素获取；可以直接通过 max() 处理。
 */
function getPageSize() {
  // IE 6+
  return {
    width: Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth
    ),
    height: Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    )
  }
}

/**
 * 获取视口宽高。
 * innerWidth/innerHeight 返回视口宽高，包括滚动条宽度。对应 CSS 中的 100vw、100vh。
 * 非怪异模式，`html` 元素的 clientWidth/clientHeight 返回视口宽高，不包括滚动条。
 * 怪异模式，`body` 元素的 clientWidth/clientHeight 返回视口宽高，不包括滚动条。
 * 桌面浏览器上的滚动条宽度一般为 17px。
 */
function getViewportSize() {
  if (window.innerHeight !== undefined) {
    // IE 9+
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    // IE 6+
    const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    return {
      width: isCSS1Compat
        ? document.documentElement.clientWidth
        : document.body.clientWidth,
      height: isCSS1Compat
        ? document.documentElement.clientHeight
        : document.body.clientHeight
    }
  }
}

/**
 * 获取元素的包围矩形（包括宽高、位置）。
 * @param {HTMLElement} element
 */
function getElementBoundingRect(element) {
  // IE 6+
  const domRect = element.getBoundingClientRect();
  if (domRect.x === undefined) {
    // IE, Edge 12-18 中返回的对象不支持扩展
    const rect = {
      // IE 6-8 不返回 width/height
      width: domRect.width === undefined
        ? (domRect.right - domRect.left)
        : domRect.width,
      height: domRect.height === undefined
        ? (domRect.bottom - domRect.top)
        : domRect.height,
      top: domRect.top,
      right: domRect.right,
      bottom: domRect.bottom,
      left: domRect.left,
      x: 0,
      y: 0
    };
    // IE, Edge 12-18 不返回 x/y
    rect.x = rect.width < 0 ? domRect.right : domRect.left;
    rect.y = rect.height < 0 ? domRect.bottom : domRect.top;
    return rect;
  }
  return domRect;
}

export {
  getPageScrollOffset,
  getPageSize,
  getViewportSize,
  getElementBoundingRect,
}
