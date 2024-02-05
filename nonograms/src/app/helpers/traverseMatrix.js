function padStartArray(array, length, filler) {
  while (length > array.length) {
    array.unshift(filler);
  }
  return array;
}

export function traverseFromSide(matrix) {
  let result = [];
  let maxLength = 0;

  matrix.forEach((row, rowIndex) => {
    result[rowIndex] = [];
    let counter = 0;

    row.forEach((cell, cellIndex) => {
      if (cell === 1) {
        counter++;
      }

      if ((cell !== 1 || cellIndex === row.length - 1) && counter !== 0) {
        result[rowIndex].push(counter);
        counter = 0;
      }

      if (cellIndex === row.length - 1 && maxLength < result[rowIndex].length) {
        maxLength = result[rowIndex].length;
      }
    });
  });

  result = result.map((row) => padStartArray(row, maxLength, 0));
  return result;
}

export function traverseFromTop(matrix) {
  let result = [];
  let maxLength = 0;

  for (let colIndex = 0; colIndex < matrix[0].length; colIndex++) {
    result[colIndex] = [];
    let counter = 0;

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const cell = matrix[rowIndex][colIndex];

      if (cell === 1) {
        counter++;
      }

      if ((cell !== 1 || rowIndex === matrix.length - 1) && counter !== 0) {
        result[colIndex].push(counter);
        counter = 0;
      }

      if (
        rowIndex === matrix.length - 1 &&
        maxLength < result[colIndex].length
      ) {
        maxLength = result[colIndex].length;
      }
    }
  }

  result = result.map((col) => padStartArray(col, maxLength, 0));
  result = result[0].map((_, i) => result.map((row) => row[i]));
  return result;
}
