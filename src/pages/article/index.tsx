import mdParse from '@myUtils/mdParse';
import {
  CalendarMonth,
  Update,
  Visibility,
  Comment,
  ArrowUpward,
  LightMode,
  DarkMode,
  SettingsBrightness
} from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.less';
import { changeToDark, changeToLight, selectTheme, changeToSystem } from '@myStore/slices/themeSlice.ts';
const markdownString = `
## [React](https://react.dev/)

React is a JavaScript library for building user interfaces.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep the state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using [Node](https://nodejs.org/en) and power mobile apps using [React Native](https://reactnative.dev/).

[Learn how to use React in your project](https://react.dev/learn).

## Installation

React has been designed for gradual adoption from the start, and &nbsp; **you can use as little or as much React as you need**:

* Use [Quick Start](https://react.dev/learn) to get a taste of React.
    * 测试
    * 测试
    * 测试
* [Add React to an Existing Project](https://react.dev/learn/add-react-to-an-existing-project) to use as little or as much React as you need.
* [Create a New React App](https://react.dev/learn/start-a-new-react-project) if you're looking for a powerful JavaScript toolchain.

> 本人测试

![测试图片](/src/assets/pic/diary-cover.jpg)

## Documentation

You can find the React documentation [on the website](https://react.dev/).

Check out the [Getting Started](https://react.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [Quick Start](https://react.dev/learn)
* [Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
* [Thinking in React](https://react.dev/learn/thinking-in-react)
* [Installation](https://react.dev/learn/installation)
* [Describing the UI](https://react.dev/learn/describing-the-ui)
* [Adding Interactivity](https://react.dev/learn/adding-interactivity)
* [Managing State](https://react.dev/learn/managing-state)
* [Advanced Guides](https://react.dev/learn/escape-hatches)
* [API Reference](https://react.dev/reference/react)
* [Where to Get Support](https://react.dev/community)
* [Contributing Guide](https://legacy.reactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/reactjs/react.dev).

## Examples

We have several examples [on the website](https://react.dev/). Here is the first one to get you started:

\`\`\`jsx
import { createRoot } from 'react-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
\`\`\`

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://react.dev/learn#writing-markup-with-jsx). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML.

## Contributing

The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.fb.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. 

Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://legacy.reactjs.org/docs/how-to-contribute.html)

Read our [contributing guide](https://legacy.reactjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

### [Good First Issues](https://github.com/facebook/react/labels/good%20first%20issue)

To help you get your feet wet and get you familiar with our contribution process.

we have a list of [good first issues](https://github.com/facebook/react/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License

![测试图片](/src/assets/video/test.gif)

React is [MIT licensed](./LICENSE).
`;

/**
 * @description 文章组件
 */
const Article = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const artcleContainerRef = useRef<HTMLDivElement>(null);
  const [markdownHtmlString, setMarkdownHtmlString] = useState<string>('');
  const [upShow, setUpShow] = useState<boolean>(false);

  /**
   * @description 切换主题
   */
  const changeTheme = () => {
    if (theme === 'light') {
      dispatch(changeToDark());
    } else if (theme === 'dark') {
      dispatch(changeToSystem());
    } else {
      dispatch(changeToLight());
    }
  };

  /**
   * @description 解析md文档
   */
  const parsemd = async () => {
    const resHtmlString = await mdParse(markdownString);
    setMarkdownHtmlString(resHtmlString);
  };

  /**
   * @description 监听滚动
   * @param {React.UIEvent<HTMLDivElement>} e 滚动事件
   */
  const listenScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 300) {
      setUpShow(true);
    } else {
      setUpShow(false);
    }
  };

  /**
   * @description 滚动到顶部
   */
  const scrollToTop = () => {
    if (!artcleContainerRef.current) {
      return;
    }
    artcleContainerRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    parsemd();
  });

  return (
    <div className="artcle-container" ref={artcleContainerRef} onScroll={listenScroll}>
      <div
        style={{
          transform: upShow ? 'scale(1)' : 'scale(0)'
        }}
        className="artcle-up"
        onClick={scrollToTop}
      >
        <ArrowUpward />
      </div>
      <div className="artcle-theme" onClick={changeTheme}>
        {theme === 'dark' && <DarkMode />}
        {theme === 'light' && <LightMode />}
        {theme === 'system' && <SettingsBrightness />}
      </div>
      <div className="artcle-wave"></div>
      <div className="artcle-text">
        <span className="artcle-title">测试标题，第一次测试标题以后不测了!!!</span>
        <div className="artcle-label">
          <span>#测试标签</span>
          <span>#狗屎标签</span>
          <span>#猫屎标签</span>
        </div>
        <div className="artcle-time">
          <div className="artcle-publish-time">
            <div className="artcle-publish-time-title">
              <CalendarMonth className="artcle-publish-time-icon1" />
              <span>发布时间：</span>
            </div>
            <span>2023-01-01</span>
          </div>
          <div className="artcle-publish-time">
            <div className="artcle-publish-time-title">
              <Update className="artcle-publish-time-icon2" />
              <span>发布时间：</span>
            </div>
            <span>2023-01-01</span>
          </div>
        </div>
        <div className="artcle-number">
          <div className="artcle-view">
            <div className="artcle-view-title">
              <Visibility className="artcle-view-icon1" />
              <span>阅读量：1000123</span>
            </div>
          </div>
          <div className="artcle-view">
            <div className="artcle-view-title">
              <Comment className="artcle-view-icon2" />
              <span>评论数：100</span>
            </div>
          </div>
        </div>
      </div>
      <div className="artcle-cover">
        <img src="/src/assets/pic/diary-cover.jpg" alt="cover" />
      </div>
      <div className="artcle-content" dangerouslySetInnerHTML={{ __html: markdownHtmlString }}></div>
    </div>
  );
};

export { Article };
