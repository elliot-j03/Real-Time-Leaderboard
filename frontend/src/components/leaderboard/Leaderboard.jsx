// React
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Animations
import { AnimatePresence, motion, useInView } from 'framer-motion';
// Components
import LBBox from './LeaderboardBox';

const LeaderboardRow = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      layout="position"
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay, layout: {
        duration: 0.5
      } }}
      style={{ marginBottom: '1rem', cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

const Leaderboard = ({
  userList, onItemSelect, showGradients, enableArrowNavigation,
   displayScrollbar, initialSelectedIndex }) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  const navigate = useNavigate();

  function navUser(userName) {
    navigate(`/user/${userName}`);
  }

  // Handles scrolling
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  // Listening for keyboard input
  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, userList.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < userList.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(userList[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userList, selectedIndex, onItemSelect, enableArrowNavigation]);

  // I dont know yet
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth',
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);
  
  return (
    <div style={{ backgroundColor: "#1e1e1e", padding: "1rem"}}>
        <div className={`scroll-list-container`}>
        <div
            ref={listRef}
            className={`scroll-list ${!displayScrollbar ? 'no-scrollbar' : ''}`}
            onScroll={handleScroll}
        >
          <AnimatePresence>
            {userList.map(([userName, userScore, pos], index ) => {
                return (
                  <LeaderboardRow
                    key={userName}
                    delay={0.1}
                    index={index}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => navUser(userName)} >
                        <div className={`item ${selectedIndex === index ? 'selected' : ''}`}
                          style={{ padding: "0.1rem"}}
                        >
                            <LBBox pos={pos} userName={userName} userScore={userScore}/>
                        </div>
                    </LeaderboardRow>
                )
            })}
            </AnimatePresence>
        </div>
        {showGradients && (
            <>
            <div
                className="top-gradient"
                style={{ opacity: topGradientOpacity }}
            ></div>
            <div
                className="bottom-gradient"
                style={{ opacity: bottomGradientOpacity }}
            ></div>
            </>
        )}
        </div>
    </div>
  );
};

export default Leaderboard;