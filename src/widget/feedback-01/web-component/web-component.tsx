import React from 'react';
import ReactDom from 'react-dom/client';
import FeedbackWebWidget from './FeedbackWebWidget';

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const root = ReactDom.createRoot(this.shadowRoot!);
    root.render(<FeedbackWebWidget {...props} />);
  }

  getPropsFromAttributes() {
    const props: Record<string, string> = {};
    Array.from(this.attributes).forEach(({ name, value }) => {
      props[normalizeAttribute(name)] = value;
    });
    return props;
  }
}

export default WidgetWebComponent;
