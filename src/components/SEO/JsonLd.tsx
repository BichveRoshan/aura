import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * SEO Utility: Injects JSON-LD Schema into the head.
 * Essential for 2026 Google Search Central compliance.
 */
export const JsonLd: FC<JsonLdProps> = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};
