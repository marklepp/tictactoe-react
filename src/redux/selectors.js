export const getCells = (store) => store.area.cells;
export const getCellValue = (cells, row, col) => {
  return cells[row] ? (cells[row][col] ? cells[row][col] : "") : "";
};
export const getCellValueFromStore = (store, row, col) => {
  return getCellValue(getCells(store), row, col);
};
