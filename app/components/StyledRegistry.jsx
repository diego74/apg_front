'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { GlobalStyles } from './styles';

export default function StyledRegistry({ children }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  const content = <><GlobalStyles />{children}</>;
  if (typeof window !== 'undefined') return content;
  return <StyleSheetManager sheet={sheet.instance}>{content}</StyleSheetManager>;
}
