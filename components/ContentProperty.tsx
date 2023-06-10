import * as React from "react";

interface IContentPropertyProps {
  string: string;
}

const ContentProperty: React.FunctionComponent<IContentPropertyProps> = ({
  string,
}) => {
  return (
    <>
      {string
        .split(".")
        .map((item, idx) => (
          <React.Fragment key={idx}>
            <p>{item}.</p>
            <br />
          </React.Fragment>
        ))
        .slice(0, -1)}
    </>
  );
};

export default ContentProperty;
