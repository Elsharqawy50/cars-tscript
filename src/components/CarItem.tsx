import React from "react";

type carItemProps = {
  id: number;
  name: string;
  onChange: () => void;
  checked: boolean;
};

const CarItem = ({ id, name, onChange, checked }: carItemProps) => {
  return (
    <div key={id} className="card_content">
      <div>
        <input
          checked={checked}
          onChange={onChange}
          type="checkbox"
          id={name}
        />
        <label htmlFor={name}>{name}</label>
      </div>
      <p>{id}</p>
    </div>
  );
};

export default CarItem;
