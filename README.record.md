# DuguDefeat

## 完成一个组件库需要考虑的问题

1. 代码结构
2. 样式解决方案
3. 组件需求分析和编码
4. 组件测试用例分析和编码
5. 代码打包输出和发布
6. CI/CD，文档生成

<image src="images/component-generation-process.png" />

## 项目结构

## 代码规范

https://create-react-app.dev/docs/setting-up-your-editor

## 样式解决方案

1. inline style

```jsx
const style = {};
function Demo() {
  return <div style={style}></div>;
}
```

但是 className 的性能比 inline style 的性能高

2. CSS in JS

StyleComponent：

```jsx
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;
```

书写成本高，灵活性不高，一些外国码农不建议使用 CSS in JS，需要结合场景

3. Scss/Less

拓展性和复用性都很高

### 组件库的色彩体系

1. 系统色板 - 基础色版（http://zhongguose.com/#yuhong）+ 中性色板（黑白灰）
2. 产品色板 - 品牌色（主要颜色） + 功能色板（辅助）

### 样式变量分类

1. 基础色彩系统
2. 字体系统
3. 表单
4. 按钮
5. 边框和阴影
6. 可配置开关

### 样式一致性

https://github.com/necolas/normalize.css

## Button 组件需求分析

1. 按钮类型：Primary、Default、Danger、Link Button
2. 按钮尺寸：Normal、Small、Large
3. Disabled 状态：true、false，LinkButton 特殊处理

使用方法：

```jsx
<Button
  size="lg"
  type="primary"
  className=""
  href=""
  disabled={false}
  autoFocus={false}
>
  Button Component
</Button>
```

## Alert 组件分析

1. Alert 类型：Default、Success、Warning、Danger
2. 标题
3. 描述
4. 关闭事件
5. 是否可以手动关闭

使用方式：

```jsx
<Alert title="alert" type="default" description="this is" closable={false} />
```

## 组件测试

ui test：模拟真实用户的行为，最难维护，每次改动很大
unit test：单元测试

<image src="images/test-pyramid.png" />

国内测试现状：冰激凌形状

<image src="images/Ice-cream.png" />

React 组件特别适合单元测试：

1. 组件化
2. 函数式，纯函数有固定的输入有固定的输出
3. 单向数据流

选择 Jest 通过测试框架，使用 demo：

```javascript
test("common mather", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
});
```

React 的测试工具：

https://reactjs.org/docs/test-utils.html

https://enzymejs.github.io/enzyme/

https://testing-library.com/docs/react-testing-library/intro/

新增更多的断言：https://testing-library.com/docs/ecosystem-jest-dom/

## Menu 组件分析

1. mode: vertical、horizontal
2. activeIndex: 活跃索引
3. onSelect：选择事件触发
4. disabled
5. 父组件属性需要传递给子组件
6. 自组件必须是 MenuItem
   解决方案：自组件 Component.displayName，父组件通过 React.Children.map，map 的 Item 是 ReactElement，属性 type 就是函数组件的实例
7. submenu
8. 横向模式的 submenu 通过鼠标滑过出现，纵向使用点击事件出现
9. submenu 的交互逻辑

使用方式：

```tsx
<Menu defaultIndex={0} onSelect={} mode="vertical">
  <Menu.Item>MenuItem</Menu.Item>
</Menu>
```

## Tabs 组件

1. type: line, card
2. activeIndex: 活跃索引
3. 父组件属性需要传递给子组件
4. 自组件必须是 TabItem
5. onSelect：选择事件触发

使用方式：

```tsx
<Tabs defaultIndex={0} onSelect={} type="line">
  <Tabs.Item label="TabItem" disabled>TabItem</Tabs.Item>
</Menu>
```

### Icon 组件

1. 上古时期：雪碧图（CSS sprite）
2. 近代：Font Icon
3. 现代：SVG

Svg 可以使用任何使用属性来控制

https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react

使用方式：

```tsx
<Icon icon="coffee" size={"10x"} />
```

### Transition 组件

当使用 opacity 的时候，组件是要占据空间的，但是使用 display 的时候是没有渐变效果的。

解决方案：

<image src="images/transition.png" />
<image src="images/transition2.png" />

这种解决方案不仅仅 css 能解决的

https://reactcommunity.org/react-transition-group/

但是在使用的时候也是会有问题的，在 exit 阶段，会直接将 display 等于 none 这就导致了 exit 阶段没有动画

使用方式：

```tsx
<Transition in={menuOpen} timeout={300} animation={AnimationName.ZoomInTop}>
  ...
</Transition>
```

### 表单世界

#### Input

使用方式：

```tsx
<Input disabled size="lg|sm" icon="" prepand="input前缀" appned="input后缀" />
```

两个问题：

1. 用户有可能传递 value 和 defaultValue 两个属性，这个是不允许的
2. 第二个就是 value 一开始是 undefined，然后输入值从非受控组件切换为受控组件，这样就会有警告

#### AutoCompele

1. custom options
2. keyboard support
3. deboundce
4. click outside

### Upload 组件

1. action：后端接口支持
2. 异步请求：axios

生命周期：uploadStart、beforeUpload、onProgress、onChange、onError、onSuccess、onRemoved

可定制的 axios 请求
