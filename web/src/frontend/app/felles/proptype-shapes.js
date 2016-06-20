import { PropTypes as PT } from 'react';
export const emptyShape = PT.shape({});

export const storeShape = (dataShape) => PT.shape({
    status: PT.string,
    data: PT.oneOfType([PT.arrayOf(dataShape), dataShape, emptyShape])
});
