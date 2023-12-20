import styled from 'styled-components';
import React, { ChangeEvent, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

interface SelectBoxProps {
  options: Option[];
  onChange: (selectedValue: string) => void;
  placeholder: string;
  width: string;
  height: string;
}

const StyledSelect = styled.select<{
  width: string;
  height: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid #bebebe;
  outline: none;
  border-radius: 10px;
  background: #fff;
  padding-left: 7px;

  &:focus {
    border: 1px solid #81d8d0;
  }
`;

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  onChange,
  placeholder,
  width,
  height,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <StyledSelect
      width={width}
      height={height}
      value={selectedValue}
      onChange={handleSelectChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectBox;
export type { Option };