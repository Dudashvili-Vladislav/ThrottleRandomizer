import React from 'react';

type IButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({onClick}: IButtonProps): JSX.Element  => {
  return (
    <button type="button" onClick={onClick}>
      get random user
    </button>
  );
}

export default Button;
