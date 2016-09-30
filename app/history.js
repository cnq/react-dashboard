import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const configureHistory = (history, routes, store) => {
    history.listen(location => {
        match({ routes, location }, (error, redirectLocation, renderProps) => {
            if(redirectLocation != null) return;
            const locals = {
                path: renderProps.location.pathname,
                query: renderProps.location.query,
                params: renderProps.params,
                dispatch: store.dispatch,
            };
        });
    });
    return syncHistoryWithStore(history, store);
};

export default configureHistory;