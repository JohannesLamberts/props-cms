import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
}                 from 'material-ui';
import * as React from 'react';

interface SimpleTableProps<T = any> {
    data: T[];
    children: {
        head: React.ReactNode;
        content: (data: T) => React.ReactNode;
    }[];
}

export default class extends React.PureComponent<SimpleTableProps> {
    constructor(props: SimpleTableProps) {
        super(props);
    }

    render() {
        const { data, children } = this.props;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {children.map((col, index) => (
                            <TableCell key={index}>
                                {col.head}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(dataEl => {
                        return (
                            <TableRow key={dataEl._id}>
                                {children.map((col, index) => (
                                    <TableCell key={index}>
                                        {col.content(dataEl)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}