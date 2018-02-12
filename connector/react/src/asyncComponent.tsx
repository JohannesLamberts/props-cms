import * as React from 'react';

export type AsyncComponentImport = Promise<{ default: React.ComponentType }>;

export interface AsyncComponentProps {
    importFn: () => AsyncComponentImport;
    inject?: Object;
}

export default class extends React.Component<AsyncComponentProps, {
    component?: React.ComponentType<any>;
}> {

    constructor(props: AsyncComponentProps) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const asyncImport = await this.props.importFn();
        this.setState({ component: asyncImport.default });
    }

    render() {
        const C = this.state.component;
        return C ? <C {...(this.props.inject || {})} /> : null;
    }
}