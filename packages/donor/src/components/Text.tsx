import React from 'react';

interface TextProps extends
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const Text: React.FunctionComponent<TextProps> = props => {
  return <div>{props.children}</div>;
}

export default Text


