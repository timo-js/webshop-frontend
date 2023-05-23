import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
  showCategories,
}) => {
  return (
    <ul
      className={`list-group list-group-flush clickable text-center text-lg-start ${
        !showCategories && "d-none d-lg-block"
      }`}
    >
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group-item active"
              : "list-group-item "
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
