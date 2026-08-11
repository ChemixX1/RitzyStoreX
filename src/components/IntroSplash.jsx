import { useEffect, useState } from 'react';
import GengarOutline from './GengarOutline';
import '../styles/IntroSplash.css';

const INTRO_HOLD_MS = 2200;
const INTRO_EXIT_MS = 450;

export default function IntroSplash({ onComplete }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), INTRO_HOLD_MS);
    const completeTimer = window.setTimeout(onComplete, INTRO_HOLD_MS + INTRO_EXIT_MS);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`intro-splash ${leaving ? 'intro-splash--leaving' : ''}`}
      style={{
        '--intro-hold-duration': `${INTRO_HOLD_MS}ms`,
        '--intro-exit-duration': `${INTRO_EXIT_MS}ms`,
      }}
      role="status"
      aria-label="Cargando RitzyStoreX"
    >
      <div className="intro-content">
        <div className="intro-gengar-shell">
          <GengarOutline className="intro-outline" animated showEyes />
        </div>

        <h1><span>Ritzy</span>StoreX</h1>

        <div className="intro-progress" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
