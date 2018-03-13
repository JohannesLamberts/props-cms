import {
    TableCell,
    TableHead,
    TableRow
}                 from 'material-ui';
import * as React from 'react';

interface SimpleTableHeaderProps {
    children: React.ReactNode[];
}

class SimpleTableHeader extends React.PureComponent<SimpleTableHeaderProps> {

    constructor(props: SimpleTableHeaderProps) {
        super(props);
    }

    render() {

        const { children } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {children.map((child, index) => (
                        <TableCell key={index}>
                            {child}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

export default SimpleTableHeader;