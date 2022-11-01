import React, { useCallback, useEffect, useState } from "react";
import Button from "./UI/Button";
import "./CarsList.css";
import CarItem from "./CarItem";

interface CarModel {
  id: number;
  name: string;
  checked: boolean;
}

const futureCars: CarModel[] = [
  {
    id: 1,
    name: "Volkswagen",
    checked: false,
  },
  {
    id: 2,
    name: "BMW",
    checked: false,
  },
  {
    id: 3,
    name: "Toyota",
    checked: true,
  },
  {
    id: 4,
    name: "Nissan",
    checked: false,
  },
  {
    id: 5,
    name: "General Motors",
    checked: true,
  },
  {
    id: 6,
    name: "Hyundai",
    checked: false,
  },
  {
    id: 7,
    name: "Peugeot",
    checked: false,
  },
  {
    id: 8,
    name: "Kia",
    checked: false,
  },
  {
    id: 9,
    name: "Volvo",
    checked: false,
  },
  {
    id: 10,
    name: "Mazda",
    checked: false,
  },
];

type CarsListProps = {
  onChanged: (isChanged: boolean) => void;
};

const CarsList = ({ onChanged }: CarsListProps) => {
  const [checkedCars, setCheckedCars] = useState<CarModel[]>(futureCars);
  const [isChanged, setIsChanged] = useState(false);

  // When I clicked the "apply change" button and the page first rendered, the sorting function worked.
  const sortingFunction = useCallback((array: CarModel[]) => {
    const assignCheckedCars = array
      .filter((c) => c.checked === true)
      .sort(compare);
    const assignUnCheckedCars = array
      .filter((c) => c.checked === false)
      .sort(compare);
    setCheckedCars([...assignCheckedCars, ...assignUnCheckedCars]);
  }, []);

  //helper function to sort array depend on id
  function compare(a: CarModel, b: CarModel) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  // when the page first rendered, the sorting function worked.
  useEffect(() => {
    sortingFunction(futureCars);
  }, [sortingFunction]);

  // handling changes in checkbox inputs
  const inputChangeHandler = (car: CarModel) => {
    setIsChanged(true);
    onChanged(true);
    const index = checkedCars.findIndex((c) => c.id === car.id);
    const newChecked = checkedCars.map((c, idx) =>
      idx === index ? (c = { ...c, checked: !c.checked }) : c
    );
    setCheckedCars(newChecked);
  };

  // handling changes when reset button clicked
  const onRestHandler = () => {
    sortingFunction(futureCars);
    setIsChanged(false);
    onChanged(false);
  };

  return (
    <div className="card">
      <div className="card_header">
        <div className="reset">
          <Button onClick={onRestHandler}>reset</Button>
        </div>
        <div>
          <h4>Future Cars</h4>
        </div>
        <div className="change">
          {isChanged && (
            <Button onClick={() => sortingFunction(checkedCars)}>
              apply changes
            </Button>
          )}
        </div>
      </div>
      <div className="card_body">
        {checkedCars.map((car) => (
          <CarItem
            key={car.id}
            id={car.id}
            name={car.name}
            checked={car.checked}
            onChange={() => inputChangeHandler(car)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarsList;
