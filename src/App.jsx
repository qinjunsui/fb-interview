import { useEffect, useRef, useState } from 'react';
import './App.css';
const PHRASES = ['Focus on impact', 'Be open', 'Be bold', 'Build social value'];

const DOWN = 'DOWN';
const UP = 'UP';
const NONE = 'NONE';

const App = () => {
  const [idx, setIdx] = useState(0);
  const screenRef = useRef();
  const posRef = useRef(0);

  const onScroll = () => {
    const dir = getScrollDirection();
    const { top } = screenRef.current.getBoundingClientRect();
    const lock = Math.abs(top) <= 2;
    if (lock) {
      if (dir === DOWN && idx < PHRASES.length - 1) {
        setIdx(idx + 1);
        disableScroll();
      }
      if (dir === UP && idx > 0) {
        setIdx(idx - 1);
        disableScroll();
      }
      if (dir === UP && idx === 0) {
        enableScroll();
      }
      if (dir === DOWN && idx === PHRASES.length - 1) {
        enableScroll()
      }
      if (dir === NONE) {
        enableScroll();
      }
    }
  };

  // DOWN for position, UP for negative
  const getScrollDirection = () => {
    const curScrollPos =
      window.pageYOffset || document.documentElement.scrollTop;
    const direction = curScrollPos > posRef.current ? DOWN : curScrollPos < posRef.current ? UP : NONE;
    posRef.current = curScrollPos <= 0 ? 0 : curScrollPos;
    return direction;
  };

  const disableScroll = () => {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);
  };

  const enableScroll = () => {
    window.onscroll = () => { };
  };

  useEffect(() => {
    enableScroll();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // const scrollFunc = debounce(onScroll, 0);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line
  });

  return (
    <div onScroll={() => alert('Table Scrolled')}>
      <div className='extra-space' />
      <div className='screen' ref={screenRef}>
        <div className='wrapper'>
          <span className='header-text'>Changing text</span>
          <span className='phrase-text'>{PHRASES[idx]}</span>
        </div>
      </div>
      <div className='extra-space' />
    </div>
  );
};

export default App;
