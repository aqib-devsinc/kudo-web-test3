import React, { useEffect } from 'react';
import Glossary from 'components/ProjectDetails/Glossary';

export default function DetachedGlossary() {
  useEffect(() => {
    const bgImgEl = document.getElementById('kt_body');

    if (!bgImgEl) return;

    const bgImage = bgImgEl.style['background-image'];
    bgImgEl.style['background-image'] = 'none';

    return () => {
      bgImgEl.style['background-image'] = bgImage;
    };
  });

  return <Glossary containerClass='min-full-height overflow-auto' />;
}
