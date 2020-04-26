import React from "react";
import styled, { css } from "styled-components";

import arrow from "./arrow.png";

const Row = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  width: 15em;
  height: 3em;
  line-height: 3em;
  padding-left: 1em;
  border-left: 0px;
  border-top: 0px;
  &:hover {
    background-color: #dadada;
  }

  img {
    height: 1em;
    vertical-align: middle;
  }

  ${(props) =>
    props.selected &&
    css`
      font-weight: 700;
      background-color: #ccc;
    `}
`;

const FileSelector = styled.div`
  display: inline-block;
  vertical-align: top;
`;

export default function ({ fileSelected, setFileSelected, fileNames }) {
  let rows = fileNames.map((title, index) =>
    title === fileSelected ? (
      <Row selected key={index} onClick={() => setFileSelected(title)}>
        {title}.txt <img alt="" src={arrow} />
      </Row>
    ) : (
      <Row key={index} onClick={() => setFileSelected(title)}>
        {title}.txt <img alt="" src={arrow} />
      </Row>
    )
  );

  return <FileSelector>{rows}</FileSelector>;
}
