# @keqingrong/dom-utils

[![npm version](https://img.shields.io/npm/v/@keqingrong/dom-utils.svg)](https://www.npmjs.com/package/@keqingrong/dom-utils)

> DOM, CSSOM 工具

[English](./README.md) | 简体中文

## 安装

```sh
npm install @keqingrong/dom-utils
```

## API

- `getPageScrollOffset()` 获取页面水平/垂直滚动的偏移量。
- `getPageSize()` 获取页面宽高，包括溢出不可见的内容。
- `getViewportSize()` 获取视口宽高。
- `getElementBoundingRect(element)` 获取元素的包围矩形（包括宽高、位置）。
- `isInViewport(element)` 判断元素是否在可视区域内。
- `isOutOfViewport(element)` 判断元素是否在可视区域外。
- `isIntersectWithViewport(element)` 判断元素是否和可视区域相交

## 许可证

MIT © Qingrong Ke
