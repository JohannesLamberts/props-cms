import {
    TableBody,
    TableCell,
    TableRow
}                 from 'material-ui';
import * as React from 'react';

interface SimpleTableBodyProps<T> {
    data: T[];
    children: (obj: T) => Array<React.ReactNode>;
}

class SimpleTableBody<T> extends React.PureComponent<SimpleTableBodyProps<T>> {

    constructor(props: SimpleTableBodyProps<T>) {
        super(props);
    }

    render() {

        const { data, children } = this.props;

        return (
            <TableBody>
                {data.map((el, index) => (
                    <TableRow key={index}>
                        {children(el).map((elCell, cellIndex) => (
                            <TableCell key={cellIndex}>
                                {elCell}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        );
    }
}

export default SimpleTableBody;