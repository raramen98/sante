import styled from 'styled-components';

const StyledInputWrapper = styled.div<{
  width?: string;
  height?: string;
  textAlign?: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: ${(props) => props.textAlign || 'left'};
  background: #fff;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #bebebe;
  outline: none;
  border-radius: 10px;

  &:focus {
    border: 1px solid #81d8d0;
  }
`;

interface StyledInputProps {
  type?: 'text' | 'number';
  placeholder: string;
  value?: 'string' | 'number';
  width: string;
  height: string;
  textAlign: string;
}

const Input = ({
  type = 'text',
  placeholder,
  value,
  width,
  height,
  textAlign,
}: StyledInputProps) => {
  return (
    <StyledInputWrapper width={width} height={height} textAlign={textAlign}>
      <StyledInput type={type} placeholder={placeholder} value={value} />
    </StyledInputWrapper>
  );
};

export default Input;
