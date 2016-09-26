import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { AppList } from 'components'
import { applist as appListActions } from 'actions'


class AppListContainer extends Component {

    componentWillMount () {
        this.props.initializeAppList()
    }



    render () {
        return (
            <AppList appIds={this.props.appIds} error={this.props.error} isFetching={this.props.isFetching}/>
        )
    }
}

AppListContainer.propTypes = {
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        appIds: PropTypes.instanceOf(List)
}


const mapStateToProps = ({applist}) => ({
    isFetching: applist.get('isFetching'),
    error: applist.get('error'),
    appIds: applist.get('appIds')
})

export default connect( mapStateToProps, {...appListActions})(AppListContainer)
