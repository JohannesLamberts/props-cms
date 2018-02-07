import * as React from 'react';

interface AsyncComponentProps {
    callback: () => Promise<any>;
}

interface AsyncComponentState {
    component?: React.ComponentClass;
}

class LibAsyncComponent extends React.PureComponent<AsyncComponentProps, AsyncComponentState> {

    constructor(props: AsyncComponentProps) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const asyncImport = await this.props.callback();
        this.setState({ component: asyncImport.default as React.ComponentClass });
    }

    render() {
        const C = this.state.component;
        return C ? <C {...this.props} /> : null;
    }
}

export default (importCb: () => Promise<any>) => {
    return () => <LibAsyncComponent callback={importCb}/>;
};